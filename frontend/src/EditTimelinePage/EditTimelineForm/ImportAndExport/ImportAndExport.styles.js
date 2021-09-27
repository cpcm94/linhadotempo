import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { colors } from '../../../_shared/colors'

export const ImportExportButtons = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  width: calc(100% - 2.5rem);
  border-bottom: solid 1px ${colors.lightGrey};
  padding: 0 0 1rem 0;
`
export const ExportText = styled.pre`
  margin: 0;
  padding: 1rem;
  width: calc(100% - 2.5rem);
  border: solid 1px ${colors.brown};
  border-radius: 5px;
`
export const StyledButton = styled(Button)`
  height: 56px;
  margin-top: ${({ marginTop }) => marginTop && '1rem'} !important;
  && {
    color: ${colors.white};
  }
  &.MuiButton-contained {
    background-color: ${colors.brown};
  }
  &&:hover {
    background-color: ${colors.wine};
  }
`
