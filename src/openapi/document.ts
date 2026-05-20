import pkg from '#package' with { type: 'json' }
import { createDocument } from 'zod-openapi'
import { healthzOperation } from '#/openapi/routes/index.ts'

const { name, version, description } = pkg

export const openApiDocument = createDocument({
  openapi: '3.1.1',
  info: {
    title: name,
    version,
    description,
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT ?? '5010'}`,
      description: 'Development server',
    },
    {
      url: `http://${name}:${process.env.PORT ?? '5010'}`,
      description: 'Production Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT based authentication',
      },
    },
  },
  paths: {
    '/healthz': {
      get: healthzOperation,
    },
  },
})
