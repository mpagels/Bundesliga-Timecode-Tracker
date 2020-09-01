import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

TimecodeInput.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func,
}

export default function TimecodeInput({ title, index, onChange }) {
  const [value, setValue] = useState('')

  return (
    <InputContainer>
      <Label htmlFor={index}>{title}</Label>
      <br />
      <InputWrapper>
        <NumberInput
          onChange={(event) => handleOnChange(event, index, onChange)}
          id={index}
          name="timecode"
          type="tel"
          placeholder="043017"
          value={value}
        ></NumberInput>
      </InputWrapper>
    </InputContainer>
  )

  function handleOnChange(event, index, onChange) {
    const value = event.target.value
    const regex = new RegExp('^[0-9]*$')
    if (regex.test(value) && value.length < 9) {
      setValue(value)
      onChange(value, index)
    }
  }
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Label = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  color: #737373;
  font-size: 18px;
  margin: 10px;
  font-size: 150%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const NumberInput = styled.input`
  padding: 10px;
  border: 0;
  font-size: 18px;
  box-shadow: inset 0 0 3px 1px #b8b8b8;
  background-color: #e0e0e0;
  &:focus {
    box-shadow: inset 0 0 3px 1px black;
    outline: black;
`
const Input = styled.input`
  font-size: 120%;
  text-align: right;
  padding: 5px;
`
