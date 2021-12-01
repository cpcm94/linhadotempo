import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import {
  ImageAndOptionsWrapper,
  ImageWrapper,
  Img,
  Wrapper,
} from './ImageUploader.styles'
import { FileUploader } from '../../../_shared/FileUploader'
import { DeleteButton } from '../../../_shared/DeleteButton'
import { useMutation } from '@apollo/client'
import { CREATE_IMAGE_MUTATION } from '../EditEntryPage/CREATE_IMAGE_MUTATION'
// import { UPDATE_IMAGE_MUTATION } from '../EditEntryPage/UPDATE_IMAGE_MUTATION'
import { Checkbox, FormControl } from '@material-ui/core'
import { DELETE_IMAGE_MUTATION } from '../../../_shared/DELETE_IMAGE_MUTATION'

export const ImageUploader = ({ entryId, entryImages }) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({
    name: '',
    image_url: '',
    is_main_image: false,
    time_entry_id: entryId,
  })
  const [images, setImages] = useState(entryImages)
  const runCreateMutation = useRef(true)
  const updateImageUrl = (url) => {
    const newImage = { ...image }
    newImage.image_url = url
    setImage(newImage)
    runCreateMutation.current = true
  }

  const [createImage] = useMutation(CREATE_IMAGE_MUTATION)
  // const [updateImage] = useMutation(UPDATE_IMAGE_MUTATION)
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION)

  const handleDelete = (image) => {
    const payload = {
      variables: {
        id: image.id,
      },
    }
    deleteImage(payload).then((res) => {
      if (res.data) {
        setImages(images.filter((img) => img.id !== image.id))
      }
    })
  }

  const onRadioChange = (img) => {
    if (img.is_main_image) {
      const newImage = { ...img }
      const imgIndex = images.indexOf(img)
      newImage.is_main_image = false
      const newImages = [...images]
      newImages[imgIndex] = newImage
      setImages(newImages)
    } else {
      const previousMainImage = images.filter((img) => !!img.is_main_image)[0]
      const newImage = { ...img }
      newImage.is_main_image = true
      if (previousMainImage) {
        const newPreviousMainImage = { ...previousMainImage }
        newPreviousMainImage.is_main_image = false

        const filteredImages = images.filter(
          (img) => img.id !== previousMainImage.id && img.id !== newImage.id
        )

        const newImages = [...filteredImages, newImage, newPreviousMainImage]
        setImages(newImages.sort((a, b) => a.id - b.id))
      } else {
        const filteredImages = images.filter((img) => img.id !== newImage.id)
        const newImages = [...filteredImages, newImage]
        setImages(newImages.sort((a, b) => a.id - b.id))
      }
    }
  }
  useEffect(() => {
    const payload = {
      variables: {
        input: image,
      },
    }
    if (image.image_url !== '' && runCreateMutation.current)
      createImage(payload).then((res) => {
        if (res.data.createImage) {
          setImages([...images, res.data.createImage])
          runCreateMutation.current = false
        }
      })
  }, [createImage, images, image])

  return (
    <>
      <SectionTitle title={'Imagens'} />
      <Wrapper>
        <FormControl row>
          {images[0] &&
            images.map((img) => (
              <ImageAndOptionsWrapper key={img.id}>
                <ImageWrapper>
                  <Img
                    src={`${process.env.REACT_APP_IMAGES_ENDPOINT}?name=${img.image_url}`}
                    alt="Imagem"
                  />
                </ImageWrapper>
                <Checkbox
                  value={img.id}
                  checked={img.is_main_image}
                  onChange={() => onRadioChange(img)}
                />
                <DeleteButton onClick={() => handleDelete(img)} />
              </ImageAndOptionsWrapper>
            ))}
        </FormControl>
        <FileUploader
          updateImageUrl={updateImageUrl}
          imageFilePrefix={`${entryId}__`}
          loading={loading}
          setLoading={setLoading}
        />
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
