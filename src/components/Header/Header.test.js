import React from 'react'
import Header from './Header'
import { render, cleanup } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(cleanup)

it('renders correctly a small type header', () => {
  const history = createMemoryHistory()
  const { asFragment, debug } = render(
    <Router history={history}>
      <Header type="small" hasCloseButton={false} />
    </Router>
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly a big type header', () => {
  const history = createMemoryHistory()
  const { asFragment, debug } = render(
    <Router history={history}>
      <Header
        type="big"
        hasCloseButton={false}
        totalLength="00:00:00:00"
        duration="00:00:00:00"
      />
    </Router>
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly a header with close button', () => {
  const history = createMemoryHistory()
  const { asFragment, debug } = render(
    <Router history={history}>
      <Header type="small" hasCloseButton={true} />
    </Router>
  )
  expect(asFragment()).toMatchSnapshot()
})
