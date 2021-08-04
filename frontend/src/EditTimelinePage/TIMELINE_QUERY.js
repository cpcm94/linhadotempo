import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query Timeline($id: ID!) {
    timeline(id: $id) {
      id
      name
      color
      initials
    }
  }
`
