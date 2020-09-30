import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import React from 'react'
import { addDecorator } from '@storybook/react'
import GlobalStyles from '../src/GlobalStyles.js'
import { BrowserRouter as Router } from 'react-router-dom'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}

addDecorator((storyFn) => (
  <>
    <Router>
      <GlobalStyles />
      {storyFn()}
    </Router>
  </>
))
