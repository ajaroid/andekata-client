import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createPendidikan } from '../../actions/pendidikan'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'

let PendidikanAdd = ({ hasPrivilege, isLoading, createPendidikan }) => {
  if (!hasPrivilege('pendidikan-store')) {
    return (
      <Redirect to='/forbidden/tambah-pendidikan' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='student'
            title='Pendidikan'
            subTitle='Tambah Data Pendidikan' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/pendidikan'>Pendidikan</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createPendidikan} successMessage='Sukses menambahkan pendidikan' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.pendidikan.isLoading
})

export default connect(mapStateToProps, { createPendidikan })(PendidikanAdd)
