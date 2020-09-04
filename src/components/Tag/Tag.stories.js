import React from 'react'
import Tag from './Tag'

export default {
  title: 'capstone/Tag',
  component: Tag,
}

const Template = (args) => <Tag {...args} />

export const deactivated = Template.bind({})
deactivated.args = {
  title: 'Tor',
  isActive: false,
}
export const activated = Template.bind({})
activated.args = {
  title: 'Tor',
  isActive: true,
}
