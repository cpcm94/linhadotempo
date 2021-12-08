import { gql } from '@apollo/client'

export const CREATE_TIME_ENTRY_CATEGORY_MUTATION = gql`
  mutation CreateTimeEntryCategory($input: CreateTimeEntryCategoryInput!) {
    createTimeEntryCategory(input: $input) {
      id
      name
      color
    }
  }
`
