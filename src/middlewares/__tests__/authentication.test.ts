import type { Express, Response } from 'express'
import type * as EnvModule from '#/environment/environmentVariables.ts'
import type { ApiResponse } from '#/models/responses.ts'
import type { TypedRequest } from '#/typings/express.d.ts'

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { setAppConfigurations, setAppRoutes } from '#/utils/appInitialization.ts'
import { FAKE_JWT_TOKEN } from '#/utils/testUtils/constants.ts'

vi.mock('#/environment/environmentVariables.ts', async () => {
  const actual = await vi.importActual<typeof EnvModule>('#/environment/environmentVariables.ts')
  return {
    ...actual,
    envVariables: {
      ...actual.envVariables,
      NODE_ENV: 'production',
    },
  }
})

describe('Authentication middleware', () => {
  const app: Express = express()
  setAppConfigurations(app)
  setAppRoutes(app)

  app.get('/authenticated-api', (_req: TypedRequest, res: Response) => {
    res.status(StatusCodes.OK).send({ message: 'API is authenticated' })
  })

  it('should return a 401 status code (token not provided)', async () => {
    const { status, body } = await request(app).get('/authenticated-api').send({})
    const errorMessage: ApiResponse = {
      message: 'token.authorization.missing',
    }

    expect(status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(body).toEqual(errorMessage)
  })

  it('should return a 401 status code (invalid token)', async () => {
    const { status, body } = await request(app).get('/authenticated-api').set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`).send({})
    const errorMessage: ApiResponse = {
      message: 'token.authorization.invalid',
    }

    expect(status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(body).toEqual(errorMessage)
  })
})
