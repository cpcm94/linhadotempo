import { gql } from '@apollo/client'

export const CREATE_TIME_ENTRY_MUTATION = gql`
  mutation CreateTimeEntry($input: CreateTimeEntryInput!) {
    createTimeEntry(input: $input) {
      id
      name
      year
      month
      day
      monthly_importance
      annual_importance
    }
  }
`
