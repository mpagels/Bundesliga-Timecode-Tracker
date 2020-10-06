import React from 'react'
import TimeCodeBubble from './TimeCodeBubble'

export default {
  title: 'capstone/TimeCodeBubble',
  component: TimeCodeBubble,
}

const Template = (args) => <TimeCodeBubble {...args} />

export const TargetNotSet = Template.bind({})
TargetNotSet.args = {
  title: 'VORGABE',
  timeCode: '00:00',
}
export const TargetSet = Template.bind({})
TargetSet.args = {
  title: 'VORGABE',
  timeCode: '10:00',
  isMinOnly: true,
}
export const TimecodeNull = Template.bind({})
TimecodeNull.args = {
  title: 'GESAMTLÄNGE',
  timeCode: '00:00:00:00',
}
export const Timecode = Template.bind({})
Timecode.args = {
  title: 'GESAMTLÄNGE',
  timeCode: '00:06:14:17',
}
