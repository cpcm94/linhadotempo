import { gql } from '@apollo/client'

export const UNSET_MAIN_IMAGE_MUTATION = gql`
  mutation UnsetMainImage($id: ID!) {
    unsetMainImage(id: $id) {
      id
      is_main_image
    }
  }
`
