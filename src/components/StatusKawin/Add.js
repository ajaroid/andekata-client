import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { hasPrivilege } from '../../reducers/auth'
import { Redirect, Link } from 'react-router-dom'
import { createStatusKawin } from '../../actions/statusKawin'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'

let StatusKawinAdd = ({ hasPrivilege, isLoading, createStatusKawin }) => {
  if (!hasPrivilege('status-kawin-store')) {
    return (
      <Redirect to='/forbidden/tambah-status-kawin' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='check circle'
            title='Status Kawin'
            subTitle='Tambah Data Status Kawin' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/status-kawin'>Status Kawin</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createStatusKawin} successMessage='Sukses menambahkan status kawin' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.statusKawin.isLoading
})

export default connect(mapStateToProps, { createStatusKawin })(StatusKawinAdd)
