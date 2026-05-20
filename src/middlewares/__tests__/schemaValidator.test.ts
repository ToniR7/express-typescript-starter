import type { Express, Response } from 'express'
import type { ApiResponse } from '@/models/responses'
import type { TypedRequest } from '@/typings/express'

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { validateZodHandler } from '@/middlewares/schemaValidator'
import { setAppConfigurations, setAppRoutes } from '@/utils/appInitialization'
import { FAKE_JWT_TOKEN } from '@/utils/testUtils/constants'
import { testBodySchema, testHeaderSchema, testParamsSchema, testQuerySchema } from '@/utils/testUtils/models'

describe('Schema validation middleware', () => {
  const app: Express = express()
  setAppConfigurations(app)
  setAppRoutes(app)

  app.get(
    '/validate-schema-with-header',
    validateZodHandler({
      headerSchema: testHeaderSchema,
      paramsSchema: testParamsSchema,
      querySchema: testQuerySchema,
      bodySchema: testBodySchema,
    }),
    (_req: TypedRequest, res: Response) => {
      res.status(StatusCodes.OK).send({ message: 'validated schema with header' })
    },
  )

  app.get(
    '/validate-schema-without-header',
    validateZodHandler({
      paramsSchema: testParamsSchema,
      querySchema: testQuerySchema,
      bodySchema: testBodySchema,
    }),
    (_req: TypedRequest, res: Response) => {
      res.status(StatusCodes.OK).send({ message: 'validated schema without header' })
    },
  )

  describe('GET /validate-schema-with-header', () => {
    it('should return a 400 status code (invalid header)', async () => {
      const { status, body } = await request(app).get('/validate-schema-with-header').set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`)

      const errorMessage: ApiResponse = {
        message: 'schema-error.invalid-header',
        params: {
          path: '/validate-schema-with-header',
          errors: {
            formErrors: [],
            fieldErrors: { role: ['Invalid option: expected one of "admin"|"user"'] },
          },
        },
      }

      expect(status).toEqual(StatusCodes.BAD_REQUEST)
      expect(body).toEqual(errorMessage)
    })

    it('should return a 400 status code (invalid body)', async () => {
      const { status, body } = await request(app)
        .get('/validate-schema-with-header')
        .set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`)
        .set('role', 'admin')
        .send({ id: '123' })

      const errorMessage: ApiResponse = {
        message: 'schema-error.invalid-body',
        params: {
          path: '/validate-schema-with-header',
          errors: {
            formErrors: [],
            fieldErrors: {
              name: ['Invalid input: expected string, received undefined'],
            },
          },
        },
      }

      expect(status).toEqual(StatusCodes.BAD_REQUEST)
      expect(body).toEqual(errorMessage)
    })

    it('should return a 200 status code (valid header and body)', async () => {
      const { status, body } = await request(app)
        .get('/validate-schema-with-header')
        .set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`)
        .set('role', 'admin')
        .send({ id: '123', name: 'test' })

      expect(status).toEqual(StatusCodes.OK)
      expect(body).toEqual({ message: 'validated schema with header' })
    })
  })

  describe('GET /validate-schema-without-header', () => {
    it('should return a 400 status code (invalid body)', async () => {
      const { status, body } = await request(app).get('/validate-schema-without-header').set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`).send({ id: '123' })

      const errorMessage: ApiResponse = {
        message: 'schema-error.invalid-body',
        params: {
          path: '/validate-schema-without-header',
          errors: {
            formErrors: [],
            fieldErrors: {
              name: ['Invalid input: expected string, received undefined'],
            },
          },
        },
      }

      expect(status).toEqual(StatusCodes.BAD_REQUEST)
      expect(body).toEqual(errorMessage)
    })
  })

  it('should return a 200 status code (valid body)', async () => {
    const { status, body } = await request(app)
      .get('/validate-schema-without-header')
      .set('Authorization', `Bearer ${FAKE_JWT_TOKEN}`)
      .send({ id: '123', name: 'test' })

    expect(status).toEqual(StatusCodes.OK)
    expect(body).toEqual({ message: 'validated schema without header' })
  })
})
