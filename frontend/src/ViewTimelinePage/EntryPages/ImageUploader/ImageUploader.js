import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ImageWrapper, Img, Wrapper } from './ImageUploader.styles'
import { FileUploader } from '../../../_shared/FileUploader'
import { DeleteButton } from '../../../_shared/DeleteButton'
import { useMutation } from '@apollo/client'
import { CREATE_IMAGE_MUTATION } from '../EditEntryPage/CREATE_IMAGE_MUTATION'

export const ImageUploader = ({ entryId, entryImages, bucketName }) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({
    name: '',
    image_url: '',
    time_entry_id: entryId,
  })
  const updateImageUrl = (url) => {
    const newImage = { ...image }
    newImage.image_url = url
    setImage(newImage)
  }

  const [createImage] = useMutation(CREATE_IMAGE_MUTATION)

  useEffect(() => {
    const payload = {
      variables: {
        input: image,
      },
    }
    if (image.image_url !== '') createImage(payload)
  }, [createImage, image])
  return (
    <>
      <SectionTitle title={'Imagem'} />
      <Wrapper>
        <ImageWrapper>
          <Img
            src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${
              entryImages[0] && entryImages[0].image_url
            }`}
            alt="Imagem"
          />
          {/* <Img
            src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/200__93870312-a75c-457c-88a7-aeb841332598.jpg`}
          /> */}
          {/* <Img
            src={`http://127.0.0.1:8000/images?name=200__93870312-a75c-457c-88a7-aeb841332598.jpg&resolution=26x26`}
            alt="Imagem"
          /> */}
        </ImageWrapper>
        <FileUploader
          updateImageUrl={updateImageUrl}
          imageFilePrefix={`${entryId}__`}
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
  entryId: PropTypes.string,
  entryImages: PropTypes.array,
}
