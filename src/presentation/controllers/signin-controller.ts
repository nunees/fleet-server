import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases/account/authentication'
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers'

export class SignInController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SignInController {
  export type Request = {
    email: string
    password: string
  }
}
