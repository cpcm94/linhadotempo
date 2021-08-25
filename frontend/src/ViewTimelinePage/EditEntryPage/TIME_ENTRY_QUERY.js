import { gql } from '@apollo/client'

export const TIME_ENTRY_QUERY = gql`
  query TimeEntry($id: ID!) {
    time_entry(id: $id) {
      id
      name
      year
      month
      day
      monthly_importance
      annual_importance
      timelines {
        id
        name
        color
        initials
      }
    }
  }
`
