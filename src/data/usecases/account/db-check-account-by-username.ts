import { CheckAccountByUsernameRepository } from '@/data/protocols/db/account/check-account-by-username-repository'
import { CheckAccountByUsername } from '@/domain/usecases/account/check-account-by-username'

export class DbCheckAccountByUsername implements CheckAccountByUsername {
  constructor(
    private readonly checkAccountByUsernameRepository: CheckAccountByUsernameRepository,
  ) {}

  async check(
    username: string,
  ): Promise<CheckAccountByUsernameRepository.Result> {
    const result =
      await this.checkAccountByUsernameRepository.checkByUsername(username)
    return result !== null
  }
}
