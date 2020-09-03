import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Tag({ title, isActive }) {
  return (
    <Button type="button" isActive={isActive}>
      {title}
    </Button>
  )
}

Tag.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
}

export default Tag

const Button = styled.button`
  border-radius: 10px;
  background-color: transparent;

  border: 2px solid #cdcdcd;
  cursor: pointer;
  font-size: 18px;
  padding: 5px 20px;
  text-align: center;
  margin: 0 5px;
  color: #a7a7a7;
  ${({ isActive }) =>
    isActive &&
    'background-color: #538EFB; border: 1px solid #538EFB; color: white'}
`
