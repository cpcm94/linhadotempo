import { gql } from '@apollo/client'

export const UPDATE_TIMELINE_MUTATION = gql`
  mutation UpdateTimeline($id: ID!, $input: UpdateTimelineInput!) {
    updateTimeline(id: $id, input: $input) {
      name
    }
  }
`
