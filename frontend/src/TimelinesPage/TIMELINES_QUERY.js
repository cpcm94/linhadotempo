import { gql } from '@apollo/client'

export const TIMELINES_QUERY = gql`
  query {
    timelines {
      data {
        id
        name
      }
    }
  }
`
