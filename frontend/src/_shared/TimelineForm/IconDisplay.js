import React, { useState } from 'react'
import { colorsArray } from './colorsArray'
import { GithubPicker } from 'react-color'
import { Icon } from './TimelineForm.styles'
import { ImageAndUploader } from './ImageAndUploader'
import PropTypes from 'prop-types'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import {
  ColorInitialsDisplay,
  IconTabs,
  InitialsAndColorWrapper,
  TabSpan,
  TextFieldColor,
} from './IconDisplay.styles'

const inputProps = {
  maxLength: 3,
  list: 'preset',
}

export const IconDisplay = ({
  timeline,
  handleChange,
  handleChangeColor,
  updateTimelineIconImageUrl,
}) => {
  const [showColorInitialsDisplay, setShowColorInitialsDisplay] =
    useState(false)
  const [showImageDisplay, setShowImageDisplay] = useState(false)

  const toggleImageDisplay = () => {
    setShowImageDisplay(!showImageDisplay)
    if (showColorInitialsDisplay) setShowColorInitialsDisplay(false)
  }
  const toggleColorInitialsDisplay = () => {
    setShowColorInitialsDisplay(!showColorInitialsDisplay)
    if (showImageDisplay) setShowImageDisplay(false)
  }
  return (
    <>
      <SectionTitle title={'Ícone'} />
      <IconTabs>
        <TabSpan
          selected={showColorInitialsDisplay}
          onClick={toggleColorInitialsDisplay}
        >
          {'Cor & Sigla'}
        </TabSpan>
        <span>|</span>
        <TabSpan selected={showImageDisplay} onClick={toggleImageDisplay}>
          {'Imagem'}
        </TabSpan>
      </IconTabs>
      {showColorInitialsDisplay && (
        <ColorInitialsDisplay>
          <Icon color={timeline.color}>{timeline.initials}</Icon>
          <InitialsAndColorWrapper>
            <GithubPicker
              triangle="hide"
              color={timeline.color}
              onChange={handleChangeColor}
              colors={colorsArray}
            />
            <TextFieldColor
              type="text"
              id="timelineInitial"
              variant="outlined"
              label="Sigla"
              inputProps={inputProps}
              value={timeline.initials}
              onChange={handleChange('initials')}
            />
          </InitialsAndColorWrapper>
        </ColorInitialsDisplay>
      )}
      {showImageDisplay && (
        <ImageAndUploader
          timeline={timeline}
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
        />
      )}
    </>
  )
}

IconDisplay.propTypes = {
  timeline: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeColor: PropTypes.func,
  updateTimelineIconImageUrl: PropTypes.func,
}
