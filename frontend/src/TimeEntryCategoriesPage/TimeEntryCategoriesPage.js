import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { CategoriesList } from './CategoriesList/CategoriesList'
import { useHistory } from 'react-router'
import { AddCategoryButton } from './AddCategoryButton/AddCategoryButton'

export const TimeEntryCategoriesPage = ({ categories }) => {
  let history = useHistory()
  const navigateToNewCategoryPage = () => {
    history.push('/newTimeEntryCategory')
  }
  return (
    <Layout>
      <Header
        title={'Categorias Acontecimentos'}
        pageActions={<AddCategoryButton onClick={navigateToNewCategoryPage} />}
        showMenuButton={true}
      />
      <Container>
        <CategoriesList categories={categories} />
      </Container>
    </Layout>
  )
}

TimeEntryCategoriesPage.propTypes = {
  categories: PropTypes.array,
}
