import { gql } from '@apollo/client'

export const TIMELINE_WITH_ENTRIES_QUERY = gql`
  query Timeline($id: ID!) {
    timeline(id: $id) {
      id
      name
      time_entries {
        id
        name
        year
        month
        day
        annual_importance
        monthly_importance
        timeline_id
      }
    }
  }
`
