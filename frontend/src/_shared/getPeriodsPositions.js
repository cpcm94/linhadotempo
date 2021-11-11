import { filterRelevantPeriods } from './filterRelevantPeriods'
import { filterRelevantPeriodsForTheDay } from './filterRelevantPeriodsForTheDay'
import { filterRelevantPeriodsForTheMonth } from './filterRelevantPeriodsForTheMonth'

const getHighestNumber = (array) =>
  array.reduce((previous, current) => {
    if (previous > current) {
      return previous
    } else {
      return current
    }
  })

const findNewPositions = (array, item, index) => {
  if (
    array.indexOf(item.position) !== index &&
    array.indexOf(item.position + 1) !== -1
  )
    return { ...item, position: getHighestNumber(array) + 1 }
  else if (array.indexOf(item.position) !== index)
    return { ...item, position: item.position + 1 }
  else if (item.position < array[array.indexOf(item.position) - 1])
    return { ...item, position: getHighestNumber(array) + 1 }
  else return item
}

const filterPositionById = (id, array) =>
  array
    .map((subArray) => subArray.filter((entry) => entry.id === id))
    .filter((subArray) => subArray.length)[0][0].position

export const getPeriodsPositions = (periods) => {
  const periodsWithInitialPositions = periods.map((subArray) => {
    if (!subArray[0].month) {
      const relevantPeriods = filterRelevantPeriods(periods, subArray[0].year)
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = relevantPeriods.findIndex(
        (subArray) => subArray[0].id === newPeriodStart.id
      )
      return [newPeriodStart, subArray[1]]
    } else if (!subArray[0].day) {
      const relevantPeriods = filterRelevantPeriodsForTheMonth(
        periods,
        subArray[0].year,
        subArray[0].month
      )
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = relevantPeriods.findIndex(
        (subArray) => subArray[0].id === newPeriodStart.id
      )
      return [newPeriodStart, subArray[1]]
    } else if (subArray[0].day) {
      const relevantPeriods = filterRelevantPeriodsForTheDay(
        periods,
        subArray[0].year,
        subArray[0].month,
        subArray[0].day
      )
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = relevantPeriods.findIndex(
        (subArray) => subArray[0].id === newPeriodStart.id
      )
      return [newPeriodStart, subArray[1]]
    }
  })
  const arrayWithIdsAndPositions = periodsWithInitialPositions
    .map((subArray) => {
      if (!subArray[0].month) {
        const relevantPeriods = filterRelevantPeriods(
          periodsWithInitialPositions,
          subArray[0].year
        )
        return relevantPeriods.map((subArray) => {
          return { id: subArray[0].id, position: subArray[0].position }
        })
      } else if (!subArray[0].day) {
        const relevantPeriods = filterRelevantPeriodsForTheMonth(
          periodsWithInitialPositions,
          subArray[0].year,
          subArray[0].month
        )
        return relevantPeriods.map((subArray) => {
          return { id: subArray[0].id, position: subArray[0].position }
        })
      } else if (subArray[0].day) {
        const relevantPeriods = filterRelevantPeriodsForTheDay(
          periodsWithInitialPositions,
          subArray[0].year,
          subArray[0].month,
          subArray[0].day
        )
        return relevantPeriods.map((subArray) => {
          return { id: subArray[0].id, position: subArray[0].position }
        })
      }
    })
    .map((subArray) => {
      const arrayOfPositions = subArray.map((objects) => objects.position)
      console.log('arrayOfPositions', arrayOfPositions)
      return subArray.map((objectsWithIdAndPosition, index) =>
        findNewPositions(arrayOfPositions, objectsWithIdAndPosition, index)
      )
    })

  const periodsWithFinalPositions = periodsWithInitialPositions.map(
    (subArray) =>
      subArray.map((entry) => {
        return {
          ...entry,
          position: filterPositionById(entry.id, arrayWithIdsAndPositions),
        }
      })
  )
  return periodsWithFinalPositions
}
