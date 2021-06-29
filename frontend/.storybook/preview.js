import React from 'react'
import { GlobalStyle } from '../src/_shared/GlobalStyle'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
]
