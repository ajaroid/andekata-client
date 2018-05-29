import React from 'react'
import { connect } from 'react-redux'
import { Message, Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateEmployee, fetchEmployeeDetail } from '../../actions/employee'
import { belongsToGroup } from '../../reducers/auth'
import Form from './Form'
import { HeaderTitle, Loader } from 'components/common'

class Profile extends React.Component {
  componentWillMount () {
    const { id, fetchEmployeeDetail } = this.props
    if (!id) return
    fetchEmployeeDetail(id)
  }
  renderHeader () {
    return (
      <div>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='user circle outline'
              title='Profil'
              subTitle='Ubah Profil Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section>Profil</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
      </div>
    )
  }
  render () {
    const { isLoading, belongsToGroup, updateEmployee, initialValues, id } = this.props

    if (!id || belongsToGroup('superadmin') || belongsToGroup('admin')) {
      return <Message>Tidak ada data profile untuk user ini</Message>
    }
    return (
      <Segment basic>
        {this.renderHeader()}

        {isLoading && <Loader />}

        {!isLoading && <Form initialValues={initialValues} onSubmit={updateEmployee} successMessage='Profil sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.user.employee_id,
    isLoading: state.employee.isLoading,
    initialValues: state.employee.detail,
    belongsToGroup: belongsToGroup(state)
  }
}

export default connect(mapStateToProps, { updateEmployee, fetchEmployeeDetail })(Profile)
