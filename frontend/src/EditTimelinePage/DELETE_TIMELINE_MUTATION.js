import { gql } from '@apollo/client'

export const DELETE_TIMELINE_MUTATION = gql`
  mutation DeleteTimeline($id: ID!) {
    deleteTimeline(id: $id) {
      success
      message
    }
  }
`
