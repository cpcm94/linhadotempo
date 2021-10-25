import { gql } from '@apollo/client'

export const UPDATE_TIME_ENTRY_MUTATION = gql`
  mutation UpdateTimeEntry($id: ID!, $input: UpdateTimeEntryInput!) {
    updateTimeEntry(id: $id, input: $input) {
      id
      name
      year
      month
      day
      end_year
      end_month
      end_day
      is_period
      monthly_importance
      annual_importance
      image_url
      source_url
      book_page
      book_id
    }
  }
`
