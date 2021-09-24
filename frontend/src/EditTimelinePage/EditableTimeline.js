import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { UPDATE_TIMELINE_MUTATION } from './UPDATE_TIMELINE_MUTATION'
import { DELETE_TIMELINE_MUTATION } from './DELETE_TIMELINE_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import qs from 'query-string'
import { toast, Slide } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Icon, ImageWrapper, Img } from './EditableTimeline.styles'
import { EditTimelineForm } from './EditTimelineForm/EditTimelineForm'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimeline = ({ timeline }) => {
  const entriesInfo = timeline.time_entries.map((entry) => {
    return `${entry.name}\t${entry.year ? entry.year : ''}\t${
      entry.month ? entry.month : ''
    }\t${entry.day ? entry.day : ''}`
  })
  let history = useHistory()

  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  const goBackToPreviousPage = () => {
    history.push(
      `/timelines${
        selectedTimelinesFromUrl ? `?timelines=${selectedTimelinesFromUrl}` : ''
      }`
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
  })

  const numberOfToBeDeletedEntries = timeline.time_entries.filter(
    (time_entry) => time_entry.timelines.length === 1
  ).length
  const numberOfNotToBeDeletedEntries = timeline.time_entries.filter(
    (time_entry) => time_entry.timelines.length > 1
  ).length

  const [updateTimeline, { loading }] = useMutation(UPDATE_TIMELINE_MUTATION)
  const [deleteTimeline] = useMutation(DELETE_TIMELINE_MUTATION, {
    variables: { id: timeline.id },
  })
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
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: timeline.id,
            input: {
              name: timelineObject.name,
              color: timelineObject.color,
              initials: timelineObject.initials,
              timelineIconImageUrl: timelineObject.timelineIconImageUrl,
            },
          },
        }
        updateTimeline(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [updateTimeline, timeline.id, timelineObject])

  return (
    <Layout>
      <Header
        returnButton={goBackToPreviousPage}
        title={timelineObject.name}
        loading={loading}
        icon={
          timeline.timelineIconImageUrl ? (
            <ImageWrapper timelineColor={timeline.color}>
              <Img src={timeline.timelineIconImageUrl} alt="Icone" />
            </ImageWrapper>
          ) : (
            <Icon color={timeline.color}>{timeline.initials}</Icon>
          )
        }
      />
      <Container subTitle={true}>
        <EditTimelineForm
          timeline={timelineObject}
          setTimeline={setTimelineObject}
          entriesStringInfo={entriesInfo}
          deleteTimeline={onDelete}
          deleteMessage={deleteConfirmationMessage}
          skipDeleteMessage={skipDeleteMessage}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableTimeline.propTypes = {
  timeline: PropTypes.object,
}
