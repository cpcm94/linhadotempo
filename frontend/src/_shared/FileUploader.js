import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UploadButton } from './UploadButton'
import { v4 as uuidv4 } from 'uuid'
import { convertObjectToArray } from './convertObjectToArray'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  cursor: pointer;
`

const buildGetUploadTokenAndPostToAws =
  ({ filename, file, reader, setLoading, onComplete }) =>
  () => {
    fetch(process.env.REACT_APP_UPLOAD_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: filename,
        type: file.type,
      }),
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        const url = json.uploadURL
        return fetch(url, {
          method: 'PUT',
          body: new Blob([reader.result], { type: file.type }),
        })
      })
      .then(function () {
        setLoading(false)
        onComplete()
      })
  }

export const FileUploader = ({
  updateTimelineIconImageUrl,
  updateImageUrl,
  imageFilePrefix,
  color,
  loading,
  setLoading,
}) => {
  const inputFile = useRef(null)

  const onUploadButtonClick = () => {
    inputFile.current.click()
  }

  const upload = useCallback(
    (files) => {
      if (files.length > 1 && updateTimelineIconImageUrl) {
        alert('Por favor envie apenas um arquivo')
        return null
      } else if (files.length > 1) {
        const arrayOfFileObjects = convertObjectToArray(files)

        arrayOfFileObjects.map((file) => {
          setLoading(true)
          const filename = `${imageFilePrefix}${uuidv4()}.jpg`

          var reader = new FileReader()
          const onComplete = () => {
            if (updateTimelineIconImageUrl) updateTimelineIconImageUrl(filename)
            if (updateImageUrl) updateImageUrl(filename)
          }
          reader.addEventListener(
            'loadend',
            buildGetUploadTokenAndPostToAws({
              filename,
              file,
              reader,
              setLoading,
              onComplete,
            })
          )
          reader.readAsArrayBuffer(file)
        })
      } else {
        setLoading(true)
        const file = files[0]
        const filename = `${imageFilePrefix}${uuidv4()}.jpg`

        var reader = new FileReader()
        const onComplete = () => {
          if (updateTimelineIconImageUrl) updateTimelineIconImageUrl(filename)
          if (updateImageUrl) updateImageUrl(filename)
        }
        reader.addEventListener(
          'loadend',
          buildGetUploadTokenAndPostToAws({
            filename,
            file,
            reader,
            setLoading,
            onComplete,
          })
        )
        reader.readAsArrayBuffer(file)
      }
    },
    [imageFilePrefix, setLoading, updateImageUrl, updateTimelineIconImageUrl]
  )
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Wrapper onClick={onUploadButtonClick} className="fileUploaderWrapper">
          <UploadButton color={color} />
          <input
            type="file"
            id="file"
            multiple
            ref={inputFile}
            onChange={(e) => {
              upload(e.target.files)
            }}
            style={{ display: 'none' }}
          />
        </Wrapper>
      )}
    </>
  )
}

FileUploader.propTypes = {
  updateTimelineIconImageUrl: PropTypes.func,
  updateImageUrl: PropTypes.func,
  imageFilePrefix: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
}
