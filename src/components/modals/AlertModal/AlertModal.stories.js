import React from 'react'
import AlertModal from './AlertModal'

export default {
  title: 'capstone/Modals/Alert',
  component: AlertModal,
}

const Template = (args) => <AlertModal {...args} />

export const Default = Template.bind({})

Default.args = {
  children: 'Sollen wirklich alle Daten gelöscht werden?',
}
