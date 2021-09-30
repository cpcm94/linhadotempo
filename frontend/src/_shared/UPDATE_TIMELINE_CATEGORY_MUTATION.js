import { gql } from '@apollo/client'

export const UPDATE_TIMELINE_CATEGORY_MUTATION = gql`
  mutation UpdateTimelineCategory(
    $id: ID!
    $input: UpdateTimelineCategoryInput!
  ) {
    updateTimelineCategory(id: $id, input: $input) {
      id
      name
    }
  }
`
