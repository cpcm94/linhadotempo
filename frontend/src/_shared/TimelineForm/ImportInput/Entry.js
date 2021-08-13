import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../monthNameArray'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { colors } from '../../colors'
import { useMutation } from '@apollo/client'
import { CREATE_TIME_ENTRY_MUTATION } from '../../CREATE_TIME_ENTRY_MUTATION'

const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: solid 1px ${colors.brown};
  margin: 1rem 0;
  padding: 0 0.25rem;
`
const InnerWrapper = styled.div`
  flex: 1;
`

export const StyledButton = styled(Button)`
  height: 3rem;
  align-self: center;
  cursor: ${({ entryCreated }) =>
    entryCreated ? 'default' : 'pointer'} !important;
  && {
    color: ${colors.white};
  }
  background-color: ${colors.brown} !important;
`

export const Entry = ({ entry, timelineId }) => {
  const mutationInput = {
    name: entry.name,
    year: parseInt(entry.year),
    month: parseInt(entry.month),
    day: parseInt(entry.day),
    annual_importance: false,
    monthly_importance: false,
    timeline_id: timelineId,
  }
  const [entryCreated, setEntryCreated] = useState(false)
  const [createEntry, { loading }] = useMutation(CREATE_TIME_ENTRY_MUTATION, {
    variables: {
      input: mutationInput,
    },
  })

  const handleClick = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      if (res.data.createTimeEntry) {
        setEntryCreated(true)
      } else {
        console.log('failed')
      }
    })
  }
  const yearAC = (year) =>
    year.startsWith('-') ? `${year.substr(1)} a.c.` : year
  return (
    <Wrapper>
      <InnerWrapper>
        Nome: {entry.name} <br />
        Ano: {entry.year !== '' ? yearAC(entry.year) : ''} <br />
        Mês: {entry.month !== '' ? monthNameArray[entry.month] : ''} <br />
        Dia: {entry.day} <br />
      </InnerWrapper>
      {loading ? (
        <span>Loading...</span>
      ) : !entryCreated ? (
        <StyledButton variant="contained" onClick={handleClick}>
          Salvar
        </StyledButton>
      ) : (
        <StyledButton entryCreated={entryCreated} variant="contained">
          &#10003;
        </StyledButton>
      )}
    </Wrapper>
  )
}

Entry.propTypes = {
  entry: PropTypes.object,
  timelineId: PropTypes.string,
}
