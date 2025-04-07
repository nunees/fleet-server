import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-dapter'
import { PrismaService } from '@/infra/db/prisma/helpers/prisma-service'
import { AccountPrismaRepository } from '@/infra/db/prisma/repositories/account/account-prisma-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const administratorPrismaRepository = new AccountPrismaRepository(
    PrismaService.getInstance(),
  )
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(
    administratorPrismaRepository,
    bcryptAdapter,
    jwtAdapter,
    administratorPrismaRepository,
  )
}
