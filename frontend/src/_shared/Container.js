import styled from 'styled-components'

export const Container = styled.div`
  margin-top: ${({ subTitle }) => (subTitle ? '3rem' : '2.5rem')};
`
