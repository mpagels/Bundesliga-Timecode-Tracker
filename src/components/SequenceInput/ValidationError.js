import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

ValidationError.propTypes = {
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
}

function ValidationError({ errorMessage, hasError }) {
  return <Alert hasError={hasError}>{hasError ? errorMessage : '\u00A0'}</Alert>
}

const Alert = styled.span`
  color: ${(props) =>
    props.hasError ? '#cb6870' : 'var(----background-grey)'};
  font-size: 12px;
`
export default ValidationError
