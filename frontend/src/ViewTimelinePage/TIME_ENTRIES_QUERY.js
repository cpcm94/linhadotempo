import { gql } from '@apollo/client'

export const TIME_ENTRIES_QUERY = gql`
  query {
    time_entries(timeline_id: $timeline_ids) {
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
