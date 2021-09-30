import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, TextFieldColor, Form } from './EditTimelineForm.styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconDisplay } from '../../_shared/IconDisplay/IconDisplay'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { ImportAndExport } from './ImportAndExport/ImportAndExport'
import { TimelineCategorySelect } from '../../_shared/TimelineCategorySelect/TimelineCategorySelect'

export const EditTimelineForm = ({
  timeline,
  setTimeline,
  timelineCategories,
  entriesStringInfo,
  deleteTimeline,
  deleteMessage,
  skipDeleteMessage,
  bucketName,
}) => {
  const [showExportText, setShowExportText] = useState(false)
  const [showImportTextArea, setShowImportTextArea] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)

  const toggleImportTextArea = () => {
    setShowImportTextArea(!showImportTextArea)
    if (showExportText) setShowExportText(false)
    if (showDeleteMessage) setShowDeleteMessage(false)
  }

  const toggleExportText = () => {
    setShowExportText(!showExportText)
    if (showImportTextArea) setShowImportTextArea(false)
    if (showDeleteMessage) setShowDeleteMessage(false)
  }

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

  const updateTimelineIconImageUrl = (url) => {
    const newTimeline = { ...timeline }
    newTimeline.timelineIconImageUrl = url
    setTimeline(newTimeline)
  }
  const resetSelectedTimelineCategories = () => {
    const newTimeline = { ...timeline }
    newTimeline.timeline_categories.sync = []
    setTimeline(newTimeline)
  }
  return (
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
        <IconDisplay
          timeline={timeline}
          handleChange={handleChange}
          handleChangeColor={handleChangeColor}
          updateTimelineIconImageUrl={updateTimelineIconImageUrl}
          bucketName={bucketName}
        />
        <TimelineCategorySelect
          timeline={timeline}
          setTimeline={setTimeline}
          resetField={resetSelectedTimelineCategories}
          timelineCategories={timelineCategories}
        />
      </Form>
      <ImportAndExport
        toggleExportText={toggleExportText}
        toggleImportTextArea={toggleImportTextArea}
        entriesStringInfo={entriesStringInfo}
        showExportText={showExportText}
        showImportTextArea={showImportTextArea}
      />
      <DeleteButtonAndConfirmation
        deleteFunction={deleteTimeline}
        deleteMessage={deleteMessage}
        skipDeleteMessage={skipDeleteMessage}
        showDeleteMessage={showDeleteMessage}
        setShowDeleteMessage={setShowDeleteMessage}
      />
      <ToastContainer />
    </Wrapper>
  )
}

EditTimelineForm.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  onClick: PropTypes.func,
  timelineCategories: PropTypes.array,
  buttonMessage: PropTypes.string,
  entriesStringInfo: PropTypes.array,
  deleteTimeline: PropTypes.func,
  deleteMessage: PropTypes.string,
  skipDeleteMessage: PropTypes.bool,
  bucketName: PropTypes.string,
}
