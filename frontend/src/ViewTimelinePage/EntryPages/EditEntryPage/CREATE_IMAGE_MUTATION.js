import { gql } from '@apollo/client'

export const CREATE_IMAGE_MUTATION = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
      name
      image_url
      time_entry {
        id
        images {
          id
          image_url
        }
      }
    }
  }
`
