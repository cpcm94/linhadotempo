import React from 'react'
import { Layout } from '../../_shared/Layout'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import { Header } from '../../_shared/Header/Header'
import { Footer } from '../../_shared/Footer/Footer'
import { Container } from '../../_shared/Container'

export const NotValidEntry = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <MessageWrapper>
          Você não possui acesso à esse acontecimento
        </MessageWrapper>
      </Container>
      <Footer />
    </Layout>
  )
}
