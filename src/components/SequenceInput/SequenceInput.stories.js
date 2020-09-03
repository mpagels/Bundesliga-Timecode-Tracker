import React from 'react'
import SequenceInput from './SequenceInput'

export default {
  title: 'capstone/SequenceInput',
  component: SequenceInput,
}

const Template = (args) => <SequenceInput {...args} />

export const Empty = Template.bind({})
Empty.args = {
  hasTimeCode: true,
  hasDescription: true,
  isEmpty: false,
}

export const Filled = Template.bind({})
Filled.args = {
  hasTimeCode: true,
  hasDescription: true,
  isEmpty: false,
  inputValue: '034017',
  textAreaValue:
    'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
}

export const EmptyOnSave = Template.bind({})
EmptyOnSave.args = {
  hasTimeCode: false,
  hasDescription: false,
  isEmpty: true,
}

export const TextAreaEmptyOnSave = Template.bind({})
TextAreaEmptyOnSave.args = {
  hasTimeCode: true,
  inputValue: '034017',
  hasDescription: false,
  isEmpty: true,
}

export const TimecodeInputEmptyOnSave = Template.bind({})
TimecodeInputEmptyOnSave.args = {
  hasTimeCode: false,
  textAreaValue:
    'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
  hasDescription: true,
  isEmpty: true,
}
