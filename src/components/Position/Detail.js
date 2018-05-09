import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deletePosition, fetchPositionDetail } from '../../actions/position'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class PositionDetail extends React.Component {
  componentWillMount () {
    const { id, fetchPositionDetail } = this.props
    fetchPositionDetail(id)
  }
  render () {
    const { hasPrivilege, position, history, deletePosition, isLoading } = this.props
    const deleteItem = () => {
      deletePosition({ id: position.id }).then(() => {
        history.push('/position')
      })
    }
    if (!hasPrivilege('position-show')) {
      return (
        <Redirect to='/forbidden/detail-position' />
      )
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='sitemap'
              title='Jabatan'
              subTitle='Data Jabatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/position'>Jabatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{position.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('position-update') ? <Button as={Link} to={`/position/edit/${position.id}`} color='teal' icon='pencil' content='Edit' /> : null}
            {hasPrivilege('position-destroy') ? <DeleteModal label='position' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/position'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{position.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Posisi</Table.Cell>
              <Table.Cell>{position.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Departemen</Table.Cell>
              <Table.Cell>{position.department && position.department.name}</Table.Cell>
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
    isLoading: state.position.isLoading,
    hasPrivilege: hasPrivilege(state),
    position: state.position.detail
  }
}

export default connect(mapStateToProps, { deletePosition, fetchPositionDetail })(PositionDetail)
