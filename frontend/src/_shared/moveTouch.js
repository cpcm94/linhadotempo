export const moveTouch = (e, callback, initialX) => {
  if (!initialX) {
    return
  }
  const currentX = e.touches[0].clientX
  const diffX = initialX - currentX

  if (diffX < -120) {
    callback()
  }
  e.preventDefault()
}
