import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { createSuratPelayanan } from '../../actions/suratPelayanan'
import Form from './Form'
import Loader from '../common/Loader'

let SuratAdd = ({ isLoading, createSuratPelayanan }) => (
  <Segment basic>
    <Grid stackable>
      <Grid.Column width={10}>
        <Header>Tambah Surat Pelayanan</Header>
      </Grid.Column>
      <Grid.Column width={6} textAlign='right'>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section as={Link} to='/surat-pelayanan'>Surat Pelayanan</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
        </Breadcrumb>
      </Grid.Column>
    </Grid>
    <Divider hidden />
    {isLoading && <Loader />}
    {!isLoading && <Form onSubmit={createSuratPelayanan} successMessage='Sukses menambahkan surat' isLoading={isLoading} />}
  </Segment>
)

const mapStateToProps = state => ({
  isLoading: state.suratPelayanan.isLoading
})

export default connect(mapStateToProps, { createSuratPelayanan })(SuratAdd)
