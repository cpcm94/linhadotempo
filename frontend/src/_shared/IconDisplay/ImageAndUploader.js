import React, { useState } from 'react'
import { FileUploader } from '../FileUploader'
import {
  ImageWrapper,
  Img,
  ImageAndButtonWrapper,
  StyledButton,
  UploaderAndButtonWrapper,
  ButtonAndColorWrapper,
} from './IconDisplay.styles'
import PropTypes from 'prop-types'
import { GithubPicker } from 'react-color'
import { colorsArray } from '../colorsArray'
import { DeleteButton } from '../DeleteButton'

export const ImageAndUploader = ({
  timeline,
  updateTimelineIconImageUrl,
  toggleColorInitialsDisplay,
  handleChangeColor,
  bucketName,
}) => {
  const [uploadLoading, setUploadLoading] = useState(false)
  return (
    <UploaderAndButtonWrapper>
      <ImageAndButtonWrapper>
        <ImageWrapper timelineColor={timeline.color}>
          <Img
            src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
            alt="Icone"
          />
        </ImageWrapper>
        <FileUploader
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
          imageFilePrefix={`${timeline.id}__`}
          loading={uploadLoading}
          setLoading={setUploadLoading}
        />
        <DeleteButton onClick={() => updateTimelineIconImageUrl('')} />
      </ImageAndButtonWrapper>
      <ButtonAndColorWrapper>
        <GithubPicker
          triangle="hide"
          color={timeline.color}
          onChange={handleChangeColor}
          colors={colorsArray}
        />
        <StyledButton
          onClick={toggleColorInitialsDisplay}
          marginTop={true}
          variant="contained"
        >
          Usar sigla
        </StyledButton>
      </ButtonAndColorWrapper>
    </UploaderAndButtonWrapper>
  )
}

ImageAndUploader.propTypes = {
  timeline: PropTypes.object,
  updateTimelineIconImageUrl: PropTypes.func,
  toggleColorInitialsDisplay: PropTypes.func,
  handleChangeColor: PropTypes.func,
  bucketName: PropTypes.string,
}
