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
  lengthTimeCode: '00:00:32:15',
  isActive: true,
}
export const Inactive = Template.bind({})
Inactive.args = {
  description:
    'Schuss Leipzig Pass von Sabitzer, Werner flach links am Tor vorbei',
  lengthTimeCode: '00:00:32:15',
  isActive: false,
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
  isActive: true,
  index: 0,
  allSequenceCards: [{ description: 'Foo', timeCode: '2000', isActive: true }],
}
