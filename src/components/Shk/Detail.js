import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteShk, fetchShkDetail } from '../../actions/shk'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class ShkDetail extends React.Component {
  componentWillMount () {
    const { id, fetchShkDetail } = this.props
    fetchShkDetail(id)
  }
  render () {
    const { hasPrivilege, shk, history, deleteShk, isLoading } = this.props
    const deleteItem = () => {
      deleteShk({ id: shk.id }).then(() => {
        history.push('/shk')
      })
    }
    if (!hasPrivilege('shk-show')) {
      return (
        <Redirect to='/forbidden/detail-status-hubungan-keluarga' />
      )
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='minimize'
              title='Status Hubungan Keluarga'
              subTitle='Detail Data Status Hubungan Keluarga' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/shk'>Shk</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{shk.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('shk-update') ? <Button as={Link} to={`/shk/edit/${shk.id}`} color='teal' icon='pencil' content='Edit' /> : null}
            {hasPrivilege('shk-destroy') ? <DeleteModal label='shk' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/shk'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{shk.name}</Table.Cell>
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
    isLoading: state.shk.isLoading,
    shk: state.shk.detail
  }
}

export default connect(mapStateToProps, { deleteShk, fetchShkDetail })(ShkDetail)
