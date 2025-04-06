/*
    This file is a factory to make the SignUpController class.
    It is used to instantiate the SignUpController class in the SignUpRoutes file.
*/
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  )
  return controller
}
