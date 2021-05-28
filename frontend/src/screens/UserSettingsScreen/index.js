import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUser,
  getUser,
  updateMe,
  updateUserSettings,
} from '../../actions/userActions'
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TextField,
  Avatar,
  Modal,
} from '@material-ui/core'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useStyles } from './styles'

const UserSettingsScreen = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [rowOne, setRowOne] = useState(false)
  const [rowTwo, setRowTwo] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const [photo, setPhoto] = useState(null)
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 })
  const [src, setSrc] = useState(null)

  const gotUser = useSelector((state) => state.getUser)
  const { userInfo } = gotUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: userInfoLogin } = userLogin

  const imgRef = useRef(null)

  const handleImageUpload = (e) => {
    //saveHandler(file)
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result))

      setOpenModal(true)

      reader.readAsDataURL(e.target.files[0])
      e.target.value = ''
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img

    const aspect = 1 / 1
    const width = img.width < img.height ? 100 : (img.height / img.width) * 100
    const height = img.width > img.height ? 100 : (img.width / img.height) * 100
    const y = (100 - height) / 2
    const x = (100 - width) / 2

    setCrop({
      unit: '%',
      width,
      // height,
      x,
      y,
      aspect,
    })

    return false // Return false if you set crop state in here.
  }, [])

  function getCroppedImg(image, crop, fileName) {
    console.log(crop, 'FROM GET COPPED')
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName
          resolve(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const modalConfirmHandler = async () => {
    const croppedImg = await getCroppedImg(imgRef.current, crop, 'fileName')
    setPhoto(croppedImg)
    setOpenModal(false)
  }
  const modalCancelHandler = () => {
    setSrc(null)
    setOpenModal(false)
  }

  const handleSaveChanges = () => {
    const user = {
      firstName: firstName || userInfo.firstName,
      lastName: lastName || userInfo.lastName,
      jobTitle: jobTitle || userInfo.jobTitle,
      email: userInfo.email,
      photo: photo || undefined,
    }
    setRowOne(false)
    setRowTwo(false)
    dispatch(updateMe(user))
    setSrc(null)
  }

  // const saveNameHandler = () => {}

  // const saveJobTitleHandler = () => {}

  const handleColorThemeUpdate = (value) => {
    dispatch(
      updateUserSettings(match.params.id, {
        settings: {
          theme: value,
        },
      })
    )
  }

  useEffect(() => {
    dispatch(getUser(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.pageHeader}>
          <Typography className={classes.pageHeaderTitle} variant="h4">
            User Setting
          </Typography>
        </div>
        <div>
          {userInfo && (
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableBody>
                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                    >
                      <p className={classes.cellTitle}>
                        Here you can edit your name
                      </p>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{
                        minWidth: '170px',
                        display: !rowOne ? 'table-cell' : 'none',
                      }}
                      align="right"
                    >
                      <p className={classes.cellTitle}>{userInfo.fullName}</p>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{
                        minWidth: '170px',
                        display: rowOne ? 'table-cell' : 'none',
                      }}
                      align="right"
                    >
                      <TextField
                        style={{ marginRight: '1em' }}
                        id="standard-basic"
                        label="First Name"
                        defaultValue={userInfo.firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                      />
                      <TextField
                        id="standard-basic"
                        label="Last Name"
                        defaultValue={userInfo.lastName}
                        onChange={(e) => setLastName(e.currentTarget.value)}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                      align="right"
                    >
                      {rowOne ? (
                        <Button color="primary" onClick={handleSaveChanges}>
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={(e) => setRowOne(true)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                    >
                      <p className={classes.cellTitle}>
                        Here you can edit your job title
                      </p>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{
                        minWidth: '170px',
                        display: !rowTwo ? 'table-cell' : 'none',
                      }}
                      align="right"
                    >
                      <p className={classes.cellTitle}>Job Title</p>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{
                        minWidth: '170px',
                        display: rowTwo ? 'table-cell' : 'none',
                      }}
                      align="right"
                    >
                      <TextField
                        id="standard-basic"
                        label="Job title"
                        defaultValue={userInfo.jobTitle}
                        onChange={(e) => setJobTitle(e.currentTarget.value)}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                      align="right"
                    >
                      {rowTwo ? (
                        <Button color="primary" onClick={handleSaveChanges}>
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={(e) => setRowTwo(true)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                    >
                      <p className={classes.cellTitle}>
                        Here you can edit your profile picture
                      </p>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{
                        minWidth: '170px',
                      }}
                      align="right"
                    >
                      <Avatar
                        style={{ marginLeft: 'auto' }}
                        alt={userInfo.fullName}
                        src={`/img/users/${userInfo.photoSm}`}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                      align="right"
                    >
                      {!src ? (
                        <>
                          <Button color="primary">
                            <label
                              style={{ cursor: 'pointer' }}
                              htmlFor="uploadImage"
                            >
                              Upload
                            </label>
                          </Button>
                          <input
                            type="file"
                            name="uploadImage"
                            id="uploadImage"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageUpload(e)}
                          />
                        </>
                      ) : (
                        <Button color="primary" onClick={handleSaveChanges}>
                          Save
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                    >
                      <p className={classes.cellTitle}>
                        Here you can change color theme
                      </p>
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      style={{ minWidth: '170px' }}
                      align="right"
                      colSpan={2}
                    >
                      <Button
                        color="danger"
                        variant="contained"
                        onClick={(e) => handleColorThemeUpdate('green')}
                      >
                        Green
                      </Button>
                      <Button
                        color="danger"
                        variant="contained"
                        onClick={(e) => handleColorThemeUpdate('blue')}
                      >
                        Blue
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Paper>

      <Modal
        open={openModal}
        onClose={modalCancelHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={onLoad}
            onChange={(newCrop) => setCrop(newCrop)}
          />
          <div className={classes.modalFooter}>
            <Button onClick={modalCancelHandler}>Cancel</Button>
            <Button onClick={modalConfirmHandler} color="primary">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserSettingsScreen
