import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createShk } from '../../actions/shk'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'

let ShkAdd = ({ hasPrivilege, isLoading, createShk }) => {
  if (!hasPrivilege('shk-store')) {
    return (
      <Redirect to='/forbidden/tambah-status-hubungan-keluarga' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='minimize'
            title='Status Hubungan Keluarga'
            subTitle='Tambah Data Status Hubungan Keluarga' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/shk'>Shk</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createShk} successMessage='Sukses menambahkan shk' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.shk.isLoading
})

export default connect(mapStateToProps, { createShk })(ShkAdd)
