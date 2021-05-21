import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} from '../../actions/questionActions'
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Button,
  Modal,
  TextField,
} from '@material-ui/core'
import Question from './Question'
import { useStyles } from './styles'

const FeedbackSettingsScreen = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const allQuestions = useSelector((state) => state.getAllQuestions)
  const { questions } = allQuestions

  const createdQuestion = useSelector((state) => state.createQuestion)
  const { success: createSuccess } = createdQuestion

  const updatedQuestion = useSelector((state) => state.updateQuestion)
  const { success } = updatedQuestion

  const deletedQuestion = useSelector((state) => state.deleteQuestion)
  const { success: deleteSuccess } = deletedQuestion

  const [category, setCategory] = useState('all')
  const [newCategory, setNewCategory] = useState('all')
  const [newType, setNewType] = useState('text')
  const [newQuestion, setNewQuestion] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNewCategory('all')
    setNewType('text')
    setNewQuestion('')
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
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
  }

  const handleUpdateQuestion = (id, value) => {
    dispatch(updateQuestion(match.params.id, id, { question: value }))
  }

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion(match.params.id, id))
  }

  useEffect(() => {
    dispatch(getAllQuestions(match.params.id))
  }, [dispatch, match, success, deleteSuccess, createSuccess])

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
              value={category}
              onChange={handleCategoryChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <option value={'all'}>All</option>
              <option value={'peers'}>Peers</option>
              <option value={'lead'}>Lead</option>
              <option value={'self'}>Self</option>
            </Select>
          </FormControl>

          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add New Question
          </Button>
        </div>
      </div>
      <div className={classes.body}>
        {questions &&
          questions
            .filter((filter) => filter.category === category)
            .map((question) => (
              <Question
                updateQuestion={handleUpdateQuestion}
                deleteQuestion={handleDeleteQuestion}
                question={question}
              />
            ))}
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
                <option value={'all'}>All</option>
                <option value={'peers'}>Peers</option>
                <option value={'lead'}>Lead</option>
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
