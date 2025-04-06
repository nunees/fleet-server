import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { CheckAccountByEmail } from '@/domain/usecases/check-account-by-email'

export class DbCheckAccountByEmail implements CheckAccountByEmail {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
  ) {}

  async check(email: string): Promise<boolean> {
    return this.checkAccountByEmailRepository.checkByEmail(email)
  }
}
