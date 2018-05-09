import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteStatusKawin, fetchStatusKawinDetail } from '../../actions/statusKawin'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class StatusKawinDetail extends React.Component {
  componentWillMount () {
    const { id, fetchStatusKawinDetail } = this.props
    fetchStatusKawinDetail(id)
  }
  render () {
    const { hasPrivilege, statusKawin, history, deleteStatusKawin, isLoading } = this.props
    const deleteItem = () => {
      deleteStatusKawin({ id: statusKawin.id }).then(() => {
        history.push('/status-kawin')
      })
    }
    if (!hasPrivilege('status-kawin-show')) {
      return (
        <Redirect to='/forbidden/detail-status-kawin' />
      )
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='check circle'
              title='Status Kawin'
              subTitle='Detail Data Status Kawin' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/status-kawin'>Status Kawin</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{statusKawin.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('status-kawin-update') ? <Button as={Link} to={`/status-kawin/edit/${statusKawin.id}`} color='teal' icon='pencil' content='Edit' /> : null}
            {hasPrivilege('status-kawin-destroy') ? <DeleteModal label='status kawin' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/status-kawin'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{statusKawin.name}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    hasPrivilege: hasPrivilege(state),
    isLoading: state.statusKawin.isLoading,
    statusKawin: state.statusKawin.detail
  }
}

export default connect(mapStateToProps, { deleteStatusKawin, fetchStatusKawinDetail })(StatusKawinDetail)
