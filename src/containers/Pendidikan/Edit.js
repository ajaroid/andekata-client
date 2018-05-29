import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updatePendidikan, fetchPendidikanDetail } from '../../actions/pendidikan'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'

class PendidikanEdit extends React.Component {
  componentWillMount () {
    const { id, fetchPendidikanDetail } = this.props
    fetchPendidikanDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updatePendidikan, initialValues } = this.props
    if (!hasPrivilege('pendidikan-update')) {
      return (
        <Redirect to='/forbidden/edit-pendidikan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='student'
              title='Pendidikan'
              subTitle='Edit Data Pendidikan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/pendidikan'>Pendidikan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updatePendidikan} successMessage='Pendidikan sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.pendidikan.isLoading,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.pendidikan.detail
  }
}

export default connect(mapStateToProps, { updatePendidikan, fetchPendidikanDetail })(PendidikanEdit)
