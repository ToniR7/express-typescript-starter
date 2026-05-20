import { getIPv4Addresses } from '#/utils/network.ts'

describe('getIPv4Addresses', () => {
  it('should return an array of IPv4 addresses', () => {
    const ipv4Addresses = getIPv4Addresses()
    expect(Array.isArray(ipv4Addresses)).toBe(true)
    ipv4Addresses.forEach((address) => {
      expect(typeof address).toBe('string')
    })
  })
})
