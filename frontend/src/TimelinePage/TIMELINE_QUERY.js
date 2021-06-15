import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query ($id: ID!) {
    timeline(id: $id) {
      id
      name
      historical_events {
        name
        event_date
        annual_importance
        monthly_importance
      }
    }
  }
`
