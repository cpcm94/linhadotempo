import { gql } from '@apollo/client'

export const CREATE_TIMELINE_MUTATION = gql`
  mutation CreateTimeline($input: CreateTimelineInput!) {
    createTimeline(input: $input) {
      id
      name
      color
      initials
      user_id
    }
  }
`
