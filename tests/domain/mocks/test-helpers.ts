import { forbidden } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { HttpResponse } from '@/presentation/protocols'

export const throwError = (): never => {
  throw new Error()
}

export const throwForbiddenError = (): HttpResponse => {
  return forbidden(new EmailInUseError())
}
