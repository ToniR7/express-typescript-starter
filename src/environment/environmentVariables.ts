import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']).default('development'),
  AZURE_TOKEN_CREDENTIALS: z.enum(['AzureCliCredential', 'WorkloadIdentityCredential']),
  LOG_LEVEL: z.enum(['crit', 'error', 'warn', 'info', 'debug']).default('info'),
  PORT: z.coerce.number().positive().max(65536, 'Port should be >= 0 and < 65536').default(5010),
  TENANT_ID: z.string().trim().min(1),
  CLIENT_ENTERPRISE_APPLICATION_ID: z.string().trim().min(1),
  SERVER_ENTERPRISE_APPLICATION_ID: z.string().trim().min(1),
  KEY_VAULT_NAME: z.string().trim().min(1),
  KEY_VAULT_CLIENT_ID: z.string().trim().min(1),
})

const { success, error, data } = envSchema.safeParse(process.env)
if (!success) {
  const { fieldErrors } = z.flattenError(error)
  console.error('Invalid environment variables:\n', fieldErrors)
  process.exit(1)
}

export const envVariables = data
