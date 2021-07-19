export const getScrollPosition = (elementObject) => {
  const refArray = Object.values(elementObject)
  const isBrowser = typeof window !== `undefined`
  const getClientRect = (element) => {
    const elementCoord = element.getBoundingClientRect().y
    const entryId = element && element.id ? element.id : null
    return { elementCoord, entryId }
  }
  const result = refArray.map((ref) =>
    getClientRect(ref?.current || document.body)
  )
  console.log('result', result)
  if (!isBrowser) return { x: 0, y: 0 }
  return result
}
