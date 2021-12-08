import { gql } from '@apollo/client'

export const TIME_ENTRY_CATEGORIES_QUERY = gql`
  query {
    time_entry_categories {
      id
      name
    }
  }
`
