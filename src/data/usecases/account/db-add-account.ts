import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { CheckAccountByUsernameRepository } from '@/data/protocols/db/account/check-account-by-username-repository'

export class DbAddAccount implements AddAccountRepository {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly checkAccountByUsernameRepository: CheckAccountByUsernameRepository,
  ) {}

  async add(
    account: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    const emailExists = await this.checkAccountByEmailRepository.checkByEmail(
      account.email,
    )
    const usernameExists =
      await this.checkAccountByUsernameRepository.checkByUsername(
        account.username,
      )

    let isValid = false
    if (!emailExists && !usernameExists) {
      const passwordHash = await this.hasher.hash(account.passwordHash)
      isValid = await this.addAccountRepository.add({
        ...account,
        passwordHash: passwordHash,
      })
    }
    return isValid
  }
}
