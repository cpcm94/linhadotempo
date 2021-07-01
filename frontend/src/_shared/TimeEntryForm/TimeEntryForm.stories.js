import React from 'react'

import { TimeEntryForm } from './TimeEntryForm'

export default {
  title: 'TimeEntryForm',
  component: TimeEntryForm,
}

const Template = (args) => <TimeEntryForm {...args} />

export const Primary = Template.bind({})
Primary.args = {
  timeEntryName: 'acontecimento teste',
  timeEntryYear: 1994,
  annual_importance: false,
  monthly_importance: false,
  loading: false,
}
