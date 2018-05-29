import React from 'react'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { updateDesa, fetchDesaDetail } from '../../actions/desa'
import { belongsToGroup } from '../../reducers/auth'
import Form from './Form'
import { Loader, HeaderTitle } from 'components/common'

class MyDesa extends React.Component {
  componentWillMount () {
    const { user, fetchDesaDetail } = this.props

    if (!user.employee_id) return

    const id = user.employee.village_id
    fetchDesaDetail(id)
  }
  render () {
    const { user, isLoading, updateDesa, initialValues, belongsToGroup } = this.props

    if (!user.employee_id || belongsToGroup('superadmin') || !user.employee.village_id) {
      return (<Redirect to='/' />)
    }

    const id = user.employee.village_id

    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='info circle'
              title='Identitas Desa'
              subTitle='Ubah Identitas Desa Saya' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Identitas Desa</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateDesa.bind(null, id)} successMessage='Sukses update identitas desa' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    isLoading: state.desa.isLoading,
    initialValues: state.desa.detail,
    user: state.auth.user,
    belongsToGroup: belongsToGroup(state)
  }
}

export default connect(mapStateToProps, { updateDesa, fetchDesaDetail })(MyDesa)
