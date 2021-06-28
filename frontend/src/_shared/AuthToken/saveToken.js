const TOKEN_KEY = 'stampTokens'

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}
