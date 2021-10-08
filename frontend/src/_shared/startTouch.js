export const startTouch = (e, setInitialX) => {
  setInitialX(e.touches[0].clientX)
}
