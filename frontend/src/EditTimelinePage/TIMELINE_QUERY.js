import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query Timeline($id: ID!) {
    timeline(id: $id) {
      id
      name
      color
      initials
      time_entries {
        id
        name
        year
        month
        day
      }
    }
  }
`
