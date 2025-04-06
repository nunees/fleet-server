import { Validation } from '@/presentation/protocols'
import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignInValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
