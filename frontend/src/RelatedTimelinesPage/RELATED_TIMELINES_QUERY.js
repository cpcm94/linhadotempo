import { gql } from '@apollo/client'

export const RELATED_TIMELINES_QUERY = gql`
  query RelatedTimelines($id: ID!) {
    relatedTimelines(id: $id) {
      id
      name
      color
      initials
      timelineIconImageUrl
    }
  }
`
