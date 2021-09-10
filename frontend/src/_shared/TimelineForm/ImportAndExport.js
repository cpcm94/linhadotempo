import React from 'react'
import { copyTextToClipboard } from './copyTextToClipboard'
import { ImportInput } from './ImportInput/ImportInput'
import {
  ExportText,
  ImportExportButtons,
  StyledButton,
} from './TimelineForm.styles'
import PropTypes from 'prop-types'

export const ImportAndExport = ({
  toggleExportText,
  toggleImportTextArea,
  entriesStringInfo,
  showExportText,
  showImportTextArea,
}) => {
  const entriesString =
    entriesStringInfo &&
    entriesStringInfo
      .map(
        (entryString) => `${entryString}
`
      )
      .join('')
  return (
    <>
      <ImportExportButtons>
        <StyledButton
          id="exportButton"
          variant="contained"
          onClick={toggleExportText}
        >
          Exportar
        </StyledButton>
        <StyledButton
          id="importButton"
          variant="contained"
          onClick={toggleImportTextArea}
        >
          Importar
        </StyledButton>
      </ImportExportButtons>
      {showExportText && (
        <ExportText onClick={() => copyTextToClipboard(entriesString)}>
          {entriesString}
        </ExportText>
      )}
      {showImportTextArea && <ImportInput timeline={timeline} />}
    </>
  )
}

ImportAndExport.propTypes = {
  toggleExportText: PropTypes.func,
  toggleImportTextArea: PropTypes.func,
  entriesStringInfo: PropTypes.array,
  showExportText: PropTypes.bool,
  showImportTextArea: PropTypes.bool,
}
