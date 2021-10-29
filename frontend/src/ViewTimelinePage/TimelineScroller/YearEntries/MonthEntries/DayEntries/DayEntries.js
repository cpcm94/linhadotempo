import React from 'react'
import { DayEntriesWrapper } from './DayEntries.styles'
import { Entries } from './Entries/Entries'
import PropTypes from 'prop-types'

export const DayEntries = ({
  timeEntriesByDay,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const filterRelevantPeriods = (periods, year, month, day) => {
    return periods.filter((subArray) => {
      const periodStartYear = subArray[0].year
      const periodEndYear = subArray[1].year
      const periodStartMonth = subArray[0].month
      const periodEndMonth = subArray[1].month
      const periodStartDay = subArray[0].day
      const periodEndDay = subArray[1].day

      if (year > periodStartYear && year < periodEndYear) {
        return subArray
      } else if (
        year === periodStartYear &&
        month === periodStartMonth &&
        day === periodStartDay
      ) {
        return subArray
      } else if (year > periodStartYear && !periodEndYear) {
        return subArray
      } else if (year === periodStartYear && !periodEndYear) {
        if (month > periodStartMonth) {
          return subArray
        } else if (month === periodStartMonth) {
          if (!periodStartDay) {
            return
          } else if (day >= periodStartDay) {
            return subArray
          }
        }
      } else if (year > periodStartYear && year === periodEndYear) {
        if (month < periodEndMonth) {
          return subArray
        } else if (month === periodEndMonth) {
          if (day <= periodEndDay || !periodEndDay) {
            return subArray
          }
        }
      } else if (year === periodStartYear && year < periodEndYear) {
        if (month > periodStartMonth) {
          return subArray
        } else if (month === periodStartMonth) {
          if (!periodStartDay) {
            return
          } else if (day >= periodStartDay) {
            return subArray
          }
        }
      } else if (year === periodStartYear && year === periodEndYear) {
        if (month > periodStartMonth && month < periodEndMonth) {
          return subArray
        } else if (month > periodStartMonth && month === periodEndMonth) {
          if (day <= periodEndDay || !periodEndDay) {
            return subArray
          }
        } else if (month === periodStartMonth && month < periodEndMonth) {
          if (!periodStartDay) {
            return
          } else if (day >= periodStartDay) {
            return subArray
          }
        } else if (month === periodStartMonth && month === periodStartMonth) {
          if (!periodStartDay) {
            return
          } else if (day >= periodStartDay && day <= periodEndDay) {
            return subArray
          } else if (day >= periodStartDay && !periodEndDay) {
            return subArray
          }
        }
      }
    })
  }
  return (
    <DayEntriesWrapper>
      {timeEntriesByDay[0]
        ? timeEntriesByDay.map((entries, index) => (
            <Entries
              entries={entries}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
              periods={filterRelevantPeriods(
                periods,
                entries[0].year,
                entries[0].month,
                entries[0].day
              )}
            />
          ))
        : null}
    </DayEntriesWrapper>
  )
}

DayEntries.propTypes = {
  timeEntriesByDay: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
