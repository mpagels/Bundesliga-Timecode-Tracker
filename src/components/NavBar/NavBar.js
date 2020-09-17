import React from 'react'
import styled from 'styled-components/macro'

export default function NavBar({
  firstHalfTimeCode,
  secondHalfTimeCode,
  interviewTimeCode,
  countSpecials,
}) {
  return (
    <NavWrapper>
      <ul>
        <li>
          <p>1ST</p>
          <span>{firstHalfTimeCode}</span>
        </li>
        <li>
          <p>2ND</p>
          <span>{secondHalfTimeCode}</span>
        </li>
        <li>
          <p>INTERVIEW</p>
          <span>{interviewTimeCode} </span>
        </li>
        <li>
          <p>SPECIALS</p>
          <span>{countSpecials}</span>
        </li>
        <li>
          <p>INFO</p>
        </li>
      </ul>
    </NavWrapper>
  )
}

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0px;
  height: 60px;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  right: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(240, 240, 240, 1) 0%,
    rgba(250, 250, 250, 1) 100%
  );

  & ul {
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  & li {
    font-family: 'BaiJamjuree';
    font-size: 0.6em;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 10px;
    width: 20%;

    & p {
      font-family: 'BaiJamjuree';
      color: var(--font-blue);
      margin: 0;
      padding: 3px;
    }

    & span {
      font-family: 'BaiJamjuree';
      color: var(--font-blue);
    }
  }
`
