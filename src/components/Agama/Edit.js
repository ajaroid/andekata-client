import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateAgama, fetchAgamaDetail } from '../../actions/agama'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class AgamaEdit extends React.Component {
  componentWillMount () {
    const { id, fetchAgamaDetail } = this.props
    fetchAgamaDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateAgama, initialValues } = this.props
    if (!hasPrivilege('agama-update')) {
      return (
        <Redirect to='/forbidden/edit-agama' />
      )
    }
    return (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='moon'
              title='Agama'
              subTitle='Ubah Data Agama' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/agama'>Agama</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateAgama} successMessage='Agama sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    hasPrivilege: hasPrivilege(state),
    id: match.params.id,
    isLoading: state.agama.isLoading,
    initialValues: state.agama.detail
  }
}

export default connect(mapStateToProps, { updateAgama, fetchAgamaDetail })(AgamaEdit)
