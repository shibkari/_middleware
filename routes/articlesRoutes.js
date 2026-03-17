import express from 'express'
import {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle
} from '../controllers/articlesController.js'
import {
  demoAuth,
  demoArticleAccess,
  validateArticleData,
  checkArticleExists,
  enforceRequireAuth,
  enforceRequireStrictAccess,
  strictAuth
} from '../middleware/middlewares.js'
import { attachSessionInfo } from '../middleware/middlewares.js'

const router = express.Router()

router.get('/', getArticles)
router.post('/', demoAuth, demoArticleAccess, validateArticleData, createArticle)

router.post(
  '/strict',
  demoAuth,
  enforceRequireAuth,
  strictAuth,
  enforceRequireStrictAccess,
  demoArticleAccess,
  validateArticleData,
  createArticle
)

router.use(attachSessionInfo)

router.get('/:articleId', getArticleById)
router.put('/:articleId', demoAuth, demoArticleAccess, checkArticleExists, validateArticleData, updateArticle)
router.delete('/:articleId', demoAuth, demoArticleAccess, checkArticleExists, deleteArticle)

export default router
