import os from 'node:os'

export const getIPv4Addresses = (): Array<string> => {
  const interfaces = os.networkInterfaces()

  return Object.values(interfaces)
    .flat()
    .filter((net) => net?.family === 'IPv4')
    .map(({ address }) => address)
}
