import { gql } from '@apollo/client'

export const SEARCH_ENTRY_QUERY = gql`
  query SearchTimeEntry($input: SearchTimeEntryInput!) {
    search_time_entry(input: $input) {
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
      images {
        image_url
        is_main_image
      }
      time_entry_categories {
        id
        name
        color
      }
      annual_importance
      timelines {
        id
        color
        initials
        timelineIconImageUrl
        origin_time_entry {
          id
          name
          year
          month
          day
        }
      }
    }
  }
`
