import { gql } from '@apollo/client'

export const CREATE_TIMELINE_CATEGORY_MUTATION = gql`
  mutation CreateTimelineCategory(
    $id: ID
    $input: CreateTimelineCategoryInput!
  ) {
    createTimelineCategory(id: $id, input: $input) {
      id
      name
    }
  }
`
