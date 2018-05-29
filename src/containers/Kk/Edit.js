import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Segment, Header, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { updateKk, fetchKkDetail } from '../../actions/kk'
import Form from './Form'
import { Loader } from 'components/common'

class KkEdit extends React.Component {
  componentWillMount () {
    const { id, fetchKkDetail } = this.props
    fetchKkDetail(id)
  }
  render () {
    const { hasPrivilege, isLoading, updateKk, initialValues } = this.props
    if (!hasPrivilege('kk-update')) {
      return (
        <Redirect to='/forbidden/edit-kk' />
      )
    }
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <Header>Edit Kartu Keluarga</Header>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kk'>Kk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Edit</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        {isLoading && <Loader />}
        {!isLoading && <Form initialValues={initialValues} onSubmit={updateKk} successMessage='KK sukses diubah' isLoading={isLoading} />}
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.kk.isLoading,
    initialValues: state.kk.detail
  }
}

export default connect(mapStateToProps, { updateKk, fetchKkDetail })(KkEdit)
