import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query Timeline($id: ID!) {
    timeline(id: $id) {
      id
      name
      color
      initials
      timelineIconImageUrl
      timeline_categories {
        id
        name
      }
      time_entries {
        id
        name
        year
        month
        day
        timelines {
          id
        }
      }
    }
  }
`
