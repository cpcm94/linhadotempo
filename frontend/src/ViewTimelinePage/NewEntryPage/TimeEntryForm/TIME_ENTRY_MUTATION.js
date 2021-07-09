import { gql } from '@apollo/client'

export const TIME_ENTRY_MUTATION = gql`
  mutation CreateTimeEntry($input: CreateTimeEntryInput!) {
    createTimeEntry(input: $input) {
      timeline_id
      name
      year
      month
      day
      monthly_importance
      annual_importance
    }
  }
`
