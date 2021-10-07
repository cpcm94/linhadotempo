import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { NewBookForm } from './NewBookForm/NewBookForm'
import { UPDATE_BOOK_MUTATION } from '../_shared/UPDATE_BOOK_MUTATION'
import { CREATE_BOOK_MUTATION } from './CREATE_BOOK_MUTATION'
import { useMutation } from '@apollo/client'
import { convertBookFormData } from '../_shared/convertBookFormDataValues'
import { DELETE_BOOK_MUTATION } from '../_shared/DELETE_BOOK_MUTATION'
import { checkIfBookError } from '../_shared/checkIfBookError'
import { startTouch } from '../_shared/startTouch'
import { moveTouch } from '../_shared/moveTouch'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const NewBookPage = () => {
  const isFirstRun = useRef(true)

  const [initialX, setInitialX] = useState(null)
  const [book, setBook] = useState({
    book_name: '',
    publisher: '',
    publishing_year: '',
    edition: '',
    author: '',
  })
  const [bookId, setBookId] = useState(null)

  let history = useHistory()

  const navigateToBooks = () => {
    history.push('/books')
  }

  const [createBook, { loading }] = useMutation(CREATE_BOOK_MUTATION)
  const [updateBook, { loading: updateLoading }] =
    useMutation(UPDATE_BOOK_MUTATION)
  const [deleteBook, { loading: deleteLoading }] = useMutation(
    DELETE_BOOK_MUTATION,
    {
      variables: { id: bookId },
    }
  )

  const handleDelete = () => {
    deleteBook().then((res) => {
      if (res.data) navigateToBooks()
    })
  }
  const bookError = checkIfBookError(book)

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!bookError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: bookId,
              input: convertBookFormData(book),
            },
          }
          if (bookId) {
            updateBook(payload)
          } else {
            createBook(payload).then((res) => {
              if (res.data.createBook && !bookId) {
                setBookId(res.data.createBook.id)
              }
            })
          }
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [bookError, bookId, book, updateBook, createBook])

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, navigateToBooks, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })

  const isLoading = loading || updateLoading

  return (
    <Layout>
      <Header
        title={'Novo Livro'}
        returnButton={navigateToBooks}
        loading={isLoading}
      />
      <Container>
        <NewBookForm
          book={book}
          setBook={setBook}
          bookId={bookId}
          bookError={bookError}
          handleDelete={handleDelete}
          deleteLoading={deleteLoading}
        />
      </Container>
    </Layout>
  )
}
