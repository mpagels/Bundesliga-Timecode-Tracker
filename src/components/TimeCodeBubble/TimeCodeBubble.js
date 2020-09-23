import React from 'react'
import styled from 'styled-components/macro'
export default function TimeCodeBubble({ title, timeCode }) {
  return (
    <BubbleWrapper>
      <ForWhat>{title}</ForWhat>
      <TimeCode>{timeCode}</TimeCode>
    </BubbleWrapper>
  )
}

const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  margin: 0 10px;
  border-radius: 50px;
  background: linear-gradient(
    180deg,
    rgba(var(--white-grey)) 0%,
    rgba(var(--white)) 100%
  );
`

const ForWhat = styled.p`
  margin: 0;
  color: var(--font-blue);
  font-size: 0.6em;
  font-weight: 700;
`

const TimeCode = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1em;
  color: var(--font-blue);
`
