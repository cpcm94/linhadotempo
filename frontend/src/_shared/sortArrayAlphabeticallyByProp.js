export const sortArrayAlphabeticallyByProp = (propName, array) => {
  return [...array].sort((a, b) => a[propName].localeCompare(b[propName]))
}
