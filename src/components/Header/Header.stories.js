import React from 'react'
import Header from './Header'

export default {
  title: 'capstone/Header',
  component: Header,
}

const Template = (args) => <Header {...args} />

export const SmallWithCloseButton = Template.bind({})
SmallWithCloseButton.args = {
  title: 'NEUE SZENE HINZUFÜGEN',
  type: 'small',
  isCloseButton: true,
}

export const BigWithButtonsAndTimecodes = Template.bind({})
BigWithButtonsAndTimecodes.args = {
  title: 'TIMECODE TRACKER',
  type: 'big',
  isCloseButton: false,
  totalLength: '00:00:00',
  duration: '00:00:00',
}
