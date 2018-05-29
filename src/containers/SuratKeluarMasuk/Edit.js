import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateSuratKeluarMasuk, fetchSuratKeluarMasukDetail } from '../../actions/suratKeluarMasuk'
import Form from './Form'
import { Loader } from 'components/common'

class SuratKeluarMasukEdit extends React.Component {
  componentWillMount () {
    const { id, fetchSuratKeluarMasukDetail } = this.props
    fetchSuratKeluarMasukDetail(id)
  }
  render () {
    const { isLoading, updateSuratKeluarMasuk, initialValues } = this.props
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Edit Surat Keluar Masuk</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-keluar-masuk'>Surat Keluar Masuk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateSuratKeluarMasuk} successMessage='Surat sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.suratKeluarMasuk.isLoading,
    initialValues: state.suratKeluarMasuk.detail
  }
}

export default connect(mapStateToProps, { updateSuratKeluarMasuk, fetchSuratKeluarMasukDetail })(SuratKeluarMasukEdit)
