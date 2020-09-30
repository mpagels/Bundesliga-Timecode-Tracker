import React from 'react'
import styled from 'styled-components/macro'

export default function EventCard({
  tag,
  playerName,
  lowerThirdIn,
  lowerThirdOut,
}) {
  return (
    <CardWrapper>
      <>
        <Event>{tag.toUpperCase()}</Event>
        <Player>{playerName.toUpperCase()}</Player>
      </>
      <TimeCodes>
        <Test>
          <Text>{'bauchbinde in'.toUpperCase()}</Text>
          <TimeCode>{lowerThirdIn}</TimeCode>
        </Test>
        <Test>
          <Text>{'bauchbinde out'.toUpperCase()}</Text>
          <TimeCode>{lowerThirdOut}</TimeCode>
        </Test>
      </TimeCodes>
    </CardWrapper>
  )
}

const CardWrapper = styled.section`
  padding: 30px;
  margin: 20px;
  border-radius: 30px;
  background: linear-gradient(
    180deg,
    rgba(var(--white-grey)) 0%,
    rgba(var(--white)) 100%
  );
`

const Event = styled.h2`
  color: var(--font-blue);
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  display: block;
`

const Player = styled.p`
  font-weight: 400;
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  color: var(--font-blue);
  line-height: 14px;
`

const TimeCodes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`
const Text = styled.h3`
  color: var(--font-blue);
  font-size: 0.6em;
  font-weight: 400;
  margin: 0;
  padding: 0;

  line-height: 14px;
`
const TimeCode = styled.p`
  color: var(--font-blue);
  font-size: 1em;
  margin: 0;
  padding: 0;

  line-height: 14px;
`

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
