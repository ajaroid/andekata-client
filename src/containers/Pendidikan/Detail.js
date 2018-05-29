import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deletePendidikan, fetchPendidikanDetail } from '../../actions/pendidikan'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class PendidikanDetail extends React.Component {
  componentWillMount () {
    const { id, fetchPendidikanDetail } = this.props
    fetchPendidikanDetail(id)
  }
  render () {
    const { hasPrivilege, pendidikan, history, deletePendidikan, isLoading } = this.props
    const deleteItem = () => {
      deletePendidikan({ id: pendidikan.id }).then(() => {
        history.push('/pendidikan')
      })
    }
    if (!hasPrivilege('pendidikan-show')) {
      return (
        <Redirect to='/forbidden/detail-pendidikan' />
      )
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='student'
              title='Pendidikan'
              subTitle='Detail Data Pendidikan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/pendidikan'>Pendidikan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{pendidikan.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('pendidikan-update') ? <Button as={Link} to={`/pendidikan/edit/${pendidikan.id}`} color='teal' icon='pencil' content='Ubah' /> : null }
            {hasPrivilege('pendidikan-destroy') ? <DeleteModal label='pendidikan' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null }
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/pendidikan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{pendidikan.name}</Table.Cell>
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
    isLoading: state.pendidikan.isLoading,
    hasPrivilege: hasPrivilege(state),
    pendidikan: state.pendidikan.detail
  }
}

export default connect(mapStateToProps, { deletePendidikan, fetchPendidikanDetail })(PendidikanDetail)
