import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import React from 'react'
import { addDecorator } from '@storybook/react'
import GlobalStyles from '../src/GlobalStyles.js'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}

addDecorator((storyFn) => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
))
