import React from 'react'

import { SelectTimelinesList } from './SelectTimelinesList'

export default {
  title: 'SelectTimelinesList',
  component: SelectTimelinesList,
}

const Template = (args) => <SelectTimelinesList {...args} />

export const Primary = Template.bind({})
Primary.args = {
  timelines: [
    {
      id: 1,
      name: 'Brasil',
    },
    {
      id: 2,
      name: 'Peru',
    },
    {
      id: 3,
      name: 'Equador',
    },
    {
      id: 4,
      name: 'Uruguai',
    },
    {
      id: 5,
      name: 'Chile',
    },
  ],
  listedTimelines: [3, 5],
}
