import React from 'react'
import TimecodeTracker from './components/TimecodeTracker/TimecodeTracker'
import styled from 'styled-components'

export default function App() {
  return (
    <div>
      <AppTitle>Timecode Tracker</AppTitle>
      <TimecodeTracker />
    </div>
  )
}

const AppTitle = styled.h2`
  text-align: center;
`
