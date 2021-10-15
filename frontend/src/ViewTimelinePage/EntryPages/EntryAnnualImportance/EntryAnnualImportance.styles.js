import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const CheckBoxWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 1.25rem;
  border-radius: 5px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem;
  max-height: 1rem;
  font-size: 0.75rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  border: ${({ selected }) =>
    selected ? `1px solid ${colors.brown}` : `1px solid ${colors.lightGrey}`};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const LabelCheckBoxWrapper = styled.div`
  display: flex;
`
export const Label = styled.label``
