import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function TimecodeInput({ title, index, onChange }) {
  return (
    <InputContainer>
      <Label htmlFor={index}>{title}</Label>
      <br />
      <InputWrapper>
        <input
          onChange={(event) => onChange(event, index)}
          type="number"
          id={index}
          name="timecode"
        ></input>
      </InputWrapper>
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

TimecodeInput.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func,
}
