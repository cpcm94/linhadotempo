import qs from 'query-string'

export const urlQueryTimelineIds = () =>
  qs.parse(location.search).timelines.split(',')
