import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { Wrapper } from './EntryImages.styles'
import { FileUploader } from '../../../_shared/FileUploader'
import { useMutation } from '@apollo/client'
import { CREATE_IMAGE_MUTATION } from '../EditEntryPage/CREATE_IMAGE_MUTATION'
import { FormControl } from '@material-ui/core'
import { EntryImage } from './EntryImage'

const filterForMainImageId = (images) =>
  images.filter((img) => !!img.is_main_image)[0]

export const EntryImages = ({ entryId, entryImages, bucketName }) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({
    name: '',
    image_url: '',
    is_main_image: false,
    time_entry_id: entryId,
  })
  const [images, setImages] = useState(entryImages)

  const [mainImageId, setMainImageId] = useState(
    filterForMainImageId(images) ? filterForMainImageId(images).id : null
  )
  const runCreateMutation = useRef(true)
  const updateImageUrl = (url) => {
    const newImage = { ...image }
    newImage.image_url = url
    setImage(newImage)
    runCreateMutation.current = true
  }

  const [createImage] = useMutation(CREATE_IMAGE_MUTATION)

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
              <EntryImage
                key={img.id}
                image={img}
                images={images}
                setImages={setImages}
                mainImageId={mainImageId}
                setMainImageId={setMainImageId}
                bucketName={bucketName}
              />
            ))}
        </FormControl>
        <FileUploader
          updateImageUrl={updateImageUrl}
          imageFilePrefix={`${entryId}__`}
          loading={loading}
          setLoading={setLoading}
        />
        <span>Subir nova imagem</span>
      </Wrapper>
    </>
  )
}

EntryImages.propTypes = {
  bucketName: PropTypes.string,
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  entryId: PropTypes.string,
  entryImages: PropTypes.array,
}
