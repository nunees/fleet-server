import { Express } from 'express'
import { setupApp } from '@/main/config/app'
import { PrismaService } from '@/infra/db/prisma/helpers/prisma-service'
import request from 'supertest'

let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()

    // Ensure that database is empty
    // This is important to avoid conflicts between tests
    await PrismaService.getInstance().tokens.deleteMany()
    await PrismaService.getInstance().accounts.deleteMany()
  })

  afterAll(async () => {
    await PrismaService.getInstance().$disconnect()
  })

  beforeEach(async () => {
    await PrismaService.getInstance().tokens.deleteMany()
    await PrismaService.getInstance().accounts.deleteMany()
  })

  describe('[POST] /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'Felipe',
          lastName: 'Silva',
          email: 'felipe@example.com',
          username: 'felipe123',
          roleId: 1,
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(200)
    })

    test('Should return 403 if email or username already exists', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'Felipe',
          lastName: 'Silva',
          email: 'felipe@example.com',
          username: 'felipe123',
          roleId: 1,
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(200)

      await request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'Felipe',
          lastName: 'Silva',
          email: 'felipe@example.com',
          username: 'felipe123',
          roleId: 1,
          password: 'password',
          passwordConfirmation: 'password',
        })
        .expect(403)
    })
  })
})
