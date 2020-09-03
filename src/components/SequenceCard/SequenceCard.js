import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

SequenceCard.propTypes = {
  description: PropTypes.string,
  lengthTimeCode: PropTypes.string,
}

export default function SequenceCard({ description, lengthTimeCode }) {
  return (
    <Card>
      <Description>{description}</Description>
      <Timecode>{lengthTimeCode}</Timecode>
    </Card>
  )
}

const Card = styled.section`
  border: 1px solid grey;
  border-radius: 10px;
  padding: 0 10px;
  margin: 15px 0;
`

const Description = styled.p``
const Timecode = styled.p`
  font-weight: 800;
  text-align: right;
`
