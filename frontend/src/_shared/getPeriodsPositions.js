import { filterRelevantPeriods } from './filterRelevantPeriods'
import { filterRelevantPeriodsForTheDay } from './filterRelevantPeriodsForTheDay'
import { filterRelevantPeriodsForTheMonth } from './filterRelevantPeriodsForTheMonth'

const getInitialPosition = (array, newPeriodStart) =>
  array.findIndex((subArray) => subArray[0].id === newPeriodStart.id)

const findNewPositions = (array, item, index) => {
  return { ...item, position: array[0] + index }
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
    if (!subArray[0].month) {
      const relevantPeriods = filterRelevantPeriods(array, subArray[0].year)
      return getIdAndPositions(relevantPeriods)
    } else if (!subArray[0].day) {
      const relevantPeriods = filterRelevantPeriodsForTheMonth(
        array,
        subArray[0].year,
        subArray[0].month
      )
      return getIdAndPositions(relevantPeriods)
    } else if (subArray[0].day) {
      const relevantPeriods = filterRelevantPeriodsForTheDay(
        array,
        subArray[0].year,
        subArray[0].month,
        subArray[0].day
      )
      return getIdAndPositions(relevantPeriods)
    }
  })

const createArrayWithIntermediatePositions = (array, resultArray) => {
  array.map((subArray) =>
    subArray.map((objectsWithIdAndPosition) => {
      if (
        !resultArray.filter(
          (objectsWithIdAndFinalPosition) =>
            objectsWithIdAndPosition.id === objectsWithIdAndFinalPosition.id
        )[0]
      ) {
        resultArray.push(objectsWithIdAndPosition)
      }
    })
  )
  return resultArray
}
const substituteInitialPositionsWithIntermediate = (
  initialPositionsArray,
  intermediatePositionsArray
) =>
  initialPositionsArray.map((subArray) =>
    subArray.map((objectsWithIdAndPosition) => {
      if (
        intermediatePositionsArray
          .map((objectsWithIdAndPosition) => objectsWithIdAndPosition.id)
          .includes(objectsWithIdAndPosition.id)
      ) {
        return intermediatePositionsArray.filter(
          (objectsWithIdAndFinalPosition) =>
            objectsWithIdAndFinalPosition.id === objectsWithIdAndPosition.id
        )[0]
      }
    })
  )

const substitutePeriodsInitialPositionsWithFinal = (
  periodsWithInitialPositions,
  arrayWithSubarraysOfIdsAndFinalPositions
) =>
  periodsWithInitialPositions.map((subArray) =>
    subArray.map((entry) => {
      return {
        ...entry,
        position: filterPositionById(
          entry.id,
          arrayWithSubarraysOfIdsAndFinalPositions
        ),
      }
    })
  )

export const getPeriodsPositions = (periods) => {
  const periodsWithInitialPositions = periods.map((subArray) => {
    if (!subArray[0].month) {
      const relevantPeriods = filterRelevantPeriods(periods, subArray[0].year)
      const newPeriodStart = { ...subArray[0] }
      newPeriodStart.position = getInitialPosition(
        relevantPeriods,
        newPeriodStart
      )
      return [newPeriodStart, subArray[1]]
    } else if (!subArray[0].day) {
      const relevantPeriods = filterRelevantPeriodsForTheMonth(
        periods,
        subArray[0].year,
        subArray[0].month
      )
      const newPeriodStart = { ...subArray[0] }

      newPeriodStart.position = getInitialPosition(
        relevantPeriods,
        newPeriodStart
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

  const arrayWithSubarraysOfIdsAndUpdatedInitialPositions = updatePositions(
    arrayWithSubarraysOfIdsAndPositions
  )

  const arrayWithIdsAndIntermediatePositions =
    createArrayWithIntermediatePositions(
      arrayWithSubarraysOfIdsAndUpdatedInitialPositions,
      []
    )
  const arrayWithSubarraysOfIdsAndIntermediatePositions =
    substituteInitialPositionsWithIntermediate(
      arrayWithSubarraysOfIdsAndUpdatedInitialPositions,
      arrayWithIdsAndIntermediatePositions
    )
  const arrayWithSubarraysOfIdsAndFinalPositions = updatePositions(
    arrayWithSubarraysOfIdsAndIntermediatePositions
  )

  const periodsWithFinalPositions = substitutePeriodsInitialPositionsWithFinal(
    periodsWithInitialPositions,
    arrayWithSubarraysOfIdsAndFinalPositions
  )
  return periodsWithFinalPositions
}
