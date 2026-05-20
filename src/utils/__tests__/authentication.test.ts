import { obtainRoleAndDivision } from '@/utils/authentication'

describe('obtainRoleAndDivision', () => {
  it('should return admin role and all divisions when roles include admin', () => {
    const roles = ['admin', 'division1', 'division2']
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'admin',
      division: ['division1', 'division2'],
    })
  })

  it('should return user role and all divisions when roles include user', () => {
    const roles = ['user', 'division1', 'division2']
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'user',
      division: ['division1', 'division2'],
    })
  })

  it('should return user role and all divisions when roles do not include user and admin', () => {
    const roles = ['division1', 'division2']
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'user',
      division: ['division1', 'division2'],
    })
  })

  it('should return user role and empty division array when no specific divisions are present', () => {
    const roles = ['user']
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'user',
      division: [],
    })
  })

  it('should return user role and empty division array when roles array is empty', () => {
    const roles: Array<string> = []
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'user',
      division: [],
    })
  })

  it('should return user role and empty division array when roles is undefined', () => {
    const roles = undefined
    const result = obtainRoleAndDivision(roles)
    expect(result).toEqual({
      role: 'user',
      division: [],
    })
  })
})
