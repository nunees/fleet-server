import { LoadAccountByUsernameRepository } from '@/data/protocols/db/account/load-account-by-username-repository'
import { LoadAccountByUsername } from '@/domain/usecases/load-account-by-username'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'

export class DbLoadAccountByUsername implements LoadAccountByUsername {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository,
  ) {}

  // TODO: change return type to boolean and refactor the code
  async load(username: string): Promise<CheckAccountByEmailRepository.Result> {
    const result =
      await this.loadAccountByUsernameRepository.loadByUsername(username)
    return result !== null
  }
}
