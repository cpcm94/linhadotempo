import { gql } from '@apollo/client'

export const CREATE_TIMELINE_MUTATION = gql`
  mutation CreateTimeline($input: CreateTimeLineInput!) {
    createTimeline(input: $input) {
      id
      name
    }
  }
`
