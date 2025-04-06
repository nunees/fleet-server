import { AccountPrismaRepository } from '@/infra/db/prisma/repositories/account/account-prisma-repository'
import { PrismaService } from '@/infra/db/prisma/helpers/prisma-service'
import {
  mockAddAccountParams,
  mockDuplicateAddAccountParams,
} from '@/tests/domain/mocks/mock-account'

type SutTypes = {
  sut: AccountPrismaRepository
  prismaService: PrismaService
}

const makeSut = (): SutTypes => {
  const prismaService = PrismaService.getInstance()
  const sut = new AccountPrismaRepository(prismaService)
  return {
    sut,
    prismaService,
  }
}

describe('AccountPrismaRepository', () => {
  beforeAll(async () => {
    const prismaService = PrismaService.getInstance()
    await prismaService.$connect()
  })

  beforeEach(async () => {
    const prismaService = PrismaService.getInstance()
    await prismaService.accounts.deleteMany()
    await prismaService.$disconnect()
  })

  afterAll(async () => {
    const prismaService = PrismaService.getInstance()
    await prismaService.$disconnect()
  })

  it('Should return true on account success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(true)
  })

  it('Should return false on account fail', async () => {
    const { sut } = makeSut()
    const addAccount = mockAddAccountParams()
    await sut.add(addAccount)
    const isValid = await sut.add(addAccount)
    expect(isValid).toEqual(false)
  })

  it('Should return false on account already exists', async () => {
    const { sut } = makeSut()
    const addAccount = mockDuplicateAddAccountParams()
    await sut.add(addAccount)
    const isValid = await sut.add(addAccount)
    expect(isValid).toEqual(false)
  })
})
