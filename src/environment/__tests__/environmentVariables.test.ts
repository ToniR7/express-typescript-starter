describe('Environment Variables', () => {
  const originalExit = process.exit
  const originalConsoleError = console.error

  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    console.error = vi.fn()
    process.exit = vi.fn() as never
  })

  afterEach(() => {
    console.error = originalConsoleError
    process.exit = originalExit
  })

  it('should exit with error when environment validation fails', async () => {
    vi.stubEnv('PORT', '70000')

    await import('#/environment/environmentVariables.ts')

    expect(console.error).toHaveBeenCalled()
    expect(process.exit).toHaveBeenCalledWith(1)
    expect(vi.mocked(console.error).mock.calls[0]).toEqual([
      'Invalid environment variables:\n',
      {
        PORT: ['Port should be >= 0 and < 65536'],
      },
    ])
  })

  it('should exit with error when required environment variables are missing', async () => {
    vi.stubEnv('TENANT_ID', undefined)

    await import('#/environment/environmentVariables.ts')

    expect(console.error).toHaveBeenCalled()
    expect(process.exit).toHaveBeenCalledWith(1)
    expect(vi.mocked(console.error).mock.calls[0]).toEqual([
      'Invalid environment variables:\n',
      {
        TENANT_ID: ['Invalid input: expected string, received undefined'],
      },
    ])
  })

  it('should not exit with error when all environment variables are valid', async () => {
    process.env.NODE_ENV = 'production'

    const { envVariables } = await import('#/environment/environmentVariables.ts')

    expect(console.error).not.toHaveBeenCalled()
    expect(process.exit).not.toHaveBeenCalled()
    expect(envVariables).toEqual({
      NODE_ENV: 'production',
      AZURE_TOKEN_CREDENTIALS: 'AzureCliCredential',
      LOG_LEVEL: 'crit',
      PORT: 5010,
      TENANT_ID: 'TENANT_ID',
      CLIENT_ENTERPRISE_APPLICATION_ID: 'CLIENT_ENTERPRISE_APPLICATION_ID',
      SERVER_ENTERPRISE_APPLICATION_ID: 'SERVER_ENTERPRISE_APPLICATION_ID',
      KEY_VAULT_NAME: 'KEY_VAULT_NAME',
      KEY_VAULT_CLIENT_ID: 'KEY_VAULT_CLIENT_ID',
    })
  })
})
