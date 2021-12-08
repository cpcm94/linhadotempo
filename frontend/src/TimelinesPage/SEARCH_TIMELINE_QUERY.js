import { gql } from '@apollo/client'

export const SEARCH_TIMELINE_QUERY = gql`
  query SearchTimeline($search: String!) {
    search_timeline(search: $search) {
      id
      name
      color
      initials
      timelineIconImageUrl
      timeline_categories {
        id
        name
        color
      }
    }
  }
`
