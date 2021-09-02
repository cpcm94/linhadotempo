import React from 'react'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import PropTypes from 'prop-types'

export const NoEntriesYet = ({ visibleTimelines }) => {
  return (
    <>
      {visibleTimelines.length > 1 ? (
        <MessageWrapper>
          Ainda não foram criados eventos para estas linhas do tempo.
        </MessageWrapper>
      ) : (
        <MessageWrapper>
          Ainda não foram criados eventos para esta linha do tempo.
        </MessageWrapper>
      )}
    </>
  )
}
NoEntriesYet.propTypes = {
  visibleTimelines: PropTypes.array,
}
