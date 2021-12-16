import { monthNameArray } from '../../../../_shared/monthNameArray'

export const textToDate = (text) => {
  const arrayOfSplitText = text.split(' ')
  const arrayOfMonths = monthNameArray.map((month) => month.toLowerCase())
  const getMonthNumber = (monthName) =>
    arrayOfMonths.indexOf(monthName.toLowerCase())

  const countOccurencesOfItem = (array, item) =>
    array.reduce((n, value) => {
      return n + (value === item)
    }, 0)

  if (countOccurencesOfItem(arrayOfSplitText, 'de') === 2) {
    return {
      year: arrayOfSplitText[4],
      month: getMonthNumber(arrayOfSplitText[2]),
      day: arrayOfSplitText[0],
    }
  } else if (countOccurencesOfItem(arrayOfSplitText, 'de') === 1) {
    return {
      year: arrayOfSplitText[2],
      month: getMonthNumber(arrayOfSplitText[0]),
      day: null,
    }
  } else if (countOccurencesOfItem(arrayOfSplitText, 'de') === 0) {
    return {
      year: !parseInt(arrayOfSplitText[0]) ? null : arrayOfSplitText[0],
      month: null,
      day: null,
    }
  }
}
