import React from 'react'
import styled from 'styled-components'

export default function InfoAndTimecode({ info, timecode }) {
  return (
    <Wrapper>
      <Text>{info.toUpperCase()}</Text>
      <TimeCode>{timecode}</TimeCode>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Text = styled.h3`
  margin: 0;
  padding: 0;
  color: white;
  font-size: 0.6em;
  font-weight: 700;
`
const TimeCode = styled.p`
  margin: 0;
  padding: 0;
  color: white;
  font-size: 0.8em;
`
