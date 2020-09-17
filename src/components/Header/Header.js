import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Cross } from '../../assets/cross-white.svg'
import { ReactComponent as Settings } from '../../assets/settings.svg'
import { ReactComponent as Plus } from '../../assets/plus-white.svg'
import TimeCodeBubble from '../TimeCodeBubble/TimeCodeBubble'
import { Link, useHistory } from 'react-router-dom'

export default function Header({
  title,
  type,
  isCloseButton,
  totalLength,
  duration,
  onCircleClick,
}) {
  let history = useHistory()

  return (
    <Wrapper type={type}>
      <Top type={type}>
        <StyledHeader>{title}</StyledHeader>
        <ActionWrapper>
          {isCloseButton ? (
            <Circle onClick={() => history.goBack()}>
              <Cross />
            </Circle>
          ) : (
            <>
              <Circle>
                <Settings />
              </Circle>
              <AddPlus>
                <Link to="/create">
                  <Plus />
                </Link>
              </AddPlus>
            </>
          )}
        </ActionWrapper>
      </Top>

      {type === 'big' && (
        <BubbleWrapper>
          <TimeCodeBubble title="GESAMTLÄNGE" timeCode={totalLength} />
          <TimeCodeBubble title="VORGABE" timeCode={duration} />
        </BubbleWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0%;
  width: 100%;
  left: 0%;
  height: ${({ type }) => (type === 'small' ? '80px;' : '160px')};
  ${({ type }) => type === 'small' && 'display: flex; align-items: center;'}

  & h1 {
    font-family: 'BaiJamjuree';
    margin-left: 20px;
    color: var(--font-blue);
  }
`
const Top = styled.div`
  width: 100%;
  ${({ type }) => type === 'big' && 'margin-top: 10px;'}
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledHeader = styled.h1`
  font-size: 1.2em;
  margin: 0;
`

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`
const BubbleWrapper = styled.div`
  display: flex;
  margin: 10px 10px 0;
`

const Circle = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(180deg, #001496 0%, #0032c8 100%);
`

const AddPlus = styled.button`
  cursor: pointer;
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50% 0 0 50%;
  height: 60px;
  width: 65px;
  background: linear-gradient(180deg, #001496 0%, #0032c8 100%);
`
