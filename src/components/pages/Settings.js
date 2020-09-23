import React from 'react'
import styled from 'styled-components/macro'

export default function Settings({ onClick }) {
  return (
    <PageWrapper>
      <DeleteAction onClick={onClick}>
        <span>SPIELTAG LÖSCHEN</span>
      </DeleteAction>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const DeleteAction = styled.button`
  all: unset;
  cursor: pointer;
  color: var(--button-delete);
  padding: 20px;
  border: 3px solid var(--button-delete);
  border-radius: 50px;
  & span {
    font-weight: 700;
    font-size: 1.4em;
  }
`
