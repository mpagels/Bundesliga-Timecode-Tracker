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
        <Input
          onChange={(event) => handleOnChange(event, index, onChange)}
          id={index}
          name="timecode"
          type="tel"
          placeholder="043017"
          value={value}
        ></Input>
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
  align-items: center;
  border: 1px solid #ddd;
  margin: 8px;
  padding: 10px;
  border-radius: 5px;
`

const Label = styled.label`
  display: inline-block;
  margin: 10px;
  font-size: 150%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  font-size: 120%;
  text-align: right;
  padding: 5px;
`
