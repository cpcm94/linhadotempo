import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { ImageWrapper, Img, Wrapper } from './ImageUploader.styles'
import { FileUploader } from '../../../_shared/FileUploader'
import { DeleteButton } from '../../../_shared/DeleteButton'
import { useMutation } from '@apollo/client'
import { CREATE_IMAGE_MUTATION } from '../EditEntryPage/CREATE_IMAGE_MUTATION'

export const ImageUploader = ({ entryId, entryImages }) => {
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
  // const base64str =
  //   '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'
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
          {/* <Img src={`data:image/png;base64,${base64str}`} alt="Imagem" /> */}
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
