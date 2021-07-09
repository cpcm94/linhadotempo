export const convertFormData = (entryPropName, eventTargetValue) => {
  if (entryPropName === 'year') {
    return parseInt(eventTargetValue)
  } else {
    return eventTargetValue
  }
}
