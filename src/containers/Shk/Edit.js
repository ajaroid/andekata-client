import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateShk, fetchShkDetail } from '../../actions/shk'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'

class ShkEdit extends React.Component {
  componentWillMount () {
    const { id, fetchShkDetail } = this.props
    fetchShkDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateShk, initialValues } = this.props
    if (!hasPrivilege('shk-update')) {
      return (
        <Redirect to='/forbidden/edit-status-hubungan-keluarga' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='minimize'
              title='Status Hubungan Keluarga'
              subTitle='Edit Data Status Hubungan Keluarga' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/shk'>Shk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateShk} successMessage='Sukses ubah shk' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.shk.isLoading,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.shk.detail
  }
}

export default connect(mapStateToProps, { updateShk, fetchShkDetail })(ShkEdit)
