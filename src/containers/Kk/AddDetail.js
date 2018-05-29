import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createKkDetail, fetchKkDetail } from '../../actions/kk'
import Form from './FormDetail'
import { Loader } from 'components/common'

class AddDetail extends React.Component {
  componentWillMount () {
    const { id, fetchKkDetail } = this.props
    fetchKkDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, createKkDetail, kk } = this.props
    const initialValues = {
      kk_id: kk.id
    }
    if (!hasPrivilege('kkdetail-store')) {
      return (
        <Redirect to='/forbidden/tambah-anggota-keluarga' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Tambah Anggota Keluarga</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to={`/kk/${kk.id}`}>{kk.nama}</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Tambah Anggota Keluarga</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={createKkDetail} successMessage='Sukses menambahkan anggota keluarga' isLoading={isLoading} kk={kk} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  isLoading: state.kk.isLoading,
  hasPrivilege: hasPrivilege(state),
  kk: state.kk.detail
})

export default connect(mapStateToProps, { createKkDetail, fetchKkDetail })(AddDetail)
