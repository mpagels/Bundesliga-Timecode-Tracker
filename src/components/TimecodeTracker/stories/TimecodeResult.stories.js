import React from 'react'
import TimecodeResult from '../TimecodeResult'

export default {
  title: 'capstone/TimecodeTracker',
  component: TimecodeResult,
}

const Template = (args) => <TimecodeResult {...args} />

export const ResultWith = Template.bind({})
ResultWith.args = {
  text: 'Länge Spiel',
  result: '00:06:28:15',
}
export const ResultWithout = Template.bind({})
ResultWithout.args = {
  text: 'Länge Spiel',
  result: '00:00:00:00',
}
