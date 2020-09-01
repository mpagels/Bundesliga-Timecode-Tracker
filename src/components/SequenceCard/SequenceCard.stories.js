import React from 'react'
import SequenceCard from './SequenceCard'

export default {
  title: 'capstone/SequenceCard',
  component: SequenceCard,
}

const Template = (args) => <SequenceCard {...args} />

export const Default = Template.bind({})
Default.args = {
  description:
    'Schuss Leipzig Pass von Sabitzer, Werner flach links am Tor vorbei',
  lengthTC: '00:32:15',
}
