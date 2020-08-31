import React from 'react'
import TimecodeTracker from './components/TimecodeTracker/TimecodeTracker'
import styled from 'styled-components'

export default function App() {
  return (
    <>
      <AppTitle>Timecode Tracker</AppTitle>
      <TimecodeTracker />
    </>
  )
}

const AppTitle = styled.h1`
  text-align: center;
`
