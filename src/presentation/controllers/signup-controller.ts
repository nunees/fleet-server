import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases/add-account'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { Authentication } from '@/domain/usecases/authentication'
import { InvalidParamError } from '../errors'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const {
        firstName,
        lastName,
        username,
        roleId,
        email,
        password,
      } = request

      const isValid = await this.addAccount.add({
        firstName,
        lastName,
        username,
        email,
        passwordHash: password,
        roleId,
      })

      if (!isValid) {
        return forbidden(new Error('The received email is already in use'))
      }

      const authentication = await this.authentication.auth({
        email,
        password,
      })

      return ok(authentication)
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return forbidden(error)
      }

      return serverError(error as Error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    roleId: number
    passwordConfirmation: string
  }
}
