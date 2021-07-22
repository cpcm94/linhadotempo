import React from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { TimelinePageHeader } from './TimelinePageHeader/TimelinePageHeader'
import { MessageWrapper } from '../_shared/MessageWrapper'

export const NoValidTimelinesPage = () => {
  return (
    <Layout>
      <TimelinePageHeader />
      <MessageWrapper>
        Você não possui acesso à essas linhas do tempo
      </MessageWrapper>
      <Footer />
    </Layout>
  )
}
