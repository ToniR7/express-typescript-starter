import type { Express } from 'express'
import type { ApiResponse } from '@/models/responses'

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { setAppConfigurations, setAppRoutes } from '@/utils'

const ENDPOINT = '/healthz'

describe(`GET ${ENDPOINT}`, () => {
  const app: Express = express()
  setAppConfigurations(app)
  setAppRoutes(app)

  it('should return a 400 status code (ZodValidationError - invalid query schema)', async () => {
    const { status, body } = await request(app).get(ENDPOINT).query({ test: 'test' })

    const errorMessage: ApiResponse = {
      message: 'schema-error.invalid-query',
      params: {
        path: '/healthz/',
        errors: { formErrors: ['Unrecognized key: "test"'], fieldErrors: {} },
      },
    }

    expect(status).toEqual(StatusCodes.BAD_REQUEST)
    expect(body).toEqual(errorMessage)
  })

  it('should return a 400 status code (ZodValidationError - invalid body schema)', async () => {
    const { status, body } = await request(app).get(ENDPOINT).send({ test: 'test' })

    const errorMessage: ApiResponse = {
      message: 'schema-error.invalid-body',
      params: {
        path: '/healthz/',
        errors: { formErrors: ['Unrecognized key: "test"'], fieldErrors: {} },
      },
    }

    expect(status).toEqual(StatusCodes.BAD_REQUEST)
    expect(body).toEqual(errorMessage)
  })

  it('should return a 200 status code', async () => {
    const { status, body } = await request(app).get(ENDPOINT).send({})

    expect(status).toEqual(StatusCodes.OK)
    expect(body).toEqual({})
  })
})
