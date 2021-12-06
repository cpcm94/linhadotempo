import { gql } from '@apollo/client'

export const TIME_ENTRY_CATEGORY_QUERY = gql`
  query TimeEntryCategory($id: ID!) {
    time_entry_category(id: $id) {
      id
      name
      time_entries {
        id
        name
      }
    }
  }
`
