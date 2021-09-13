import React, { useState } from 'react'
import { FileUploader } from '../FileUploader'
import { ImageWrapper, Img, ImageAndButtonWrapper } from './TimelineForm.styles'
import PropTypes from 'prop-types'

export const ImageAndUploader = ({ timeline, updateTimelineIconImageUrl }) => {
  const [uploadLoading, setUploadLoading] = useState(false)
  return (
    <ImageAndButtonWrapper>
      <ImageWrapper>
        <Img src={timeline.timelineIconImageUrl} alt="Icone" />
      </ImageWrapper>
      <FileUploader
        updateTimelineIconImageUrl={updateTimelineIconImageUrl}
        imageFilePrefix={`${timeline.id}__`}
        loading={uploadLoading}
        setLoading={setUploadLoading}
      />
    </ImageAndButtonWrapper>
  )
}

ImageAndUploader.propTypes = {
  timeline: PropTypes.object,
  updateTimelineIconImageUrl: PropTypes.func,
}
