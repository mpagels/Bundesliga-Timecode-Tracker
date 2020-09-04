import React from 'react'
import { render } from '@testing-library/react'
import SequencePage from './SequencePage'

test('checks, if placeholder from "Szenenbeschreibung" is there', () => {
  const { getByPlaceholderText } = render(<SequencePage />)
  const placeholder = getByPlaceholderText('Neue Szene hinzufügen')
  expect(placeholder).toBeVisible()
})

test('checks, if input for timecode is there', () => {
  const { getByPlaceholderText } = render(<SequencePage />)
  const placeholder = getByPlaceholderText('043017')
  expect(placeholder).toBeVisible()
})

test('checks, if "Tor" Tag is there', () => {
  const { getByText } = render(<SequencePage />)
  const tag = getByText('Tor')
  expect(tag).toBeVisible()
})

test('checks, if "Rote Karte" Tag is there', () => {
  const { getByText } = render(<SequencePage />)
  const tag = getByText('Rote Karte')
  expect(tag).toBeVisible()
})

test('checks, if "Löschen" Button is there', () => {
  const { getByText } = render(<SequencePage />)
  const deleteButton = getByText('LÖSCHEN')
  expect(deleteButton).toBeVisible()
})

test('checks, if "Speichern" Button is there', () => {
  const { getByText } = render(<SequencePage />)
  const saveButton = getByText('SPEICHERN')
  expect(saveButton).toBeVisible()
})

test('checks, if after click "Tor" Tag the additional inputs are there', () => {
  const { getByText, getByLabelText } = render(<SequencePage />)
  getByText('Tor').click()
  const name = getByLabelText('Spielername:')
  const timeCodeIn = getByLabelText('Timecode IN')
  const timeCodeOut = getByLabelText('Timecode OUT')
  expect(name).toBeVisible()
  expect(timeCodeIn).toBeVisible()
  expect(timeCodeOut).toBeVisible()
})

test('checks, if after click "Rote Karte" Tag the additional inputs are there', () => {
  const { getByText, getByLabelText } = render(<SequencePage />)
  getByText('Rote Karte').click()
  const name = getByLabelText('Spielername:')
  const timeCodeIn = getByLabelText('Timecode IN')
  const timeCodeOut = getByLabelText('Timecode OUT')
  expect(name).toBeVisible()
  expect(timeCodeIn).toBeVisible()
  expect(timeCodeOut).toBeVisible()
})

test('checks, if after click "Tor" and switch to "Rote Karte" Tag the additional inputs are there', () => {
  const { getByText, getByLabelText } = render(<SequencePage />)
  getByText('Tor').click()
  getByText('Rote Karte').click()
  const name = getByLabelText('Spielername:')
  const timeCodeIn = getByLabelText('Timecode IN')
  const timeCodeOut = getByLabelText('Timecode OUT')
  expect(name).toBeVisible()
  expect(timeCodeIn).toBeVisible()
  expect(timeCodeOut).toBeVisible()
})

test('checks, if after click "Tor" and deactivate "Tor" tag the additional inputs are not there', () => {
  const { getByText, queryByLabelText } = render(<SequencePage />)
  getByText('Tor').click()
  getByText('Tor').click()
  const name = queryByLabelText('Spielername:')
  const timeCodeIn = queryByLabelText('Timecode IN')
  const timeCodeOut = queryByLabelText('Timecode OUT')
  expect(name).toBeNull()
  expect(timeCodeIn).toBeNull()
  expect(timeCodeOut).toBeNull()
})
