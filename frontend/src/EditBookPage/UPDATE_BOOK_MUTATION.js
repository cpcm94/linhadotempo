import { gql } from '@apollo/client'

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    book(id: $id, input: $input) {
      book_name
      publisher
      publishing_date
      edition
      author
    }
  }
`
