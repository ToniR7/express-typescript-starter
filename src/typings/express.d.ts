import type { Request } from 'express'
import type { Params, Query } from 'express-serve-static-core'

/* oxlint-disable typescript/consistent-type-definitions */
declare global {
  namespace Express {
    export interface Request {
      jwt: {
        user: string
        company: string
        division: string
        role: 'admin' | 'user'
      }
    }
  }
}
/* oxlint-enable typescript/consistent-type-definitions */

export type TypedRequestParams<T extends Params = Record<string, never>> = Request<T, unknown, unknown, unknown>
export type TypedRequestQuery<T extends Query = Record<string, never>> = Request<unknown, unknown, unknown, T>
export type TypedRequestBody<T = Record<string, never>> = Request<unknown, unknown, T, unknown>
export type TypedRequest<TQuery extends Query = Record<string, never>, TBody = Record<string, never>> = Request<unknown, unknown, TBody, TQuery>
