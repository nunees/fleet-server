import { HttpResponse } from './http'

export interface Middleware<T = any> {
  handle: (any: T) => Promise<HttpResponse>
}
