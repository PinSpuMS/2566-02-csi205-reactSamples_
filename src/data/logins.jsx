const logins = [{ user: 'user', pass: 'pass', token: 'token', roll: 'manager' }]

export const apiPostTokenLogin = (url, data) => {
  const resultLogin = logins.find(
    (lg) => lg.user === data.user && lg.pass === data.pass
  )
  if (resultLogin === undefined) return ''
  else return resultLogin.token
}
