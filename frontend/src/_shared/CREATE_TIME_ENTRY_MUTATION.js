import { gql } from '@apollo/client'

export const CREATE_TIME_ENTRY_MUTATION = gql`
  mutation CreateTimeEntry($input: CreateTimeEntryInput!) {
    createTimeEntry(input: $input) {
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
