import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { PrismaService } from '@/infra/db/prisma/helpers/prisma-service'
import { AccountPrismaRepository } from '@/infra/db/prisma/repositories/account/account-prisma-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const prismaInstance = PrismaService.getInstance()
  const accountPrismaRepository = new AccountPrismaRepository(prismaInstance)
  return new DbAddAccount(
    bcryptAdapter,
    accountPrismaRepository,
    accountPrismaRepository,
    accountPrismaRepository,
  )
}
