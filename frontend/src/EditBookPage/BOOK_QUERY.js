import { gql } from '@apollo/client'

export const BOOK_QUERY = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      book_name
      publisher
      publishing_date
      edition
      author
    }
  }
`
