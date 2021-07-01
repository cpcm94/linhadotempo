import React from 'react'

import { TimelineForm } from './TimelineForm'

export default {
  title: 'TimelineForm',
  component: TimelineForm,
}

const Template = (args) => <TimelineForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
