import { gql } from '@apollo/client'

export const TIMELINES_QUERY = gql`
  query {
    timelines {
      id
      name
      initials
      color
      timelineIconImageUrl
      timeline_categories {
        id
        category
      }
    }
  }
`
