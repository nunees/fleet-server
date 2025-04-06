// import { forbidden, ok } from '@/presentation/helpers'
// import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
// import { AccessDeniedError } from '@/presentation/errors/access-denied-error'

// export class AuthMiddleware implements Middleware {
//   constructor(
//     private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
//     private readonly role?: string,
//   ) {}

//   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
//     const accessToken = httpRequest.headers?.['x-access-token']
//     if (accessToken) {
//       const account = await this.loadAccountByTokenRepository.load(
//         accessToken,
//         this.role,
//       )
//       if (account) {
//         return ok({ accountId: account.id })
//       }
//     }
//     return forbidden(new AccessDeniedError())
//   }
// }
