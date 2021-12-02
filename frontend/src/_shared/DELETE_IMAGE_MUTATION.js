import { gql } from '@apollo/client'

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImage($id: ID!) {
    deleteImage(id: $id) {
      success
      message
    }
  }
`
