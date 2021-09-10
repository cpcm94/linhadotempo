import React, { useState } from 'react'
import { FileUploader } from '../FileUploader'
import { ImageWrapper, Img, ImageAndButtonWrapper } from './TimelineForm.styles'
import PropTypes from 'prop-types'

export const ImageAndUploader = ({ timeline, updateTimelineIconImageUrl }) => {
  const [uploadLoading, setUploadLoading] = useState(false)
  return (
    <ImageAndButtonWrapper>
      <ImageWrapper>
        <Img
          src={`https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
          alt="Icone"
        />
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
