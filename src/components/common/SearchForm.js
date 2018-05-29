import React from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { SimpleField } from 'components/Form'

let SearchForm = ({ onSubmit, handleSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <SimpleField icon='search' placeholder='Cari...' name='q' />
  </Form>
)

SearchForm = reduxForm({
  form: 'searchForm'
})(SearchForm)

export default SearchForm
