import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { HashComparer } from '@/data/protocols/cryptography/hasher'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { Authentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(
    authenticationParams: Authentication.Params,
  ): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authenticationParams.email,
    )
    if (account) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        account.passwordHash,
      )
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken,
        )
        return { accessToken }
      }
    }
    return null
  }
}
