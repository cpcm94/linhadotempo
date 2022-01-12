import { gql } from '@apollo/client'

export const TIME_ENTRY_QUERY = gql`
  query TimeEntry($id: ID!) {
    time_entry(id: $id) {
      id
      name
      description
      year
      month
      day
      end_year
      end_month
      end_day
      is_period
      monthly_importance
      annual_importance
      source_url
      show_period
      book_page
      book_id
      time_entry_categories {
        id
        name
      }
      images {
        id
        image_url
        is_main_image
        name
      }
      timelines {
        id
        name
        color
        initials
      }
      book {
        id
        book_name
        author
        publisher
        publishing_year
        edition
      }
    }
  }
`
