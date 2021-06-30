import React from 'react'

import { TimelineForm } from './TimelineForm'

export default {
  title: 'TimelineForm',
  component: TimelineForm,
}

const Template = (args) => <TimelineForm {...args} />

export const Primary = Template.bind({})
Primary.args = {
  user: {
    id: '1',
    timelines: [
      {
        id: '1',
        name: 'Brasil',
      },
      {
        id: '2',
        name: 'Europa',
      },
      {
        id: '3',
        name: 'Austrália',
      },
      {
        id: '4',
        name: 'Igreja Católica',
      },
      {
        id: '5',
        name: 'Oriente Médio',
      },
      {
        id: '6',
        name: 'Ciência',
      },
      {
        id: '7',
        name: 'Erupções Vulcanicas',
      },
    ],
  },
}
