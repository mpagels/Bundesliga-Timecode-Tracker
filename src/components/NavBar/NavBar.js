import React from 'react'
import styled from 'styled-components/macro'
import { getTimecodeTotalLengthFromSequenceCards } from '../../utils/Timecode'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar({
  firstHalfTimeCode,
  secondHalfTimeCode,
  interviewTimeCode,
  countSpecials,
}) {
  const location = useLocation()
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/">
            <p>1ST</p>
            <span>
              {getTimecodeTotalLengthFromSequenceCards(firstHalfTimeCode)}
            </span>
          </Link>
          {location.pathname === '/' && <ActiveBar></ActiveBar>}
        </li>
        <li>
          <Link to="/2nd">
            <p>2ND</p>
            <span>
              {getTimecodeTotalLengthFromSequenceCards(secondHalfTimeCode)}
            </span>
            {location.pathname === '/2nd' && <ActiveBar></ActiveBar>}
          </Link>
        </li>
        <li>
          <Link to="/interview">
            <p>INTERVIEW</p>
            <span>
              {getTimecodeTotalLengthFromSequenceCards(interviewTimeCode)}
            </span>
            {location.pathname === '/interview' && <ActiveBar></ActiveBar>}
          </Link>
        </li>
        <li>
          <Link to="/special">
            <SpecialWrapper>
              {countSpecials > 0 && (
                <SpecialCouter>{countSpecials}</SpecialCouter>
              )}

              <p>SPECIALS</p>
            </SpecialWrapper>
            {location.pathname === '/special' && <ActiveBar></ActiveBar>}
          </Link>
        </li>
        <li>
          <Link to="/info">
            <p>INFO</p>
            {location.pathname === '/info' && <ActiveBar></ActiveBar>}
          </Link>
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
    rgba(var(--white-grey)) 0%,
    rgba(var(--white)) 100%
  );

  & ul {
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  & li {
    font-size: 0.6em;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 10px;
    width: 20%;

    & a {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    & p {
      color: var(--font-blue);
      margin: 0;
      padding: 3px;
      font-weight: 700;
    }

    & span {
      color: var(--font-blue);
    }
  }
`

const ActiveBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 20%;
  height: 3px;
  background-color: var(--font-blue);
  margin: 0;
  padding: 0;
`

const SpecialWrapper = styled.div`
  position: relative;
`

const SpecialCouter = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'BaiJamjuree';
  font-size: 1em;
  color: white;
  background-color: var(--special-orange);
  border-radius: 50px;
  width: 18px;
  height: 18px;
`
