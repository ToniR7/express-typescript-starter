import type { DataErrorResponse } from '#/models/resolvers/responses.ts'

export const dataErrorResponseExample: DataErrorResponse = {
  message: 'response.message.error',
  params: {
    errorId: 'abc123',
  },
}
