import styled from 'styled-components'
import { colors } from '../../../_shared/colors'
import { TextField } from '@material-ui/core'

export const StyledTextField = styled(TextField)`
  background-color: ${colors.white};
  width: 100%;

  label.Mui-focused {
    color: ${colors.brown};
  }
  label {
    background-color: ${colors.white};
    border-radius: 5px;
    padding: 1px;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${colors.brown};
    }
    &.Mui-focused fieldset {
      border-color: ${colors.brown};
    }
  }
`

export const SourceTextInfo = styled.div`
  padding: 0.25rem 0 0.25rem 0.25rem;
`

export const BookPageWrapper = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
  width: 16.5rem;
  align-items: center;
`

export const BookSelectorWrapper = styled.div`
  padding: 1rem;
  background-color: ${colors.lightBrown};
  border-radius: 5px;
  border-radius: 0 5px 5px 5px;
`

export const StyledSelectTextField = styled(TextField)`
  background-color: ${colors.white};
  width: 100%;
  label.Mui-focused {
    color: ${colors.brown};
  }
  label {
    background-color: ${colors.white};
    border-radius: 5px;
    padding: 1px;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${colors.brown};
    }
    &.Mui-focused fieldset {
      border-color: ${colors.brown};
    }
  }
`
export const SourceUrlDisplayWrapper = styled.div`
  padding: 1rem;
  background-color: ${colors.lightBrown};
  border-radius: 5px;
`

export const SourceTabs = styled.div`
  display: flex;
  font-size: 1.25rem;
`

export const TabSpan = styled.span`
  padding: 0 0.25rem;
  cursor: pointer;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'solid'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
`

export const InnerWrapper = styled.div`
  padding: 0 0 0 0.25rem;
`
