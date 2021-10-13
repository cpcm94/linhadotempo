export const splitArrayIntoSubarrays = (arrayToSplit, splitSize) =>
  arrayToSplit.reduce((result, item, index) => {
    const viewIndex = Math.floor(index / splitSize)

    if (!result[viewIndex]) {
      result[viewIndex] = []
    }

    result[viewIndex].push(item)

    return result
  }, [])
