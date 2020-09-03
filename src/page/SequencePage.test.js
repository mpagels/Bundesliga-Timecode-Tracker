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

test('checks, if "Löschen" Button is there', () => {
  const { getByText } = render(<SequencePage />)
  const deleteButton = getByText('LÖSCHEN')
  expect(deleteButton).toBeVisible()
})

test('checks, if "Speichern" Button is there', () => {
  const { getByText } = render(<SequencePage />)
  const deleteButton = getByText('SPEICHERN')
  expect(deleteButton).toBeVisible()
})
