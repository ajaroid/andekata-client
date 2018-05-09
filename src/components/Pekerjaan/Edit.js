import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updatePekerjaan, fetchPekerjaanDetail } from '../../actions/pekerjaan'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class PekerjaanEdit extends React.Component {
  componentWillMount () {
    const { id, fetchPekerjaanDetail } = this.props
    fetchPekerjaanDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updatePekerjaan, initialValues } = this.props
    if (!hasPrivilege('pekerjaan-update')) {
      return (
        <Redirect to='/forbidden/edit-pekerjaan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='black tie'
              title='Pekerjaan'
              subTitle='Edit Data Pekerjaan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/pekerjaan'>Pekerjaan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updatePekerjaan} successMessage='Pekerjaan sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.pekerjaan.isLoading,
    initialValues: state.pekerjaan.detail
  }
}

export default connect(mapStateToProps, { updatePekerjaan, fetchPekerjaanDetail })(PekerjaanEdit)
