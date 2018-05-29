import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateStatusKawin, fetchStatusKawinDetail } from '../../actions/statusKawin'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'

class StatusKawinEdit extends React.Component {
  componentWillMount () {
    const { id, fetchStatusKawinDetail } = this.props
    fetchStatusKawinDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateStatusKawin, initialValues } = this.props
    if (!hasPrivilege('status-kawin-update')) {
      return (
        <Redirect to='/forbidden/edit-status-kawin' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='check circle'
              title='Status Kawin'
              subTitle='Edit Data Status Kawin' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/status-kawin'>Status Kawin</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateStatusKawin} successMessage='Status kawin sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.statusKawin.isLoading,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.statusKawin.detail
  }
}

export default connect(mapStateToProps, { updateStatusKawin, fetchStatusKawinDetail })(StatusKawinEdit)
