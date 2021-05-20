import Invitation from '../models/invitationModel.js'
import { createOne, deleteOne } from '../utils/handlerFactory.js'

export const createInvitation = createOne(Invitation)
export const deleteInvitation = deleteOne(Invitation)
