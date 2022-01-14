import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-left: 0.5rem;
`

export const Label = styled.label``

export const ColorDisplay = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${({ color }) => color};
  margin: 0.25rem 0 0.25rem 0.25rem;
`

export const LabelAndColorWrapper = styled.div`
  display: flex;
  margin: 0.5rem 0 0.25rem 0;
  align-items: center;
`
