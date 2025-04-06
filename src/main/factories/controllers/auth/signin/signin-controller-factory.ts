import { makeDbAuthentication } from '@/main/factories/usecases'
import { SignInController } from '@/presentation/controllers/signin-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignInValidation } from './signin-validation-factory'

export const makeSignInController = (): Controller => {
  const controller = new SignInController(
    makeDbAuthentication(),
    makeSignInValidation(),
  )

  return controller
}
