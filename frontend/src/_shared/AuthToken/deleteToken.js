const TOKEN_KEY = 'stampTokens'

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
