import React from 'react'
import { Layout } from './Layout'
import styled from 'styled-components'
import { Header } from './Header/Header'

const MessageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

export const TimelineNotFound = () => {
  return (
    <Layout>
      <Header returnButton={true} />
      <MessageWrapper>Essa linha do tempo não existe!</MessageWrapper>
    </Layout>
  )
}
