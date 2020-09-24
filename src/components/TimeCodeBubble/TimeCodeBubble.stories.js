import React from 'react'
import TimeCodeBubble from './TimeCodeBubble'

export default {
  title: 'capstone/TimeCodeBubble',
  component: TimeCodeBubble,
}

const Template = (args) => <TimeCodeBubble {...args} />

export const Normal = Template.bind({})
Normal.args = {
  title: 'GESAMTLÄNGE',
  timeCode: '00:00:00',
}
