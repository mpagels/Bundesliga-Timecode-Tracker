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
  margin: 0;
  font-size: 0.6em;
  color: ${(props) =>
    props.hasError ? 'var(--error-redish' : 'var(--background-grey)'};
`
export default ValidationError
