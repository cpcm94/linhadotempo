import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  TextFieldColor,
  StyledButton,
  Form,
  Icon,
  ImportExportButtons,
  ExportText,
  DeleteButtonWrapper,
  IconAndDeleteButton,
} from './TimelineForm.styles'
import { GithubPicker } from 'react-color'
import { colorsArray } from './colorsArray'
import { ImportInput } from './ImportInput/ImportInput'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { copyTextToClipboard } from './copyTextToClipboard'
import { DeleteButton } from '../DeleteButton'

const inputProps = {
  maxLength: 3,
  list: 'preset',
}

export const TimelineForm = ({
  timeline,
  setTimeline,
  onClick,
  buttonMessage,
  entriesStringInfo,
  deleteTimeline,
}) => {
  const [showExportText, setShowExportText] = useState(false)
  const [showImportTextArea, setShowImportTextArea] = useState(false)

  const toggleImportTextArea = () => {
    setShowImportTextArea(!showImportTextArea)
    if (showExportText) setShowExportText(false)
  }

  const toggleExportText = () => {
    setShowExportText(!showExportText)
    if (showImportTextArea) setShowImportTextArea(false)
  }
  const entriesString =
    entriesStringInfo &&
    entriesStringInfo
      .map(
        (entryString) => `${entryString}
`
      )
      .join('')

  const handleChange = (timelinePropName) => (e) => {
    const newTimeline = { ...timeline }
    newTimeline[timelinePropName] = e.target.value
    setTimeline(newTimeline)
  }
  const handleChangeColor = (color) => {
    const newTimeline = { ...timeline }
    newTimeline.color = color.hex
    setTimeline(newTimeline)
  }

  return (
    <>
      <Wrapper>
        <Form>
          <TextFieldColor
            type="text"
            id="timeline"
            variant="outlined"
            label="Nome"
            value={timeline.name}
            onChange={handleChange('name')}
          />
          <TextFieldColor
            type="text"
            id="timelineInitial"
            variant="outlined"
            label="Sigla"
            inputProps={inputProps}
            value={timeline.initials}
            onChange={handleChange('initials')}
          />
          <GithubPicker
            triangle="hide"
            color={timeline.color}
            onChange={handleChangeColor}
            colors={colorsArray}
          />
          <IconAndDeleteButton>
            <Icon color={timeline.color}>{timeline.initials}</Icon>
            {deleteTimeline && (
              <DeleteButtonWrapper>
                <DeleteButton onClick={deleteTimeline} />
              </DeleteButtonWrapper>
            )}
          </IconAndDeleteButton>
        </Form>
        {entriesStringInfo && (
          <ImportExportButtons>
            <StyledButton
              id="exportButton"
              variant="contained"
              onClick={toggleExportText}
            >
              Exportar
            </StyledButton>
            <StyledButton
              id="importButton"
              variant="contained"
              onClick={toggleImportTextArea}
            >
              Importar
            </StyledButton>
          </ImportExportButtons>
        )}
        {showExportText && (
          <ExportText onClick={() => copyTextToClipboard(entriesString)}>
            {entriesString}
          </ExportText>
        )}
        {showImportTextArea && (
          <ImportInput
            timeline={timeline}
            showImportTextArea={showImportTextArea}
            setShowImportTextArea={setShowImportTextArea}
          />
        )}
        {buttonMessage && (
          <StyledButton variant="contained" onClick={onClick}>
            {buttonMessage}
          </StyledButton>
        )}
        <ToastContainer />
      </Wrapper>
    </>
  )
}

TimelineForm.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  onClick: PropTypes.func,
  buttonMessage: PropTypes.string,
  entriesStringInfo: PropTypes.array,
  deleteTimeline: PropTypes.func,
}
