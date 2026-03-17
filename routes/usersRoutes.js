import express from 'express'
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/usersController.js'
import {
  demoAuth,
  strictAuth,
  validateUserData,
  checkUserExists,
  enforceRequireAuth
} from '../middleware/middlewares.js'
import { attachSessionInfo } from '../middleware/middlewares.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/', demoAuth, strictAuth, validateUserData, createUser)

router.post('/strict', demoAuth, enforceRequireAuth, strictAuth, validateUserData, createUser)

router.use(attachSessionInfo)

router.get('/:userId', getUserById)
router.put('/:userId', demoAuth, strictAuth, checkUserExists, validateUserData, updateUser)
router.delete('/:userId', demoAuth, strictAuth, checkUserExists, deleteUser)

export default router
