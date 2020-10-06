import React from 'react'
import SequenceCard from './SequenceCard'

export default {
  title: 'capstone/SequenceCard',
  component: SequenceCard,
}

const Template = (args) => <SequenceCard {...args} />

export const Active = Template.bind({})
Active.args = {
  description:
    'Schuss Leipzig Pass von Sabitzer, Werner flach links am Tor vorbei',
  lengthTimeCode: '3215',
  isActive: true,
}
export const Inactive = Template.bind({})
Inactive.args = {
  description:
    'Schuss Leipzig Pass von Sabitzer, Werner flach links am Tor vorbei',
  lengthTimeCode: '3215',
  isActive: false,
}

export const WithTag = Template.bind({})
WithTag.args = {
  description:
    'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
  playerName: 'Goretzka',
  tag: 'Rote Karte',
  lengthTimeCode: '3215',
  timeCodeLowerThirdIn: '1500',
  timeCodeLowerThirdLength: '0800',
  isActive: true,
  index: 0,
  allSequenceCards: [{ description: 'Foo', timeCode: '2000', isActive: true }],
}
export const WithTagInactive = Template.bind({})
WithTagInactive.args = {
  description:
    'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
  playerName: 'Goretzka',
  tag: 'Rote Karte',
  lengthTimeCode: '3215',
  timeCodeLowerThirdIn: '1500',
  timeCodeLowerThirdLength: '0800',
  isActive: false,
  index: 0,
  allSequenceCards: [{ description: 'Foo', timeCode: '2000', isActive: true }],
}
