import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { CheckAccountByUsernameRepository } from '@/data/protocols/db/account/check-account-by-username-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { PrismaService } from '@/infra/db/prisma/helpers/prisma-service'

export class AccountPrismaRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    CheckAccountByUsernameRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async add(
    account: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    try {
      const result = await this.prismaService.accounts.create({
        data: {
          ...account,
        },
      })
      return !!result
    } catch (error) {
      return false
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async checkByEmail(
    email: string,
  ): Promise<CheckAccountByEmailRepository.Result> {
    try {
      const result = await this.prismaService.accounts.findUnique({
        where: {
          email,
        },
      })
      return !!result
    } catch (error) {
      return false
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async checkByUsername(
    username: string,
  ): Promise<CheckAccountByUsernameRepository.Result> {
    try {
      const result = await this.prismaService.accounts.findUnique({
        where: {
          username,
        },
      })
      return !!result
    } catch (error) {
      return false
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepository.Result> {
    try {
      const result = await this.prismaService.accounts.findUnique({
        where: {
          email,
        },
      })
      return result
    } catch (error) {
      return null
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    try {
      const oldtoken = await this.prismaService.tokens.findFirst({
        where: {
          id,
        },
      })

      if (oldtoken) {
        await this.prismaService.tokens.delete({
          where: {
            id: oldtoken.id,
          },
        })
      }

      await this.prismaService.tokens.create({
        data: {
          token,
          accountId: id,
          type: 'access',
        },
      })
    } catch (error) {
      
    } finally {
      await this.prismaService.$disconnect()
    }
  }
}
