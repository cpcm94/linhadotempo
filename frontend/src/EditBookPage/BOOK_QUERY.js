import { gql } from '@apollo/client'

export const BOOK_QUERY = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      book_name
      publisher
      publishing_year
      edition
      author
      time_entries {
        id
      }
    }
  }
`
