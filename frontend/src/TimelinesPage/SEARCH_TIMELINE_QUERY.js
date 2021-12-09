import { gql } from '@apollo/client'

export const SEARCH_TIMELINE_QUERY = gql`
  query SearchTimeline($input: SearchTimelineInput!) {
    search_timeline(input: $input) {
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
