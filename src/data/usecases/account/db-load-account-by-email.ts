import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByEmail } from '@/domain/usecases/account/load-account-by-email'

export class DbLoadAccountByEmail implements LoadAccountByEmail {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async load(email: string): Promise<CheckAccountByEmailRepository.Result> {
    const result = await this.loadAccountByEmailRepository.loadByEmail(email)
    return result !== null
  }
}
