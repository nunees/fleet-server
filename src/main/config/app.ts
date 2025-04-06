import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import staticFiles from '@/main/config/static-files'

import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  // Disable x-powered-by header to hide the express signature
  app.disable('x-powered-by')
  setupMiddlewares(app)
  setupRoutes(app)
  staticFiles(app)
  return app
}
