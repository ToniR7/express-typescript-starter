import type { NextFunction, Request, Response } from 'express'
import type { JwtHeader, SigningKeyCallback, VerifyOptions } from 'jsonwebtoken'
import type { JwtPayload } from 'jwt-decode'

import JsonWebToken from 'jsonwebtoken'
import JwksClient from 'jwks-rsa'
import { jwtDecode } from 'jwt-decode'
import { envVariables } from '#/environment/index.ts'
import { ApiError } from '#/errors/apiError.ts'
import { obtainRoleAndDivision } from '#/utils/authentication.ts'

type JwtPayloadExtended = JwtPayload &
  Partial<{
    company: string
    groupId: Array<string>
    roles: Array<string>
    name: string
    nonce: string
    oid: string
    upn: string
    preferred_username: string
    rh: string
    tid: string
    uti: string
    ver: string
  }>

// Higher-Order Function: this function takes tenantId as an argument and returns a new function that performs the actual work of fetching the public key.
const getPublicKey =
  (tenantId: string) =>
  async (header: JwtHeader, callback: SigningKeyCallback): Promise<void> => {
    const jwksClient = JwksClient({
      jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
    })

    try {
      const key = await jwksClient.getSigningKey(header.kid)
      const signingKey = key.getPublicKey()
      callback(null, signingKey)
    } catch (error) {
      if (error instanceof Error) {
        callback(error)
      }
      callback(new Error('Error fetching public key'))
    }
  }

// Middleware to validate JWT token
const validateJwtToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { CLIENT_ENTERPRISE_APPLICATION_ID, SERVER_ENTERPRISE_APPLICATION_ID, TENANT_ID, NODE_ENV } = envVariables
  const {
    headers: { authorization },
  } = req

  const token = authorization?.split(' ')[1]

  if (!token) {
    throw ApiError.unauthorizedError({
      message: 'token.authorization.missing',
      logMessage: 'Unauthorized - Token not provided',
    })
  }

  const { upn, preferred_username, company, roles } = jwtDecode<JwtPayloadExtended>(token)
  const { role, division } = obtainRoleAndDivision(roles)

  req.jwt = {
    user: upn ?? preferred_username ?? 'backend',
    company: company ?? 'brembo',
    division: division[0] ?? 'transformation',
    role,
  }

  if (NODE_ENV !== 'production') {
    return next()
  }

  const validationOptions: VerifyOptions = {
    audience: [CLIENT_ENTERPRISE_APPLICATION_ID, SERVER_ENTERPRISE_APPLICATION_ID], // string, regular expression or a list of strings and/or regular expressions for the aud field into payload section
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`, // string or array of strings of valid values for the iss field into payload section
  }

  JsonWebToken.verify(token, getPublicKey(TENANT_ID), validationOptions, (error) => {
    if (error) {
      return next(
        ApiError.unauthorizedError({
          message: 'token.authorization.invalid',
          logMessage: `Unauthorized - Invalid token. Error: ${error.message}`,
        }),
      )
    }
    next()
  })
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await validateJwtToken(req, res, next)
}
