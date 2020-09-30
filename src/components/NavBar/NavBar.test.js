import React from 'react'
import NavBar from './NavBar'
import { render, cleanup } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(cleanup)

it('renders correctly the NavBar', () => {
  const history = createMemoryHistory()
  const { asFragment, debug } = render(
    <Router history={history}>
      <NavBar
        firstHalfTimeCode={[
          { timeCode: '2700', isActive: true },
          { timeCode: '2700', isActive: true },
          { timeCode: '2700', isActive: true },
        ]}
        secondHalfTimeCode={[
          { timeCode: '2500', isActive: true },
          { timeCode: '2500', isActive: true },
          { timeCode: '2500', isActive: true },
        ]}
        interviewTimeCode={[
          { timeCode: '2500', isActive: true },
          { timeCode: '2500', isActive: true },
          { timeCode: '2500', isActive: true },
        ]}
        countSpecials={3}
      />
    </Router>
  )
  debug()
  expect(asFragment()).toMatchSnapshot()
})
