import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKk } from '../../actions/kk'
import Form from './Form'

let KkAdd = ({ hasPrivilege, isLoading, createKk }) => {
  if (!hasPrivilege('kk-store')) {
    return (
      <Redirect to='/forbidden/tambah-kk' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <Header>Tambah Kartu Keluarga</Header>
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/kk'>Kk</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createKk} successMessage='Sukses menambahkan kk' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.kk.isLoading
})

export default connect(mapStateToProps, { createKk })(KkAdd)
