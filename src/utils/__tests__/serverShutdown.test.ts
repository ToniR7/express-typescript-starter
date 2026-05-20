import type { Server } from 'node:http'

import { logger } from '@/logger'
import { shutdown } from '@/utils/serverShutdown'

vi.mock('@/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}))

const mockClose = vi.fn()
const mockServer = {
  close: mockClose,
} as unknown as Server

describe('shutdown', () => {
  const originalExit = process.exit

  beforeEach(() => {
    vi.clearAllMocks()
    process.exit = vi.fn() as never
  })

  afterEach(() => {
    process.exit = originalExit
  })

  it('should close the server and exit with code 0 on success', async () => {
    mockClose.mockImplementation((callback) => callback())

    await shutdown(mockServer)

    expect(logger.info).toHaveBeenCalledWith('Shutdown signal received')
    expect(mockClose).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('HTTP server closed')
    expect(process.exit).toHaveBeenCalledWith(0)
  })

  it('should log an error and exit with code 1 on failure', async () => {
    const error = new Error('Shutdown failed')
    mockClose.mockImplementation(() => {
      throw error
    })

    await shutdown(mockServer)

    expect(logger.info).toHaveBeenCalledWith('Shutdown signal received')
    expect(mockClose).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith('Error during shutdown:', error)
    expect(process.exit).toHaveBeenCalledWith(1)
  })
})
