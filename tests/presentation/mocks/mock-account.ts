import { AddAccount } from '@/domain/usecases/account/add-account'
import { faker } from '@faker-js/faker'
import { Authentication } from '@/domain/usecases/account/authentication'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.string.uuid(),
  }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
