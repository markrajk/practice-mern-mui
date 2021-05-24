import React, { useState } from 'react'
import { TextField, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import StarIcon from '@material-ui/icons/Star'
import PropTypes from 'prop-types'

const Question = ({ question, ratingChange, answerChange }) => {
  const classes = useStyles()

  const [rating, setRating] = useState(0)
  const [answer, setAnswer] = useState(0)

  const handleRatingChange = (value) => {
    setRating(value)
    ratingChange(question._id, value)
  }

  const handleAnswerChange = (value) => {
    setAnswer(value)
    answerChange(question._id, value)
  }

  return (
    <div className={classes.root}>
      <p className={classes.question}>{question.question}</p>
      {question.type === 'rating' && (
        <div className={classes.rating}>
          {[1, 2, 3, 4, 5].map((value) => {
            if (rating >= value) {
              return (
                <StarIcon
                  key={value}
                  className={classes.starFilled}
                  onClick={(e) => handleRatingChange(value)}
                />
              )
            } else {
              return (
                <StarIcon
                  key={value}
                  className={classes.star}
                  onClick={(e) => handleRatingChange(value)}
                />
              )
            }
          })}
        </div>
      )}
      <TextField
        id="standard-required"
        label="Answer"
        type="text"
        required
        onChange={(e) => handleAnswerChange(e.currentTarget.value)}
      />
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  ratingChange: PropTypes.func.isRequired,
  answerChange: PropTypes.func.isRequired,
}

export default Question
