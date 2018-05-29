import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updatePosition, fetchPositionDetail } from '../../actions/position'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'
import { fetchOptions as fetchDeptOptions } from '../../reducers/options/department'

class PositionEdit extends React.Component {
  componentWillMount () {
    const { id, fetchPositionDetail, fetchDeptOptions } = this.props
    fetchPositionDetail(id).then(repsonse => {
      fetchDeptOptions()
    })
  }
  render () {
    const { hasPrivilege, isLoading, updatePosition, initialValues, deptOptions } = this.props
    if (!hasPrivilege('position-update')) {
      return (
        <Redirect to='/forbidden/edit-jabatan' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='sitemap'
              title='Jabatan'
              subTitle='Edit Data Jabatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/position'>Jabatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form
          initialValues={initialValues}
          onSubmit={updatePosition}
          successMessage='Posisi sukses diubah'
          deptOptions={deptOptions}
          isLoading={isLoading}
        />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.position.isLoading,
    deptOptions: state.options.department,
    hasPrivilege: hasPrivilege(state),
    initialValues: state.position.detail
  }
}

export default connect(mapStateToProps, { updatePosition, fetchPositionDetail, fetchDeptOptions })(PositionEdit)
