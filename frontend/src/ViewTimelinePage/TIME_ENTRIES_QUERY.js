import { gql } from '@apollo/client'

export const TIME_ENTRIES_QUERY = gql`
  query TimeEntries($timeline_ids: [ID]) {
    time_entries(timeline_ids: $timeline_ids) {
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
      show_period
      period_color
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
