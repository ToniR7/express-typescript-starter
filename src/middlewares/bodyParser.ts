import type { NextFunction, Request, Response } from 'express'

export const bodyParserMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  req.body = req.body ?? {}
  next()
}
