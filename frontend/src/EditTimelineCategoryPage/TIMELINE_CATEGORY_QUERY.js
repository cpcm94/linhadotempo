import { gql } from '@apollo/client'

export const TIMELINE_CATEGORY_QUERY = gql`
  query TimelineCategory($id: ID!) {
    timeline_category(id: $id) {
      id
      name
      color
      timelines {
        id
        name
      }
    }
  }
`
