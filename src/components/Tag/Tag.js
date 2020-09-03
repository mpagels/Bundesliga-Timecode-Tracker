import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

function Tag({ title, isActive, onClick, index }) {
  return (
    <Button onClick={() => onClick(index)} type="button" isActive={isActive}>
      {title}
    </Button>
  )
}

export default Tag

const Button = styled.button`
  all: unset;
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid #cdcdcd;
  color: #a7a7a7;
  cursor: pointer;
  font-size: 18px;
  margin: 0 5px;
  padding: 5px 20px;
  text-align: center;
  ${({ isActive }) =>
    isActive &&
    'background-color: #538EFB; border: 2px solid #538EFB; color: white'}
`
