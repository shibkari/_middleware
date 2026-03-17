import express from 'express'

import usersRoutes from './routes/usersRoutes.js'
import articlesRoutes from './routes/articlesRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { logRequests } from './middleware/middlewares.js'
import session from 'express-session'

const app = express()

app.use(express.json())

app.use(logRequests)

app.use(
  session({
    secret: 'dev-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)

app.get('/', (req, res) => {
  res.status(200).send('Get root route')
})

app.use('/users', usersRoutes)
app.use('/articles', articlesRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Available routes:')
  console.log('  [GET]  /')
  console.log('  [GET]  /users')
  console.log('  [POST] /users')
  console.log('  [POST] /users/strict  (strict auth required)')
  console.log('  [PUT]  /users/:userId')
  console.log('  [DELETE] /users/:userId')
  console.log('  [GET]  /articles')
  console.log('  [POST] /articles')
  console.log('  [POST] /articles/strict (strict auth + strict access)')
  console.log('  [PUT]  /articles/:articleId')
  console.log('  [DELETE] /articles/:articleId')

  console.log('\nMiddleware summary:')
  console.log('  logRequests: logs method, url, ip, user-agent, body for POST/PUT')
  console.log('  demoAuth: logs presence of Authorization header (allows by default)')
  console.log('  strictAuth: enforced when header x-require-auth: true (returns 401 if missing/invalid)')
  console.log('  validateUserData / validateArticleData: trims and validates fields')
  console.log('  demoArticleAccess: demo mode by default; strict via x-require-strict-access')

  console.log('Examples:')
  console.log(
    '  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Test User\"}"'
  )
  console.log(
    '  curl -X POST http://localhost:3000/users/strict -H "Content-Type: application/json" -d "{\"name\":\"Test User\"}"  # -> 401'
  )
  console.log(
    '  curl -X POST http://localhost:3000/users/strict -H "Content-Type: application/json" -H "Authorization: Basic dGVzdDp0ZXN0" -d "{\"name\":\"Test User\"}"  # -> 201'
  )
})
