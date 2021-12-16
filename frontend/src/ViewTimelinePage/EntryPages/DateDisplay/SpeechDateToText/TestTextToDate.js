const monthNameArray = [
  'buffer',
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
const textToDate = (text) => {
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

const show = (value) => JSON.stringify(value)

const test = (testValue, expectedResult) => {
  const result = textToDate(testValue)
  if (show(result) !== show(expectedResult)) {
    console.error(
      'FAIL: We were expecting ' +
        show(expectedResult) +
        ' but we got ' +
        show(result)
    )
  } else {
    console.log('ok')
  }
}

test('2 de setembro de 2020', { year: '2020', month: 9, day: '2' })
test('novembro de 2010', { year: '2010', month: 11, day: null })
test('2005', { year: '2005', month: null, day: null })
test('o que aconteceria nesse caso', { year: null, month: null, day: null })
test('5 de agosto de 85', { year: '85', month: 8, day: '5' })
test('maio de 1992', { year: '1992', month: 5, day: null })
test('1836', { year: '1836', month: null, day: null })
test('31 de dezembro de 1885', { year: '1885', month: 12, day: '31' })
test('31 de janeiro de 1700', { year: '1700', month: 1, day: '31' })
