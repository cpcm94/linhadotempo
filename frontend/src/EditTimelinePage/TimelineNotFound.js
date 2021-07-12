import React from 'react'
import { Layout } from '../_shared/Layout'
import styled from 'styled-components'
import { Header } from '../_shared/Header/Header'
import { useHistory } from 'react-router-dom'

const MessageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

export const TimelineNotFound = () => {
  let history = useHistory()

  const goToPreviousPage = () => {
    history.goBack()
  }
  return (
    <Layout>
      <Header returnButton={goToPreviousPage} />
      <MessageWrapper>Essa linha do tempo não existe!</MessageWrapper>
    </Layout>
  )
}
