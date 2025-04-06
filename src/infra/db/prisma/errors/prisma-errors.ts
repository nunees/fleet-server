import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class PrismaError extends PrismaClientKnownRequestError {
  constructor(params: PrismaError.Params) {
    super(params.message, params.error)
    this.name = 'PrismaClientError'
  }

  // TODO: Log the error to the server
}

export namespace PrismaError {
  export type Params = {
    message: string
    error: {
      code: string
      clientVersion: string
      meta?: any
    }
  }
}
