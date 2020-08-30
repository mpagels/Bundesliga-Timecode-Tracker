import React from 'react'
import styled from 'styled-components/macro'

export default function TimecodeCard({ title, index, onChange }) {
  return (
    <InputContainer>
      <Label htmlFor={index}>{title}</Label>
      <br />
      <input
        onChange={(event) => onChange(event, index)}
        type="number"
        pattern="[0-9]{10}"
        id={index}
        name="timecode"
      ></input>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  margin: 8px;
  padding: 10px;
  border-radius: 5px;
`

const Label = styled.label`
  display: inline-block;
  margin: 10px;
`
