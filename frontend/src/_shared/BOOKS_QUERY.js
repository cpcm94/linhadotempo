import { gql } from '@apollo/client'

export const BOOKS_QUERY = gql`
  query {
    books {
      id
      book_name
      publisher
      publishing_date
      author
    }
  }
`
