import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  createQuestion,
  createQuestionFromDefaults,
} from '../../actions/questionActions'
import { updateTeam, getTeam } from '../../actions/teamActions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Button,
  Modal,
  TextField,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import Question from './Question'
import SettingsIcon from '@material-ui/icons/Settings'
import { useStyles } from './styles'

const FeedbackSettingsScreen = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const allQuestions = useSelector((state) => state.getAllQuestions)
  const { questions } = allQuestions

  const createdQuestion = useSelector((state) => state.createQuestion)
  const {
    error,
    question: createQuestionRes,
    success: createSuccess,
  } = createdQuestion

  const createdQuestionFromDefaults = useSelector(
    (state) => state.createQuestionsFromDefault
  )
  const { success: createSuccessFromDefaults } = createdQuestionFromDefaults

  const updatedQuestion = useSelector((state) => state.updateQuestion)
  const { question: updateQuestionRes, success } = updatedQuestion

  const gotTeam = useSelector((state) => state.getTeam)
  const { team } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success: teamUpdateSuccess } = updatedTeam

  const deletedQuestion = useSelector((state) => state.deleteQuestion)
  const {
    loading,
    question: deleteQuestionRes,
    success: deleteSuccess,
  } = deletedQuestion

  const [category, setCategory] = useState(
    localStorage.getItem('questionCategory') || 'subordinate'
  )
  const [newCategory, setNewCategory] = useState('subordinate')
  const [newType, setNewType] = useState('text')
  const [newQuestion, setNewQuestion] = useState('')
  const [open, setOpen] = React.useState(false)
  const [deleting, setDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [questionArr, setQuestionArr] = useState([])
  const [defaultA, setDefaultA] = useState(false)

  const handleDefaultAChange = (event) => {
    if (event.target.checked) {
      handleCreateFromDefaults()
    } else {
      questions.forEach((question) => {
        if (question.default) {
          handleDeleteQuestion(question._id)
          dispatch(updateTeam(match.params.id, { defaultQuestions: false }))
        }
      })
    }
    setDefaultA(event.target.checked)
  }

  const handleCreateFromDefaults = () => {
    if (team && team.defaultQuestions) {
      return window.alert('You already added default questions')
    }
    dispatch(createQuestionFromDefaults(match.params.id))
    dispatch(updateTeam(match.params.id, { defaultQuestions: true }))
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const questionsArr = reorder(
      questionArr,
      result.source.index,
      result.destination.index
    ).filter((filter) => filter.category === category)

    localStorage.setItem(`${category}Questions`, JSON.stringify(questionsArr))
    setQuestionArr(questionsArr)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNewQuestion('')
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    localStorage.setItem('questionCategory', event.target.value)
  }

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }

  const handleNewTypeChange = (event) => {
    setNewType(event.target.value)
  }

  const handleNewQuestionChange = (value) => {
    setNewQuestion(value)
  }

  const handleCreateQuestion = (category, type, question) => {
    const obj = {
      category,
      type,
      question,
    }
    dispatch(createQuestion(match.params.id, obj))
    handleClose()
    setDeleting(false)
  }

  const handleUpdateQuestion = (id, value) => {
    dispatch(
      updateQuestion(match.params.id, id, { question: value, default: false })
    )
    let arr = JSON.parse(localStorage.getItem(`${category}Questions`))
    if (arr) {
      arr.forEach((e) => {
        if (e._id === id) {
          e.question = value
        }
      })
      localStorage.setItem(`${category}Questions`, JSON.stringify(arr))
      setQuestionArr(arr)
    }
    setDeleting(false)
  }

  const handleDeleteQuestion = (id) => {
    setDeleting(true)
    dispatch(deleteQuestion(match.params.id, id))
    let arr = JSON.parse(localStorage.getItem(`${category}Questions`))
    if (arr) {
      arr = arr.filter((filter) => filter._id !== id)
      localStorage.setItem(`${category}Questions`, JSON.stringify(arr))
      setQuestionArr(arr)
    }
  }

  useEffect(() => {
    dispatch(getAllQuestions(match.params.id))
    if (createSuccess && !deleting) {
      let arr = JSON.parse(
        localStorage.getItem(`${createQuestionRes.category}Questions`)
      )

      if (arr) {
        arr.push(createQuestionRes)
        localStorage.setItem(
          `${createQuestionRes.category}Questions`,
          JSON.stringify(arr)
        )
        setQuestionArr(arr)

        setDeleting(false)
      }
    }
  }, [
    dispatch,
    match,
    success,
    deleteSuccess,
    createSuccess,
    createSuccessFromDefaults,
  ])

  useEffect(() => {
    if (questions && questions.length !== 0) {
      if (
        localStorage.getItem(`${category}Questions`) &&
        questions.filter((filter) => filter.category === category).length !==
          JSON.parse(localStorage.getItem(`${category}Questions`)).length
      ) {
        localStorage.setItem(
          `${category}Questions`,
          JSON.stringify(
            questions.filter((filter) => filter.category === category)
          )
        )
      }

      setQuestionArr(
        JSON.parse(localStorage.getItem(`${category}Questions`)) ||
          questions.filter((filter) => filter.category === category)
      )
    }
  }, [questions, category])

  useEffect(() => {
    dispatch(getTeam(match.params.id))
  }, [dispatch, teamUpdateSuccess])

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.header}>
        <Typography variant="p" className={classes.headerTitle}>
          Feedback settings
        </Typography>
        <div className={classes.headerBottom}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Select category</InputLabel>
            <Select
              native
              value={localStorage.getItem('questionCategory')}
              onChange={handleCategoryChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <option value={'subordinate'}>Subordinate</option>
              <option value={'supervisor'}>Supervisor</option>
              <option value={'peers'}>Peers</option>
              <option value={'self'}>Self</option>
            </Select>
          </FormControl>

          <div style={{ marginRight: '1em', marginLeft: 'auto' }}>
            <SettingsIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            />

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={defaultA}
                      onChange={handleDefaultAChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Option A"
                />
              </MenuItem>
            </Menu>
          </div>

          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add New Question
          </Button>
        </div>
      </div>
      <div className={classes.body}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {questionArr.length !== 0 &&
                  questionArr
                    .filter((filter) => filter.category === category)
                    .map((question, index) => (
                      <Draggable
                        draggableId={question._id}
                        index={index}
                        key={question._id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Question
                              updateQuestion={handleUpdateQuestion}
                              deleteQuestion={handleDeleteQuestion}
                              question={question}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">
                Select category
              </InputLabel>
              <Select
                native
                value={newCategory}
                onChange={handleNewCategoryChange}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <option value={'subordinate'}>Subordinate</option>
                <option value={'supervisor'}>Supervisor</option>
                <option value={'peers'}>Peers</option>
                <option value={'self'}>Self</option>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Select type</InputLabel>
              <Select
                native
                value={newType}
                onChange={handleNewTypeChange}
                inputProps={{
                  name: 'type',
                  id: 'type',
                }}
              >
                <option value={'rating'}>Rating</option>
                <option value={'text'}>Text</option>
              </Select>
            </FormControl>
          </div>
          <div>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                required
                id="filled-required"
                label="Edit question"
                onChange={(e) => handleNewQuestionChange(e.currentTarget.value)}
              />
            </form>
          </div>
          <div className={classes.modalFooter}>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={(e) =>
                handleCreateQuestion(newCategory, newType, newQuestion)
              }
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </Paper>
  )
}

export default FeedbackSettingsScreen
