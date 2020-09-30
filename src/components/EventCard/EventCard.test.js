import React from 'react'
import EventCard from './EventCard'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

it('renders correct', () => {
  const { asFragment } = render(
    <EventCard
      tag="Tor"
      playerName="Lewandowski"
      lowerThirdIn="00:03:10:00"
      lowerThirdOut="00:03:18:00"
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
