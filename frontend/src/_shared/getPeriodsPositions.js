import { filterRelevantPeriods } from './filterRelevantPeriods'
import { filterRelevantPeriodsForTheDay } from './filterRelevantPeriodsForTheDay'
import { filterRelevantPeriodsForTheMonth } from './filterRelevantPeriodsForTheMonth'

const getInitialPosition = (array, newPeriodStart) =>
  array.findIndex((subArray) => subArray[0].id === newPeriodStart.id)

const findNewPositions = (array, item, index) => {
  if (array.indexOf(item.position) !== index) {
    return { ...item, position: array[index - 1] + 1 }
  } else if (item.position < array[index - 1]) {
    return { ...item, position: array[index - 1] + 1 }
  } else {
    return item
  }
}

const updatePositions = (array) =>
  array.map((subArray) => {
    const arrayOfPositions = subArray.map((objects) => objects.position)
    return subArray.map((objectsWithIdAndPosition, index) =>
      findNewPositions(arrayOfPositions, objectsWithIdAndPosition, index)
    )
  })

const filterPositionById = (id, array) =>
  array
    .map((subArray) => subArray.filter((entry) => entry.id === id))
    .filter((subArray) => subArray.length)[0][0].position

const getIdAndPositions = (array) =>
  array.map((subArray) => {
    return { id: subArray[0].id, position: subArray[0].position }
  })

const getIdsAndPositions = (array) =>
  array.map((subArray) => {
    const periodStartDay = subArray[0].day
    const periodStartMonth = subArray[0].month
    const periodStartYear = subArray[0].year

    if (!periodStartMonth) {
      const relevantPeriods = filterRelevantPeriods(array, periodStartYear)
      return getIdAndPositions(relevantPeriods)
    } else if (!periodStartDay) {
      const relevantPeriods = filterRelevantPeriodsForTheMonth(
        array,
        periodStartYear,
        periodStartMonth
      )
      return getIdAndPositions(relevantPeriods)
    } else if (periodStartDay) {
      const relevantPeriods = filterRelevantPeriodsForTheDay(
        array,
        periodStartYear,
        periodStartMonth,
        periodStartDay
      )
      return getIdAndPositions(relevantPeriods)
    }
  })

const substitutePeriodsInitialPositionsWithFinal = (
  periodsWithInitialPositions,
  arrayWithSubarraysOfIdsAndUpdatedInitialPositions
) =>
  periodsWithInitialPositions.map((subArray) =>
    subArray.map((entry) => {
      return {
        ...entry,
        position: filterPositionById(
          entry.id,
          arrayWithSubarraysOfIdsAndUpdatedInitialPositions
        ),
      }
    })
  )

export const getPeriodsPositions = (periods) => {
  const periodsWithInitialPositions = periods.map((subArray) => {
    const periodStartDay = subArray[0].day
    const periodStartMonth = subArray[0].month
    const periodStartYear = subArray[0].year

    if (!periodStartMonth) {
      const relevantPeriods = filterRelevantPeriods(periods, periodStartYear)
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = getInitialPosition(
        relevantPeriods,
        newPeriodStart
      )
      return [newPeriodStart, subArray[1]]
    } else if (!periodStartDay) {
      const relevantPeriods = filterRelevantPeriodsForTheMonth(
        periods,
        periodStartYear,
        periodStartMonth
      )
      const newPeriodStart = { ...subArray[0] }

      newPeriodStart.position = getInitialPosition(
        relevantPeriods,
        newPeriodStart
      )
      return [newPeriodStart, subArray[1]]
    } else if (periodStartDay) {
      const relevantPeriods = filterRelevantPeriodsForTheDay(
        periods,
        periodStartYear,
        periodStartMonth,
        periodStartDay
      )
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = getInitialPosition(
        relevantPeriods,
        newPeriodStart
      )
      return [newPeriodStart, subArray[1]]
    }
  })
  const arrayWithSubarraysOfIdsAndPositions = getIdsAndPositions(
    periodsWithInitialPositions
  )

  const arrayWithSubarraysOfIdsAndUpdatedPositions = updatePositions(
    arrayWithSubarraysOfIdsAndPositions
  )

  const periodsWithFinalPositions = substitutePeriodsInitialPositionsWithFinal(
    periodsWithInitialPositions,
    arrayWithSubarraysOfIdsAndUpdatedPositions
  )

  return periodsWithFinalPositions
}
