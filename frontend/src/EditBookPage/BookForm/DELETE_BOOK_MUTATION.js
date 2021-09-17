import { gql } from '@apollo/client'

export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      success
      message
    }
  }
`
