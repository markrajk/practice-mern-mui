import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam } from '../../actions/teamActions'
import { getAllQuestions } from '../../actions/questionActions'
import { createFeedback } from '../../actions/feedbackActions'
import { Paper, Typography, Avatar, Modal, Button } from '@material-ui/core'
import Question from './Question'
import { useStyles } from './styles'

const GiveFeedbackScreen = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [feedbackCategory, setFeedbackCategory] = useState('')
  const [feedbacks, setFeedbacks] = useState({})

  const gotTeam = useSelector((state) => state.getTeam)
  const { team } = gotTeam

  const allQuestions = useSelector((state) => state.getAllQuestions)
  const { questions } = allQuestions

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkMemberRole = (member, team) => {
    if (team.owner._id === member._id) return 3
    if (team.admins.includes(member)) return 2
    if (team.members.includes(member)) return 1
  }

  const checkMyRole = (team) => {
    if (team.owner._id === userInfo._id) return 3
    if (team.admins.some((filter) => filter._id === userInfo._id)) return 2
    if (team.members.some((filter) => filter._id === userInfo._id)) return 1
  }

  const handleModalCategoryClick = (value) => {
    setFeedbackCategory(value)
    handleCategoryClose()
    handleOpen()
  }

  const handleCategoryOpen = () => {
    setCategoryOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFeedbacks({})
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCategoryClose = () => {
    setCategoryOpen(false)
  }

  const handleUserSelect = (user) => {
    handleCategoryOpen()
    setSelectedUser(user)
  }

  const handleRatingChange = (id, value) => {
    setFeedbacks({
      ...feedbacks,
      [`${id}`]: { ...feedbacks[`${id}`], rating: value },
    })
    // setFeedbacks({
    //   ...feedbacks,
    //   [`${id}`]: value,
    // })
  }

  const handleAnswerChange = (id, value) => {
    setFeedbacks({
      ...feedbacks,
      [`${id}`]: { ...feedbacks[`${id}`], answer: value },
    })
    // setFeedbacks({
    //   ...feedbacks,
    //   [`${id}`]: value,
    // })
  }

  const handleSendFeedback = (feedback) => {
    const tempArr = questions.filter(
      (filter) => filter.category === feedbackCategory
    )

    if (tempArr.length !== Object.keys(feedback).length) {
      return window.alert('You need to answer all questions!')
    } else if (
      tempArr.some(
        (e) =>
          !feedback[`${e._id}`].answer || feedback[`${e._id}`].answer === ''
      )
    ) {
      return window.alert('You need to answer all questions!')
    } else if (
      tempArr.some(
        (e) =>
          e.type === 'rating' &&
          (!feedback[`${e._id}`].rating || feedback[`${e._id}`].rating === 0)
      )
    ) {
      return window.alert('You must select rating!')
    }
    tempArr.forEach((e) => {
      const obj = {
        category: feedbackCategory,
        question: e._id,
        answer: feedback[`${e._id}`].answer || undefined,
        rating: feedback[`${e._id}`].rating || undefined,
      }
      dispatch(createFeedback(match.params.id, selectedUser._id, obj))
    })

    handleClose()
  }

  useEffect(() => {
    dispatch(getTeam(match.params.id))
    dispatch(getAllQuestions(match.params.id))

    // if (questions) {
    //   setFeedbacks(
    //     questions.map((question) => {
    //       return {
    //         [`${question._id}`]: {
    //           answer: {},
    //         },
    //       }
    //     })
    //   )
    // }
  }, [dispatch, match])

  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.header}>
          <p className={classes.headerTitle}>Give feedback</p>
        </div>
        <div className={classes.body}>
          {team &&
            [team.owner, ...team.admins, ...team.members].map((member) => (
              <div
                key={member._id}
                className={classes.person}
                onClick={(e) => handleUserSelect(member)}
              >
                <Avatar
                  variant="rounded"
                  className={classes.avatar}
                  alt={member.fullName}
                  src={`/img/users/${member.photoLg}`}
                />
                <p className={classes.personName}>{member.fullName}</p>
                <p className={classes.personJobTitle}>
                  {checkMemberRole(member, team) === 1
                    ? 'Member'
                    : checkMemberRole(member, team) === 2
                    ? 'Admin'
                    : 'Owner'}
                </p>
              </div>
            ))}
        </div>
      </Paper>
      {team && selectedUser && (
        <Modal
          open={categoryOpen}
          onClose={handleCategoryClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modal}>
            <div className={classes.modalHeader}>
              <p className={classes.modalHeaderTitle}>Choose category</p>
            </div>

            <div className={classes.categoryModalBody}>
              {selectedUser._id === userInfo._id ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(e) => handleModalCategoryClick('self')}
                >
                  Self Evaluation
                </Button>
              ) : (
                <>
                  {checkMemberRole(selectedUser, team) === 3 && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(e) => handleModalCategoryClick('subordinate')}
                    >
                      Subordinate Feedback
                    </Button>
                  )}
                  {checkMemberRole(selectedUser, team) ===
                    checkMyRole(team) && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(e) => handleModalCategoryClick('peers')}
                    >
                      P2P Feedback
                    </Button>
                  )}
                  {checkMyRole(team) === 3 && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(e) => handleModalCategoryClick('supervisor')}
                    >
                      Supervisory Feedback
                    </Button>
                  )}
                </>
              )}
              {/* <Button
                color="primary"
                variant="contained"
                onClick={(e) => handleModalCategoryClick('all')}
              >
                All Feedback
              </Button> */}
            </div>
          </div>
        </Modal>
      )}
      {questions && selectedUser && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modal}>
            <div className={classes.modalHeader}>
              <p className={classes.modalHeaderTitle}>Send feedback</p>
            </div>

            <div className={classes.feedbackModalBody}>
              {questions
                .filter((filter) => filter.category === feedbackCategory)
                .sort((a, b) => a.order - b.order)
                .map((question) => (
                  <Question
                    key={question._id}
                    question={question}
                    ratingChange={handleRatingChange}
                    answerChange={handleAnswerChange}
                  />
                ))}
            </div>

            <div className={classes.modalFooter}>
              <Button size="small" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={(e) => handleSendFeedback(feedbacks)}
              >
                Send
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default GiveFeedbackScreen
