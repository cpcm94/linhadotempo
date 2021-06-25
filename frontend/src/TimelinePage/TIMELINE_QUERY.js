import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query ($id: ID!) {
    timeline(id: $id) {
      id
      name
      time_entries {
        name
        year
        annual_importance
        monthly_importance
      }
    }
  }
`