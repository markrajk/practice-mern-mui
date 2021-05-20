import express from 'express'
import {
  protect,
  setOwnerIds,
  setSenderIds,
  setTeamIds,
  restrictToTeamRoles,
  setUserIds,
} from '../middlewares/authMiddlewares.js'
import {
  createTeam,
  getTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
  joinTeam,
} from '../controllers/teamController.js'
import { createInvitation } from '../controllers/invitationController.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getAllTeams).post(setOwnerIds, createTeam)

router
  .route('/:id')
  .get(restrictToTeamRoles('member', 'admin', 'owner'), getTeam)
  .patch(restrictToTeamRoles('admin', 'owner'), updateTeam)
  .delete(restrictToTeamRoles('owner'), deleteTeam)

router.route('/:id/joinTeam').patch(setUserIds, joinTeam)
router
  .route('/:id/invitations')
  .post(
    protect,
    setSenderIds,
    setTeamIds,
    restrictToTeamRoles('admin', 'owner'),
    createInvitation
  )

export default router
