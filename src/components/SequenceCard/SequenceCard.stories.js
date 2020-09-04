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
  lengthTimeCode: '00:00:32:15',
}

export const WithTag = Template.bind({})
WithTag.args = {
  description:
    'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
  playerName: 'Goretzka',
  tag: 'Rote Karte',
  lengthTimeCode: '00:00:32:15',
  timeCodeLowerThirdIn: '00:00:15:00',
  timeCodeLowerThirdOut: '00:00:23:00',
}
