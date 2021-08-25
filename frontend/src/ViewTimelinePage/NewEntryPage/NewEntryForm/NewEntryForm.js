import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryNameInput } from '../../EntryNameInput/EntryNameInput'
import { StyledTextField, InnerWrapper, Wrapper } from './NewEntryForm.styles'
import { MenuItem } from '@material-ui/core'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { CREATE_TIME_ENTRY_MUTATION } from '../../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { SubmitFormButton } from '../../SubmitFormButton/SubmitFormButton'
import { SectionTitle } from '../../SectionTitle/SectionTitle'

export const NewEntryForm = ({
  timelines,
  defaultEntryData,
  refetchTimelines,
}) => {
  const [entry, setEntry] = useState(
    defaultEntryData
      ? {
          timelines: defaultEntryData.timeline
            ? { sync: timelines.map((timeline) => timeline.id) }
            : { sync: [timelines[0].id] },
          name: '',
          year: yearWithoutNegativeSign(defaultEntryData),
          month: defaultEntryData.month ? parseInt(defaultEntryData.month) : '',
          day: defaultEntryData.day ? parseInt(defaultEntryData.day) : '',
          annual_importance: false,
          monthly_importance: false,
        }
      : {
          timelines: { connect: [timelines[0].id] },
          name: '',
          year: '',
          month: '',
          day: '',
          annual_importance: false,
          monthly_importance: false,
        }
  )
  const hasDefaultEntryDataAndYear = defaultEntryData && defaultEntryData.year

  const [radioValue, setRadioValue] = useState(
    hasDefaultEntryDataAndYear && defaultEntryData.year.startsWith('-')
      ? 'AC'
      : 'DC'
  )

  const [createEntry] = useMutation(CREATE_TIME_ENTRY_MUTATION, {
    variables: {
      input: convertFormDataValues(entry, radioValue),
    },
  })
  let history = useHistory()
  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const goBack = (newEntry) => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${timelinesString}`,
      hash: newEntry
        ? `#date=${newEntry.year}${newEntry.month ? `/${newEntry.month}` : ''}${
            newEntry.day ? `/${newEntry.day}` : ''
          }`
        : null,
    })
  }
  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    newEntry[entryPropName] = e.target.value
    setEntry(newEntry)
  }

  const handleTimelinesChange = (e) => {
    const newEntry = { ...entry }
    if (newEntry.timelines.connect.includes(e.target.value)) {
      newEntry.timelines.connect = newEntry.timelines.connect.filter(
        (timeline_id) => timeline_id !== e.target.value
      )
    } else {
      newEntry.timelines.connect = [
        ...newEntry.timelines.connect,
        e.target.value,
      ]
    }
    setEntry(newEntry)
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  const submitCreateEntry = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      refetchTimelines().then(() => {
        goBack(res.data.createTimeEntry)
      })
    })
  }

  const singleTimeline = timelines.length === 1
  const showSingleTimeline = entry.timeline_id
    ? entry.timeline_id
    : timelines[0].id

  return (
    <Wrapper>
      <InnerWrapper>
        <SectionTitle title={'Linhas do tempo'} />
        <StyledTextField
          select
          id="timeline_ids"
          variant="outlined"
          disabled={singleTimeline}
          label="Linha do tempo"
          value={showSingleTimeline}
          onChange={handleTimelinesChange}
        >
          {timelines.map((timeline) => (
            <MenuItem key={timeline.id} value={timeline.id}>
              {timeline.name}
            </MenuItem>
          ))}
        </StyledTextField>
        <DateDisplay
          entry={entry}
          setEntry={setEntry}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
        <EntryNameInput
          entryName={entry.name}
          changeEntryName={handleChange}
          resetName={resetFieldValue}
        />
        <SubmitFormButton
          onClick={submitCreateEntry}
          entry={entry}
          buttonText={'Criar Acontecimento'}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

NewEntryForm.propTypes = {
  timelines: PropTypes.array,
  defaultEntryData: PropTypes.object,
  refetchTimelines: PropTypes.func,
}
