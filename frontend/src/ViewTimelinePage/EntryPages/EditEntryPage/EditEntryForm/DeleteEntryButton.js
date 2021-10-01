import React from 'react'
import { DeleteButton } from '../../../../_shared/DeleteButton'
import { DELETE_TIME_ENTRY_MUTATION } from '../../../../_shared/DELETE_TIME_ENTRY_MUTATION'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

const Wrapper = styled.div``
export const DeleteEntryButton = ({ entryId, afterDelete }) => {
  const [deleteEntry, { loading }] = useMutation(DELETE_TIME_ENTRY_MUTATION, {
    variables: { id: entryId },
  })

  const confirmAndDelete = () => {
    var response = window.confirm(
      'Ao apagar esse acontecimento, ele vai ser apagado de todas as linhas do tempo. Tem certeza que deseja apagar?'
    )
    response &&
      deleteEntry().then((res) => afterDelete(res.data.deleteTimeEntry))
  }
  return loading ? (
    <Wrapper>
      <span>Loading...</span>
    </Wrapper>
  ) : (
    <Wrapper>
      <DeleteButton onClick={confirmAndDelete} />
    </Wrapper>
  )
}

DeleteEntryButton.propTypes = {
  entryId: PropTypes.string,
  afterDelete: PropTypes.func,
}
