import React from 'react'
import SequencePage from './SequencePage'

export default {
  title: 'capstone/test',
  component: SequencePage,
}

const Template = (args) => <SequencePage {...args} />

export const Test = Template.bind({})
Test.args = {
  title: 'test',
}
