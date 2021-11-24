import { gql } from '@apollo/client'

export const TIMELINES_QUERY = gql`
  query {
    timelines {
      id
      name
      initials
      color
      timelineIconImageUrl
      time_entry_id
      origin_time_entry {
        id
        name
        year
        month
        day
      }
      timeline_categories {
        id
        name
      }
    }
  }
`
