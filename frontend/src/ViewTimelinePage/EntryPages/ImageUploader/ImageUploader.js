import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ImageWrapper, Img, Wrapper } from './ImageUploader.styles'
import { FileUploader } from '../../../_shared/FileUploader'
import { DeleteButton } from '../../../_shared/DeleteButton'

export const ImageUploader = ({ bucketName, entry, setEntry }) => {
  const [loading, setLoading] = useState(false)
  const updateImageUrl = (url) => {
    const newEntry = { ...entry }
    newEntry.image_url = url
    setEntry(newEntry)
  }
  return (
    <>
      <SectionTitle title={'Imagem'} />
      <Wrapper>
        <ImageWrapper>
          <Img
            src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${entry.image_url}`}
            alt="Imagem"
          />
        </ImageWrapper>
        <FileUploader
          updateImageUrl={updateImageUrl}
          imageFilePrefix={`${entry.id}__`}
          loading={loading}
          setLoading={setLoading}
        />
        <DeleteButton onClick={() => updateImageUrl('')} />
      </Wrapper>
    </>
  )
}

ImageUploader.propTypes = {
  bucketName: PropTypes.string,
  entry: PropTypes.object,
  setEntry: PropTypes.func,
}
