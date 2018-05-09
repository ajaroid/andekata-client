import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteAgama, fetchAgamaDetail } from '../../actions/agama'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class AgamaDetail extends React.Component {
  componentWillMount () {
    const { id, fetchAgamaDetail } = this.props
    fetchAgamaDetail(id)
  }
  render () {
    const { hasPrivilege, agama, history, deleteAgama, isLoading } = this.props
    const deleteItem = () => {
      deleteAgama({ id: agama.id }).then(() => {
        history.push('/agama')
      })
    }
    if (!hasPrivilege('agama-show')) {
      return (
        <Redirect to='/forbidden/detail-agama' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='moon'
              title='Agama'
              subTitle='Detail Data Agama' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/agama'>Agama</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{agama.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('agama-update') ? <Button as={Link} to={`/agama/edit/${agama.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('agama-destroy') ? <DeleteModal label='agama' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/agama'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{agama.name}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    hasPrivilege: hasPrivilege(state),
    id: match.params.id,
    isLoading: state.agama.isLoading,
    agama: state.agama.detail
  }
}

export default connect(mapStateToProps, { deleteAgama, fetchAgamaDetail })(AgamaDetail)
