import { gql } from '@apollo/client'

export const TIMELINE_CATEGORIES_QUERY = gql`
  query {
    timeline_categories {
      id
      name
      color
    }
  }
`
