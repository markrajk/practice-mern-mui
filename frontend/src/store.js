import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userSignupReducer,
  userLoginReducer,
  updateMeReducer,
  getUserReducer,
  getAllUserReducer,
  updateUserReducer,
  updateUserSettingsReducer,
  clearDBReducer,
} from './reducers/userReducers'
import {
  postListReducer,
  createPostReducer,
  getPostReducer,
  deletePostReducer,
  updatePostReducer,
} from './reducers/postReducers'
import {
  createCommentReducer,
  updateCommentReducer,
  deleteCommentReducer,
} from './reducers/commentReducers'
import {
  createTeamReducer,
  createDemoTeamReducer,
  getTeamReducer,
  updateTeamReducer,
  deleteTeamReducer,
  joinTeamReducer,
} from './reducers/teamReducers'
import {
  createInvitationReducer,
  deleteInvitationReducer,
} from './reducers/invitationReducers'
import {
  getOwnersChartsReducer,
  updateChartReducer,
  getOneChartReducer,
  createChartReducer,
} from './reducers/chartReducers'
import {
  getAllQuestionsReducer,
  createQuestionReducer,
  updateQuestionReducer,
  deleteQuestionReducer,
  createQuestionsFromDefaultReducer,
} from './reducers/questionReducers'
import { createFeedbackReducer } from './reducers/feedbcakReducers'
import {
  adminGetAllUsersReducer,
  adminUpdateUserReducer,
  adminDeleteUserReducer,
  adminGetAllQuestionsReducer,
  adminUpdateQuestionReducer,
  adminCreateQuestionReducer,
  adminDeleteQuestionReducer,
} from './reducers/adminReducers'

const reducer = combineReducers({
  clearDB: clearDBReducer,
  userSignup: userSignupReducer,
  userLogin: userLoginReducer,
  updateMe: updateMeReducer,
  updateUser: updateUserReducer,
  updateUserSettings: updateUserSettingsReducer,
  getUser: getUserReducer,
  getAllUser: getAllUserReducer,
  postList: postListReducer,
  createPost: createPostReducer,
  getPost: getPostReducer,
  deletePost: deletePostReducer,
  updatePost: updatePostReducer,
  createComment: createCommentReducer,
  updateComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
  getTeam: getTeamReducer,
  createTeam: createTeamReducer,
  createDemoTeam: createDemoTeamReducer,
  updateTeam: updateTeamReducer,
  deleteTeam: deleteTeamReducer,
  createInvitation: createInvitationReducer,
  deleteInvitation: deleteInvitationReducer,
  joinTeam: joinTeamReducer,
  getOwnersCharts: getOwnersChartsReducer,
  updateChart: updateChartReducer,
  getOneChart: getOneChartReducer,
  createChart: createChartReducer,
  getAllQuestions: getAllQuestionsReducer,
  createQuestion: createQuestionReducer,
  updateQuestion: updateQuestionReducer,
  deleteQuestion: deleteQuestionReducer,
  createFeedback: createFeedbackReducer,
  createQuestionsFromDefault: createQuestionsFromDefaultReducer,
  adminGetAllUsers: adminGetAllUsersReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminDeleteUser: adminDeleteUserReducer,
  adminGetAllQuestions: adminGetAllQuestionsReducer,
  adminUpdateQuestion: adminUpdateQuestionReducer,
  adminCreateQuestion: adminCreateQuestionReducer,
  adminDeleteQuestion: adminDeleteQuestionReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
