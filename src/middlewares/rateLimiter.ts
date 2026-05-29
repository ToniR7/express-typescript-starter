import type { Options, RateLimitRequestHandler } from 'express-rate-limit'

import { rateLimit } from 'express-rate-limit'

const options: Partial<Options> = {
  windowMs: 1 * 60 * 1000,
  limit: 100,
  message: { message: 'Too many requests from this IP, please try again after 1 minute.' },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}

export const rateLimiter: RateLimitRequestHandler = rateLimit(options)
