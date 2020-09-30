import React from 'react'
import EventCard from './EventCard'

export default {
  title: 'capstone/EventCard',
  component: EventCard,
}

const Template = (args) => <EventCard {...args} />

export const Normal = Template.bind({})
Normal.args = {
  tag: 'tor',
  playerName: 'Lewandowski',
  lowerThirdIn: '00:00:17:23',
  lowerThirdOut: '00:00:23:12',
}
