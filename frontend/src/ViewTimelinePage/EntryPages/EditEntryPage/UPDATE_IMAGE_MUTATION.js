import { gql } from '@apollo/client'

export const UPDATE_IMAGE_MUTATION = gql`
  mutation UpdateImageMutation($id: ID!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
      name
      image_url
    }
  }
`
