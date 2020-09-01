import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function TimecodeInput({ title, index, onChange, onKeyDown }) {
  return (
    <InputContainer>
      <Label htmlFor={index}>{title}</Label>
      <br />
      <InputWrapper>
        <NumberInput
          onKeyDown={onKeyDown}
          // onChange={(event) => onChange(event, index)}
          type="number"
          id={index}
          name="timecode"
          min="0"
        ></NumberInput>
      </InputWrapper>
    </InputContainer>
  )
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

TimecodeInput.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func,
}
