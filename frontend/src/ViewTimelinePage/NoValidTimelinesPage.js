import React from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { TimelinePageHeader } from './TimelinePageHeader/TimelinePageHeader'
import { MessageWrapper } from '../_shared/MessageWrapper'
import { TimelineScrollerContainer } from './TimelineScrollerContainer'

export const NoValidTimelinesPage = () => {
  return (
    <Layout>
      <TimelinePageHeader />
      <TimelineScrollerContainer>
        <MessageWrapper>
          Você não possui acesso à essas linhas do tempo
        </MessageWrapper>
      </TimelineScrollerContainer>
      <Footer />
    </Layout>
  )
}
