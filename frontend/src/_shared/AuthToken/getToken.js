const TOKEN_KEY = 'stampTokens'

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
