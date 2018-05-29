import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createAgama } from '../../actions/agama'
import Form from './Form'
import { HeaderTitle } from 'components/common'

let AgamaAdd = ({ hasPrivilege, isLoading, createAgama }) => {
  if (!hasPrivilege('agama-store')) {
    return (
      <Redirect to='/forbidden/tambah-agama' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='moon'
            title='Agama'
            subTitle='Tambah Data Agama' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/agama'>Agama</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createAgama} successMessage='Sukses menambahkan agama' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.agama.isLoading
})

export default connect(mapStateToProps, { createAgama })(AgamaAdd)
