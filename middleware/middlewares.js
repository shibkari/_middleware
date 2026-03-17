import { users, articles } from '../data/store.js'

export function logRequests(req, res, next) {
  const timestamp = new Date().toISOString()
  const userAgent = req.headers['user-agent'] || 'Unknown'
  const ip = req.ip || req.connection?.remoteAddress || 'Unknown'

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`)

  if ((req.method === 'POST' || req.method === 'PUT') && req.body && Object.keys(req.body).length > 0) {
    console.log(`  Request body:`, JSON.stringify(req.body))
  }

  next()
}

export function demoAuth(req, res, next) {
  const hasAuth = !!req.headers.authorization
  if (hasAuth) {
    console.log('demoAuth: Authorization header present')
  } else {
    console.warn('demoAuth: Authorization header missing (continuing in demo mode)')
  }
  next()
}

export function attachSessionInfo(req, res, next) {
  if (req.session) {
    req.session.createdAt = req.session.createdAt || new Date().toISOString()
    console.log(`session id=${req.session.id} createdAt=${req.session.createdAt}`)
  }
  next()
}

export function strictAuth(req, res, next) {
  if (req.headers['x-require-auth'] !== 'true') {
    return next()
  }

  const auth = req.headers.authorization
  if (!auth || !/^Basic \S+$/.test(auth)) {
    console.warn('strictAuth: Missing or invalid Authorization header')
    return res.status(401).send('Unauthorized')
  }

  next()
}

export function enforceRequireAuth(req, res, next) {
  req.headers['x-require-auth'] = 'true'
  next()
}

export function validateUserData(req, res, next) {
  const { name } = req.body || {}
  if (typeof name !== 'string') {
    return res.status(400).send('Bad Request')
  }

  const trimmed = name.trim()
  if (trimmed.length === 0 || trimmed.length > 100) {
    return res.status(400).send('Bad Request')
  }

  req.body.name = trimmed
  next()
}

export function validateArticleData(req, res, next) {
  const { title } = req.body || {}
  if (typeof title !== 'string') {
    return res.status(400).send('Bad Request')
  }

  const trimmed = title.trim()
  if (trimmed.length === 0 || trimmed.length > 200) {
    return res.status(400).send('Bad Request')
  }

  req.body.title = trimmed
  next()
}

export function demoArticleAccess(req, res, next) {
  if (req.headers['x-require-strict-access'] !== 'true') {
    console.log('demoArticleAccess: demo mode (access allowed)')
    return next()
  }

  console.log('demoArticleAccess: strict mode enabled')
  if (req.method === 'DELETE') {
    const role = req.headers['x-user-role'] || 'user'
    if (role !== 'admin') {
      console.warn('demoArticleAccess: insufficient privileges for DELETE')
      return res.status(403).send('Forbidden')
    }
  }

  next()
}

export function enforceRequireStrictAccess(req, res, next) {
  req.headers['x-require-strict-access'] = 'true'
  next()
}

export function checkUserExists(req, res, next) {
  const user = users.find((u) => u.id === req.params.userId)
  if (!user) {
    console.warn(`checkUserExists: user ${req.params.userId} not found`)
    return res.status(404).send('Not Found')
  }
  req.user = user
  next()
}

export function checkArticleExists(req, res, next) {
  const article = articles.find((a) => a.id === req.params.articleId)
  if (!article) {
    console.warn(`checkArticleExists: article ${req.params.articleId} not found`)
    return res.status(404).send('Not Found')
  }
  req.article = article
  next()
}
