import type { StatusCodes } from 'http-status-codes'
import type { IntRange } from 'type-fest'

type ErrorCode = Exclude<StatusCodes, IntRange<100, 399>>
type SuccessCode = StatusCodes.OK

export type DataErrorResponse = {
  message: string
  params: Record<string, unknown>
}

type ErrorResolverResponse = {
  status: ErrorCode
  data: DataErrorResponse
}

type SuccessResolverResponse<T> = {
  status: SuccessCode
  data: T
}

export type ResolverResponse<T> = SuccessResolverResponse<T> | ErrorResolverResponse
