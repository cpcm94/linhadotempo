import React from 'react'
import { Layout } from '../_shared/Layout'
import styled from 'styled-components'
import { Header } from '../_shared/Header/Header'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import { useEffect } from 'react'
import { useState } from 'react'
import { moveTouch } from '../_shared/moveTouch'
import { startTouch } from '../_shared/startTouch'

const MessageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

export const TimelineNotFound = () => {
  let history = useHistory()

  const goToPreviousPage = () => {
    history.push('/timelines')
  }
  const [initialX, setInitialX] = useState(null)

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, goToPreviousPage, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
  return (
    <Layout>
      <Header returnButton={goToPreviousPage} />
      <Container>
        <MessageWrapper>Essa linha do tempo não existe!</MessageWrapper>
      </Container>
    </Layout>
  )
}
