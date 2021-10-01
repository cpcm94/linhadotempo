import { gql } from '@apollo/client'

export const DELETE_TIMELINE_CATEGORY_MUTATION = gql`
  mutation DeleteTimelineCategory($id: ID!) {
    deleteTimelineCategory(id: $id) {
      id
      name
    }
  }
`
