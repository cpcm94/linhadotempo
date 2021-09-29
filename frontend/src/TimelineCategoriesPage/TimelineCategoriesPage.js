import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { CategoriesList } from './CategoriesList/CategoriesList'
import { useHistory } from 'react-router'
import { AddCategoryButton } from './AddCategoryButton/AddCategoryButton'

export const TimelineCategoriesPage = ({ categories }) => {
  let history = useHistory()
  const navigateToNewCategoryPage = () => {
    history.push('/newTimelineCategory')
  }
  return (
    <Layout>
      <Header
        title={'Categorias'}
        pageActions={<AddCategoryButton onClick={navigateToNewCategoryPage} />}
        showMenuButton={true}
      />
      <Container>
        <CategoriesList categories={categories} />
      </Container>
    </Layout>
  )
}

TimelineCategoriesPage.propTypes = {
  categories: PropTypes.array,
}
