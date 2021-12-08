import { gql } from '@apollo/client'

export const CREATE_TIMELINE_CATEGORY_MUTATION = gql`
  mutation CreateTimelineCategory($input: CreateTimelineCategoryInput!) {
    createTimelineCategory(input: $input) {
      id
      name
      color
    }
  }
`
