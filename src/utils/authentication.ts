type userAuthorization = {
  role: 'admin' | 'user'
  division: Array<string>
}

export const obtainRoleAndDivision = (roles: Array<string> = []): userAuthorization => {
  const role = roles.includes('admin') ? 'admin' : 'user'
  const division = roles.filter((r) => r !== 'admin' && r !== 'user')
  return { role, division }
}
