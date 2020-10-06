import React from 'react'
import NavBar from './NavBar'

export default {
  title: 'capstone/NavBar',
  component: NavBar,
}

const Template = (args) => <NavBar {...args} />

export const Empty = Template.bind({})
Empty.args = {
  firstHalfTimeCode: ['0000'],
  secondHalfTimeCode: ['0000'],
  interviewTimeCode: ['0000'],
  countSpecials: [],
}
export const Full = Template.bind({})
Full.args = {
  firstHalfTimeCode: [
    { timeCode: '2700', isActive: true },
    { timeCode: '2700', isActive: true },
    { timeCode: '2700', isActive: true },
  ],
  secondHalfTimeCode: [
    { timeCode: '2500', isActive: true },
    { timeCode: '2500', isActive: true },
    { timeCode: '2500', isActive: true },
  ],
  interviewTimeCode: [
    { timeCode: '2500', isActive: true },
    { timeCode: '2500', isActive: true },
    { timeCode: '2500', isActive: true },
  ],
  countSpecials: 3,
}
