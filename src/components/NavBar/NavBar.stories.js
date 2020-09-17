import React from 'react'
import NavBar from './NavBar'

export default {
  title: 'capstone/NavBar',
  component: NavBar,
}

const Template = (args) => <NavBar {...args} />

export const Normal = Template.bind({})
Normal.args = {
  firstHalfTimeCode: '00:00:00',
  secondHalfTimeCode: '00:00:00',
  interviewTimeCode: '00:00:00',
  countSpecials: '0',
}
