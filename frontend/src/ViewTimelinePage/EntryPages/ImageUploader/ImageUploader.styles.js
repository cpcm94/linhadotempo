import { colors } from '../../../_shared/colors'
import styled from 'styled-components'

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  border: solid 1px ${colors.grey};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  color: #655;
  border-radius: 5px;
  max-width: 100%;
  max-height: 100%;
  min-width: 2.5rem;
  min-height: 2.5rem;
`
export const Img = styled.img`
  border-radius: 5px;
  max-width: calc(100% - 0.1rem);
  max-height: calc(100% - 0.1rem);
  object-fit: cover;
  margin: 0;
  font-size: 0.9rem;
`

export const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 0.5rem;
  align-items: center;
  flex-direction: column;
`
export const ImageAndOptionsWrapper = styled.div`
  display: flex;
  align-items: center;
`
