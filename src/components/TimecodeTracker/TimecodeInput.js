import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'

TimecodeInput.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
}

export default function TimecodeInput({ title, index, inputValue, onChange }) {
  return (
    <InputContainer>
      <Label htmlFor={index}>{title}</Label>
      <br />
      <InputWrapper>
        <Input
          onChange={onChange}
          id={index}
          name="timecode"
          type="tel"
          placeholder="043017"
          value={inputValue}
        ></Input>
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
  margin-bottom: 2px;
  color: #737373;
  font-size: 18px;
  font-size: 150%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Input = styled.input`
  padding: 20px;
  border: 0;
  font-size: 18px;
  box-shadow: inset 0 0 3px 1px #b8b8b8;
  background-color: #e0e0e0;
  &:focus {
    box-shadow: inset 0 0 3px 1px black;
    outline: black;
  }

  font-size: 150%;
  text-align: right;
  padding: 15px;
`
