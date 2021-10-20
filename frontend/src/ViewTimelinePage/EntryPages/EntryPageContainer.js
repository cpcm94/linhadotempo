import styled from 'styled-components'

export const EntryPageContainer = styled.div`
  margin-top: ${({ expandSize }) => (expandSize ? '5rem' : '2rem')};
`
