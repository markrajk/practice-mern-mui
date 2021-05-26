import React, { useState, useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import { TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { useStyles } from './styles'
import StarIcon from '@material-ui/icons/Star'
import SubjectIcon from '@material-ui/icons/Subject'
import LockIcon from '@material-ui/icons/Lock'
import PropTypes from 'prop-types'

const Question = ({ question, updateQuestion, deleteQuestion }) => {
  const classes = useStyles()

  const [questionText, setQuestionText] = useState('')

  const handleUpdateQuestion = (id) => {
    updateQuestion(id, questionText)
  }

  const handleDeleteQuestion = (id) => {
    deleteQuestion(id)
  }

  const handleQuestionChange = (value) => {
    setQuestionText(value)
  }

  useEffect(() => {
    setQuestionText(question.question)
  }, [setQuestionText, question])

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            {question.type === 'text' ? <SubjectIcon /> : <StarIcon />}
            <Typography className={classes.heading}>
              {question.question}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required
              id="filled-required"
              label="Edit question"
              defaultValue={question.question}
              onChange={(e) => handleQuestionChange(e.currentTarget.value)}
            />
          </form>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            size="small"
            onClick={(e) => handleDeleteQuestion(question._id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={(e) => handleUpdateQuestion(question._id)}
          >
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
}

export default Question
