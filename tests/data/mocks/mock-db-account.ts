import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  account: AddAccountRepository.Params
  result = true

  async add(
    account: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    this.account = account
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy {
  email: string
  result = false

  async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByUsernameRepositorySpy {
  username: string
  result = false

  async checkByUsername(username: string): Promise<boolean> {
    this.username = username
    return this.result
  }
}
