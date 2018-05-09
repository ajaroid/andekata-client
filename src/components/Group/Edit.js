import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateGroup, fetchGroupDetail } from '../../actions/group'
import Form from './Form'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class GroupEdit extends React.Component {
  componentWillMount () {
    const { id, fetchGroupDetail } = this.props
    fetchGroupDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateGroup, initialValues } = this.props

    if (!hasPrivilege('group-update')) {
      return (
        <Redirect to='/forbidden/edit-group' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='group'
              title='Grup'
              subTitle='Ubah Data Grup' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/group'>Grup</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Ubah</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateGroup} successMessage='Grup sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.group.isLoading,
    initialValues: state.group.detail
  }
}

export default connect(mapStateToProps, { updateGroup, fetchGroupDetail })(GroupEdit)
