import React from 'react'
import TimecodeInput from '../TimecodeInput'

export default {
  title: 'capstone/TimecodeTracker',
  component: TimecodeInput,
}

const Template = (args) => <TimecodeInput {...args} />

export const Input = Template.bind({})
Input.args = {
  title: 'Halbzeit 1',
}
