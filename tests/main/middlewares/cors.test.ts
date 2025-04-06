import { Express, Request, Response } from 'express'
import { setupApp } from '@/main/config/app'

import request from 'supertest'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should enable CORS', async () => {
    app.get('/cors', (req: Request, res: Response) => {
      res.send()
    })

    await request(app)
      .get('/cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
