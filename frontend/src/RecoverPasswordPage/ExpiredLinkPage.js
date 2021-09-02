import React from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import styled from 'styled-components'
import { Container } from '../_shared/Container'

const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`

export const ExpiredLinkPage = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <Wrapper>O link que você está tentando acessar expirou.</Wrapper>
      </Container>
    </Layout>
  )
}
