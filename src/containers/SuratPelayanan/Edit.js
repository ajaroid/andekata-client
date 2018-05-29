import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateSuratPelayanan, fetchSuratPelayananDetail } from '../../actions/suratPelayanan'
import Form from './Form'
import { Loader } from 'components/common'

class SuratPelayananEdit extends React.Component {
  componentWillMount () {
    const { id, fetchSuratPelayananDetail } = this.props
    fetchSuratPelayananDetail(id)
  }
  render () {
    const { isLoading, updateSuratPelayanan, initialValues } = this.props
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Edit Surat Pelayanan</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/surat-pelayanan'>Surat Pelayanan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateSuratPelayanan} successMessage='Surat sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.suratPelayanan.isLoading,
    initialValues: state.suratPelayanan.detail
  }
}

export default connect(mapStateToProps, { updateSuratPelayanan, fetchSuratPelayananDetail })(SuratPelayananEdit)
