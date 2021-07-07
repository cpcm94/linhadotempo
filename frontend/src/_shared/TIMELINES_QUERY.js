import { gql } from '@apollo/client'

export const TIMELINES_QUERY = gql`
  query {
    timelines {
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
