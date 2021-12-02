import { Checkbox } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { DeleteButton } from '../../../_shared/DeleteButton'
import {
  ImageAndOptionsWrapper,
  ImageWrapper,
  Img,
  StyledTextField,
} from './EntryImages.styles'
import PropTypes from 'prop-types'
import { UPDATE_IMAGE_MUTATION } from '../EditEntryPage/UPDATE_IMAGE_MUTATION'
import { useMutation } from '@apollo/client'
import { SET_MAIN_IMAGE_MUTATION } from './SET_MAIN_IMAGE_MUTATION'
import { DELETE_IMAGE_MUTATION } from '../../../_shared/DELETE_IMAGE_MUTATION'
import { UNSET_MAIN_IMAGE_MUTATION } from './UNSET_MAIN_IMAGE_MUTATION'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EntryImage = ({
  image,
  images,
  setImages,
  mainImageId,
  setMainImageId,
}) => {
  const isFirstRun = useRef(true)
  const [imageName, setImageName] = useState(image.name)
  const [updateImage] = useMutation(UPDATE_IMAGE_MUTATION)
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION)
  const [setMainImage] = useMutation(SET_MAIN_IMAGE_MUTATION)
  const [unsetMainImage] = useMutation(UNSET_MAIN_IMAGE_MUTATION)

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
    const payload = {
      variables: {
        id: img.id,
      },
    }
    if (img.id === mainImageId) {
      setMainImageId(null)
      unsetMainImage(payload)
    } else {
      setMainImageId(img.id)
      setMainImage(payload)
    }
  }

  const handleChange = (e) => {
    setImageName(e.target.value)
  }

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (imageName !== image.name)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: image.id,
              input: { name: imageName },
            },
          }
          updateImage(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [image.id, image.name, imageName, updateImage])
  return (
    <>
      <ImageAndOptionsWrapper>
        <ImageWrapper>
          <Img
            src={`${process.env.REACT_APP_IMAGES_ENDPOINT}?name=${image.image_url}&width=425`}
            alt="Imagem"
          />
        </ImageWrapper>
        <Checkbox
          value={image.id}
          checked={image.id === mainImageId}
          onChange={() => onRadioChange(image)}
        />
        <DeleteButton onClick={() => handleDelete(image)} />
      </ImageAndOptionsWrapper>
      <StyledTextField
        type="description"
        id="description"
        variant="outlined"
        label="Descrição"
        value={imageName}
        onChange={handleChange}
      />
    </>
  )
}

EntryImage.propTypes = {
  image: PropTypes.object,
  images: PropTypes.array,
  setImages: PropTypes.func,
  mainImageId: PropTypes.string,
  setMainImageId: PropTypes.func,
}
