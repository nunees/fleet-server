import { PrismaError } from '@/infra/db/prisma/errors/prisma-errors'

export const throwPrismaError = (): never => {
  throw new PrismaError({
    message: 'PrismaError',
    error: { code: 'P1001', clientVersion: '1.0', meta: null },
  })
}
