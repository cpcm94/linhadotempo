import { gql } from '@apollo/client'

export const TIME_ENTRIES_QUERY = gql`
  query TimeEntries($timeline_ids: [ID]) {
    time_entries(timeline_ids: $timeline_ids) {
      id
      name
      description
      year
      month
      day
      timelines {
        id
        color
        initials
      }
    }
  }
`
