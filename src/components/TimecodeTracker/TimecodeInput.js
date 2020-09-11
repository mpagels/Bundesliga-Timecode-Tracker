import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'

TimecodeInput.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placholder: PropTypes.string,
  onBackSpace: PropTypes.func,
}

export default function TimecodeInput({
  title,
  inputValue,
  onChange,
  disabled,
  placeholder = 'MM:SS:FF',
  onBackSpace,
}) {
  return (
    <InputContainer>
      <Label htmlFor={title}>{title}</Label>
      <br />
      <InputWrapper>
        <Input
          onKeyDown={onBackSpace}
          disabled={disabled}
          onChange={onChange}
          name={title}
          placeholder={placeholder}
          id={title}
          type="tel"
          value={inputValue}
        ></Input>
      </InputWrapper>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  align-items: start;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`

const Label = styled.label`
  color: #737373;
  display: inline-block;
  font-size: 18px;
  margin-bottom: 2px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Input = styled.input`
  background-color: var(----background-grey);
  border: 0;
  box-shadow: inset 0 0 3px 1px #b8b8b8;
  font-size: 150%;
  padding: 15px;
  padding: 20px;
  text-align: right;
  &:focus {
    box-shadow: inset 0 0 3px 1px black;
    outline: black;
  }
`
