import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Form } from './EditTimelineForm.styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconDisplay } from '../../_shared/IconDisplay/IconDisplay'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { ImportAndExport } from './ImportAndExport/ImportAndExport'
import { TimelineCategorySelect } from '../../_shared/TimelineCategorySelect/TimelineCategorySelect'
import { TimelineNameField } from '../../_shared/TimelineNameField/TimelineNameField'

export const EditTimelineForm = ({
  timeline,
  setTimeline,
  timelineError,
  timelineCategories,
  entriesStringInfo,
  deleteTimeline,
  deleteMessage,
  skipDeleteMessage,
  bucketName,
  deleteLoading,
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

  const resetName = () => {
    const newTimeline = { ...timeline }
    newTimeline.name = ''
    setTimeline(newTimeline)
  }
  return (
    <Wrapper>
      <Form>
        <TimelineNameField
          resetField={resetName}
          timelineError={timelineError}
          timelineName={timeline.name}
          handleChange={handleChange}
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
        timeline={timeline}
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
        loading={deleteLoading}
      />
      <ToastContainer />
    </Wrapper>
  )
}

EditTimelineForm.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  timelineCategories: PropTypes.array,
  entriesStringInfo: PropTypes.array,
  deleteTimeline: PropTypes.func,
  deleteMessage: PropTypes.string,
  skipDeleteMessage: PropTypes.bool,
  bucketName: PropTypes.string,
  timelineError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  deleteLoading: PropTypes.bool,
}
