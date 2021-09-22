import React, { useState } from 'react'
import { colorsArray } from '../colorsArray'
import { GithubPicker } from 'react-color'
import { ImageAndUploader } from './ImageAndUploader'
import PropTypes from 'prop-types'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import {
  ColorInitialsDisplay,
  InitialsAndColorWrapper,
  StyledButton,
  TextFieldColor,
  Icon,
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
  const timelineHasImage = !!timeline.timelineIconImageUrl
  const [showColorInitialsDisplay, setShowColorInitialsDisplay] = useState(
    !timelineHasImage
  )
  const [showImageDisplay, setShowImageDisplay] = useState(timelineHasImage)

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
            <StyledButton variant="contained" onClick={toggleImageDisplay}>
              Usar Imagem
            </StyledButton>
          </InitialsAndColorWrapper>
        </ColorInitialsDisplay>
      )}
      {showImageDisplay && (
        <ImageAndUploader
          timeline={timeline}
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
          toggleColorInitialsDisplay={toggleColorInitialsDisplay}
          handleChangeColor={handleChangeColor}
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
