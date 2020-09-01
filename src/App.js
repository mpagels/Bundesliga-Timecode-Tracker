import React from 'react'
import styled from 'styled-components'
import SequencePage from './page/SequencePage'

export default function App() {
  return (
    <>
      <AppTitle>Timecode Tracker</AppTitle>
      <SequencePage />
    </>
  )
}

const AppTitle = styled.h1`
  text-align: center;
`
