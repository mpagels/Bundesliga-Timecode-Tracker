import React, { useState } from 'react'
import {
  getTimecodeGameLength,
  getTimecodeTotalLength,
} from '../../utils/Timecode'
import TimecodeInput from './TimecodeInput'
import TimecodeResult from './TimecodeResult'

export default function TimecodeTracker() {
  const [timecodes, setTimecodes] = useState(['', '', ''])

  return (
    <>
      <form onKeyDown={handleOnEnter}>
        {timecodes.map((_, index) => (
          <TimecodeInput
            title={index < 2 ? 'Halbzeit ' + (index + 1) : 'O-Töne'}
            index={index}
            key={index}
            onChange={handleOnChange}
          />
        ))}
      </form>
      <TimecodeResult
        text="Länge Spiel"
        result={getTimecodeGameLength(timecodes)}
      />
      <TimecodeResult
        text="Länge gesamt"
        result={getTimecodeTotalLength(timecodes)}
      />
    </>
  )

  function handleOnChange(event, index) {
    const value = event.target.value
    const oldTimecodes = [...timecodes]
    oldTimecodes[index] = value
    setTimecodes(oldTimecodes)
  }

  function handleOnEnter(event) {
    if (event.key === 'Enter') {
      const form = event.target.form
      const index = Array.prototype.indexOf.call(form, event.target)
      index <= 1 ? form.elements[index + 1].focus() : form.elements[0].focus()
      event.preventDefault()
    }
  }
}
