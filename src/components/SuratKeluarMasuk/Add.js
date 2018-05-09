import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { createSuratKeluarMasuk } from '../../actions/suratKeluarMasuk'
import Form from './Form'
import Loader from '../common/Loader'

let SuratKeluarMasukAdd = ({ isLoading, createSuratKeluarMasuk }) => (
  <Segment basic>
    <Grid stackable>
      <Grid.Column width={10}>
        <Header>Tambah Surat Keluar Masuk</Header>
      </Grid.Column>
      <Grid.Column width={6} textAlign='right'>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section as={Link} to='/surat-keluar-masuk'>Surat Keluar Masuk</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
        </Breadcrumb>
      </Grid.Column>
    </Grid>
    <Divider hidden />
    {isLoading && <Loader />}
    {!isLoading && <Form onSubmit={createSuratKeluarMasuk} successMessage='Sukses menambahkan surat' isLoading={isLoading} />}
  </Segment>
)

const mapStateToProps = state => ({
  isLoading: state.suratKeluarMasuk.isLoading
})

export default connect(mapStateToProps, { createSuratKeluarMasuk })(SuratKeluarMasukAdd)
