import { gql } from '@apollo/client'

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      book_name
      publisher
      publishing_year
      edition
      author
    }
  }
`
