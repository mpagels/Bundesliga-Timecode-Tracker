import React from 'react'
import styled from 'styled-components/macro'

export default function TimecodeResult({ text, result }) {
  return (
    <ResultContainer>
      <ResultHeader>{text}</ResultHeader>
      <Result>{result}</Result>
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ResultHeader = styled.h4`
  margin: 20px 0;
`

const Result = styled.p`
  margin: 0;
`
