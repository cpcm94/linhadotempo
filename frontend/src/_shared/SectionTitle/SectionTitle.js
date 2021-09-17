import React from 'react'
import { XIcon } from '../../_shared/XIcon'
import PropTypes from 'prop-types'
import { TitleWrapper, XIconWrapper } from './SectionTitle.styles'

export const SectionTitle = ({ title, resetSection }) => {
  return (
    <>
      <TitleWrapper>
        <span>{title}</span>
        {resetSection && (
          <XIconWrapper onClick={resetSection}>
            <XIcon />
          </XIconWrapper>
        )}
      </TitleWrapper>
    </>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  resetSection: PropTypes.func,
}
