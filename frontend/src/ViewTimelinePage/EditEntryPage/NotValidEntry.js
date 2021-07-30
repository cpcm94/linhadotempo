import React from 'react'
import { Layout } from '../../_shared/Layout'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import { Header } from '../../_shared/Header/Header'
import { Footer } from '../../_shared/Footer/Footer'

export const NotValidEntry = () => {
  return (
    <Layout>
      <Header />
      <MessageWrapper>
        Você não possui acesso à esse acontecimento
      </MessageWrapper>
      <Footer />
    </Layout>
  )
}
