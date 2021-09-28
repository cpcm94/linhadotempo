import { colors } from '../../../_shared/colors'
import styled from 'styled-components'

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  border: solid 1px ${colors.grey};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  color: #655;
  border-radius: 5px;
  min-width: 2.5rem;
  min-height: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
`
export const Img = styled.img`
  border-radius: 5px;
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
  margin: 0;
  font-size: 0.9rem;
`

export const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 0.5rem;
  align-items: center;
`
