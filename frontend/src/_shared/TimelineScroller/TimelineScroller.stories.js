import React from 'react'

import { TimelineScroller } from './TimelineScroller'

export default {
  title: 'TimelineScroller',
  component: TimelineScroller,
}

const Template = (args) => <TimelineScroller {...args} />

export const Primary = Template.bind({})
Primary.args = {
  timelines: [
    {
      id: '1',
      name: 'Europa',
      time_entries: [
        {
          name: 'Inicio da Primeira Guerra Mundial',
          entry_date: '1914-07-28',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Término da Primeira Guerra Mundial',
          entry_date: '1918-11-11',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Inicio da Segunda Guerra Mundial',
          entry_date: '1939-09-01',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Término da Primeira Guerra Mundial',
          entry_date: '1945-09-02',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Fundação da União Europeia',
          entry_date: '1993-11-01',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
      ],
    },
    {
      id: '2',
      name: 'Brasil',
      time_entries: [
        {
          name: 'Independência do Brasil',
          entry_date: '1822-09-07',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Abolição do trabalho escravo',
          entry_date: '1888-05-13',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Morte de Getúlio Vargas',
          entry_date: '1954-08-24',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Fundação de Brasília',
          entry_date: '1960-04-21',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste',
          entry_date: '1960-01-01',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste 2',
          entry_date: '1960-05-01',
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
      ],
    },
  ],
}
