import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyle } from './GlobalStyle'
import { MainWrapper } from './MainWrapper'

export const Layout = ({
  children,
  backgroundColor = '#f3fffc',
  backgroundImage,
}) => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
      >
        <main>{children}</main>
      </MainWrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
}
