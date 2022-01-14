import { gql } from '@apollo/client'

export const TIMELINE_QUERY = gql`
  query Timeline($id: ID!) {
    timeline(id: $id) {
      id
      name
      color
      initials
      timelineIconImageUrl
      timeline_categories {
        id
        name
      }
      time_entries {
        id
        name
        year
        month
        day
        end_year
        end_month
        end_day
        is_period
        show_period
        period_color
        timelines {
          id
        }
      }
    }
  }
`
