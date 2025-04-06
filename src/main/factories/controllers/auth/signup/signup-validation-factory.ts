/*
    In this file, we are going to create a factory to make the SignUpValidation class.
    This factory will be used to instantiate the SignUpValidation class in the SignUpController.
    The SignUpValidation class is a composition of the RequiredFieldsValidation, CompareFieldsValidation, and EmailValidation classes.
*/

import {
  ValidationComposite,
  RequiredFieldsValidation,
  CompareFieldsValidation,
  EmailValidation,
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'firstName',
    'lastName',
    'email',
    'username',
    'roleId',
    'password',
    'passwordConfirmation',
  ]) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
