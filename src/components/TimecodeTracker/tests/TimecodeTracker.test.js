import React from 'react'
import { render } from '@testing-library/react'
import TimecodeTracker from '../TimecodeTracker'

test('renders "Halbzeit1" Component', () => {
  const { getByLabelText } = render(<TimecodeTracker />)
  const label = getByLabelText('Halbzeit 1')
  expect(label).toBeVisible()
})

test('"Halbzeit 1" has an number input field', () => {
  const { queryByRole } = render(<TimecodeTracker />)
  const input = queryByRole('number', { name: 'Halbzeit 1' })
})
test('renders "Halbzeit2" Component', () => {
  const { getByLabelText } = render(<TimecodeTracker />)
  const label = getByLabelText('Halbzeit 2')
  expect(label).toBeVisible()
})

test('"Halbzeit 2" has an number input field', () => {
  const { queryByRole } = render(<TimecodeTracker />)
  const input = queryByRole('number', { name: 'Halbzeit 2' })
})
test('renders "O-Töne" Component', () => {
  const { getByLabelText } = render(<TimecodeTracker />)
  const label = getByLabelText('Halbzeit 1')
  expect(label).toBeVisible()
})

test('"O-Töne" has an number input field', () => {
  const { queryByRole } = render(<TimecodeTracker />)
  const input = queryByRole('number', { name: 'O-Töne' })
})

test('renders result Components', () => {
  const { queryByText, getByText, getAllByText } = render(<TimecodeTracker />)
  const gamelength = getByText('Länge Spiel')
  const gameResultLength = getByText('Länge gesamt')
  const timecode = getAllByText('00:00:00:00')
  expect(gamelength).toBeVisible()
  expect(gameResultLength).toBeVisible()
})
