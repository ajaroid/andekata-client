import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createProvinsi } from '../../actions/provinsi'
import Form from './Form'
import HeaderTitle from '../common/HeaderTitle'

let ProvinsiAdd = ({ hasPrivilege, isLoading, createProvinsi }) => {
  if (!hasPrivilege('provinsi-store')) {
    return (
      <Redirect to='/forbidden/tambah-provinsi' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='marker'
            title='Provinsi'
            subTitle='Tambah Data Provinsi' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/provinsi'>Provinsi</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createProvinsi} successMessage='Sukses menambahkan provinsi' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.provinsi.isLoading
})

export default connect(mapStateToProps, { createProvinsi })(ProvinsiAdd)
