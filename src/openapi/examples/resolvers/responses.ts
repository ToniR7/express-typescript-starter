import type { DataErrorResponse } from '@/models/resolvers/responses'

export const dataErrorResponseExample: DataErrorResponse = {
  message: 'response.message.error',
  params: {
    errorId: 'abc123',
  },
}
