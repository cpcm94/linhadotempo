import React from 'react'
import { EntryNameWrapper } from './EntryNameWrapper'

export const EntriesWithoutDay = ({ timeEntriesWithoutDay }) => {
  return <EntryNameWrapper>{timeEntriesWithoutDay.name}</EntryNameWrapper>
}
