import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { SourceTabs, TabSpan } from './EntrySource.styles'

export const EntrySource = ({ entry }) => {
  const [showBookDisplay, setShowBookDisplay] = useState(false)
  const [showSiteDisplay, setShowSiteDisplay] = useState(false)
  console.log('entry', entry)

  const toggleBookDisplay = () => {
    setShowBookDisplay(!showBookDisplay)
    if (showSiteDisplay) setShowSiteDisplay(false)
  }
  const toggleSiteDisplay = () => {
    setShowSiteDisplay(!showSiteDisplay)
    if (showBookDisplay) setShowBookDisplay(false)
  }
  return (
    <>
      <SectionTitle title={'Fonte'} />
      <SourceTabs>
        <TabSpan selected={showBookDisplay} onClick={toggleBookDisplay}>
          {'Livro'}
        </TabSpan>
        <span> | </span>
        <TabSpan selected={showSiteDisplay} onClick={toggleSiteDisplay}>
          {'Site'}
        </TabSpan>
      </SourceTabs>
    </>
  )
}

EntrySource.propTypes = {
  entry: PropTypes.object,
}
