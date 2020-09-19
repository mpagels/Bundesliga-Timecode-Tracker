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
  font-family: 'BaiJamjuree';
  font-size: 1em;
  background-color: transparent;
  border: 2px solid var(--font-blue);
  border-radius: 20px;
  color: var(--font-blue);
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 20px;
  width: 100%;
  text-align: center;
  ${({ isActive }) =>
    isActive && 'background-color: var(--font-blue); color: white'}
`
