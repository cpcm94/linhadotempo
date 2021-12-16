import { monthNameArray } from '../../../../_shared/monthNameArray'

export const convertDateObjectToString = (dateObject) => {
  if (dateObject)
    if (dateObject.day) {
      return `${dateObject.day}/${monthNameArray[dateObject.month]}/${
        dateObject.year
      }`
    } else if (dateObject.month && !dateObject.day) {
      return `dia/${monthNameArray[dateObject.month]}/${dateObject.year}`
    } else if (!dateObject.month && !dateObject.day) {
      return `dia/mês/${dateObject.year ? dateObject.year : 'ano'}`
    }
}
