import { gql } from '@apollo/client'

export const SET_MAIN_IMAGE_MUTATION = gql`
  mutation SetMainImage($id: ID!) {
    setMainImage(id: $id) {
      id
      is_main_image
    }
  }
`
