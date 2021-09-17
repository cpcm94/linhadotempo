import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UploadButton } from './UploadButton'
import { v4 as uuidv4 } from 'uuid'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 10px;
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
      .then(function (json) {
        setLoading(false)
        onComplete(json.url)
      })
  }

export const FileUploader = ({
  updateTimelineIconImageUrl,
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
      console.log('upload', files)
      if (files.length > 1) {
        alert('Por favor envie apenas um arquivo')
        return null
      }
      setLoading(true)
      const file = files[0]
      const filename = `${imageFilePrefix}${uuidv4()}.jpg`

      var reader = new FileReader()
      const onComplete = (url) => {
        const cleanUrl = url.substr(0, url.indexOf('?'))
        if (updateTimelineIconImageUrl) updateTimelineIconImageUrl(cleanUrl)
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
    },
    [imageFilePrefix, setLoading, updateTimelineIconImageUrl]
  )
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Wrapper onClick={onUploadButtonClick}>
          <UploadButton color={color} />
          <input
            type="file"
            id="file"
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
  imageFilePrefix: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
}
