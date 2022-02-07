import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { UPDATE_TIMELINE_MUTATION } from '../_shared/UPDATE_TIMELINE_MUTATION'
import { DELETE_TIMELINE_MUTATION } from '../_shared/DELETE_TIMELINE_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import qs from 'query-string'
import { toast, Slide } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Icon, ImageWrapper, Img } from './EditableTimeline.styles'
import { EditTimelineForm } from './EditTimelineForm/EditTimelineForm'
import { checkIfTimelineError } from '../_shared/checkIfTimelineError'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimeline = ({
  timeline,
  bucketName,
  timelineCategories,
}) => {
  const entriesInfo = timeline.time_entries.map((entry) => {
    return `${entry.name}\t${entry.year ? entry.year : ''}\t${
      entry.month ? entry.month : ''
    }\t${entry.day ? entry.day : ''}\t${
      entry.end_year ? entry.end_year : ''
    }\t${entry.end_month ? entry.end_month : ''}\t${
      entry.end_day ? entry.end_day : ''
    }\t${entry.is_period}\t${entry.show_period}\t${
      entry.period_color ? entry.period_color : ''
    }`
  })
  let history = useHistory()

  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  const goBackToPreviousPage = () => {
    history.push(
      `/timelines/${
        selectedTimelinesFromUrl ? `?timelines=${selectedTimelinesFromUrl}` : ''
      }${window.location.hash}`
    )
  }

  const isFirstRun = useRef(true)

  const [timelineObject, setTimelineObject] = useState({
    id: timeline.id,
    name: timeline.name,
    color: timeline.color ? timeline.color : '',
    initials: timeline.initials ? timeline.initials : '',
    timelineIconImageUrl: timeline.timelineIconImageUrl
      ? timeline.timelineIconImageUrl
      : '',
    timeline_categories: {
      sync: timeline.timeline_categories.map(
        (timelineCategory) => timelineCategory.id
      ),
    },
  })
  const timelineError = checkIfTimelineError(timelineObject)
  const numberOfToBeDeletedEntries = timeline.time_entries.filter(
    (time_entry) => time_entry.timelines.length === 1
  ).length
  const numberOfNotToBeDeletedEntries = timeline.time_entries.filter(
    (time_entry) => time_entry.timelines.length > 1
  ).length

  const [updateTimeline, { loading }] = useMutation(UPDATE_TIMELINE_MUTATION)
  const [deleteTimeline, { loading: deleteLoading }] = useMutation(
    DELETE_TIMELINE_MUTATION,
    {
      variables: { id: timeline.id },
    }
  )
  const deleteConfirmationMessage = `Tem certeza que deseja deletar essa linha do tempo? ${
    numberOfToBeDeletedEntries
      ? `Você vai deletar os ${numberOfToBeDeletedEntries} acontecimentos que estão associados APENAS a essa linha do tempo!`
      : `Não há acontecimentos relacionados apenas à essa linha do tempo.`
  }  ${
    numberOfNotToBeDeletedEntries
      ? `Existem ${numberOfNotToBeDeletedEntries} outros acontecimentos que também estão associados com outras linhas do tempo mas que NÃO serão deletados!`
      : `Nenhum acontecimento nessa linha do tempo está associado à outras linhas do tempo.`
  } Essa ação é IRREVERSÍVEL, deseja prosseguir?`
  const skipDeleteMessage =
    !numberOfNotToBeDeletedEntries && !numberOfToBeDeletedEntries
  const onDelete = () => {
    deleteTimeline().then((res) => {
      if (res.data.deleteTimeline.success) {
        goBackToPreviousPage()
      } else {
        toast.error(res.data.deleteTimeline.message, {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }
  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!timelineError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: timeline.id,
              input: {
                name: timelineObject.name,
                color: timelineObject.color,
                initials: timelineObject.initials,
                timelineIconImageUrl: timelineObject.timelineIconImageUrl,
                timeline_categories: timelineObject.timeline_categories,
              },
            },
          }
          updateTimeline(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [updateTimeline, timeline.id, timelineObject, timelineError])

  return (
    <Layout>
      <Header
        returnButton={goBackToPreviousPage}
        title={timelineObject.name}
        loading={loading}
        icon={
          timeline.timelineIconImageUrl ? (
            <ImageWrapper timelineColor={timeline.color}>
              <Img
                src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                alt="Icone"
              />
            </ImageWrapper>
          ) : (
            <Icon color={timeline.color}>{timeline.initials}</Icon>
          )
        }
      />
      <Container>
        <EditTimelineForm
          timeline={timelineObject}
          setTimeline={setTimelineObject}
          timelineError={timelineError}
          entriesStringInfo={entriesInfo}
          deleteTimeline={onDelete}
          deleteLoading={deleteLoading}
          deleteMessage={deleteConfirmationMessage}
          skipDeleteMessage={skipDeleteMessage}
          timelineCategories={timelineCategories}
          bucketName={bucketName}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableTimeline.propTypes = {
  timeline: PropTypes.object,
  bucketName: PropTypes.string,
  timelineCategories: PropTypes.array,
}
