import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteKabupaten, fetchKabupatenDetail } from '../../actions/kabupaten'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import HeaderTitle from '../common/HeaderTitle'

class KabupatenDetail extends React.Component {
  componentWillMount () {
    const { id, fetchKabupatenDetail } = this.props
    fetchKabupatenDetail(id)
  }
  render () {
    const { hasPrivilege, kabupaten, history, deleteKabupaten, isLoading } = this.props
    const deleteItem = () => {
      deleteKabupaten({ id: kabupaten.id }).then(() => {
        history.push('/kabupaten')
      })
    }

    if (!hasPrivilege('kabupaten-show')) {
      return (
        <Redirect to='/forbidden/detail-kabupaten' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='bus'
              title='Kabupaten'
              subTitle='Detail Data Kabupaten' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kabupaten'>Kabupaten</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{kabupaten.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('kabupaten-update') ? <Button as={Link} to={`/kabupaten/edit/${kabupaten.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('kabupaten-destroy') ? <DeleteModal label='kabupaten' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/kabupaten'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{kabupaten.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kabupaten / Kota</Table.Cell>
              <Table.Cell>{kabupaten.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Provinsi</Table.Cell>
              <Table.Cell>{kabupaten.provincy && kabupaten.provincy.name}</Table.Cell>
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
    isLoading: state.kabupaten.isLoading,
    kabupaten: state.kabupaten.detail
  }
}

export default connect(mapStateToProps, { deleteKabupaten, fetchKabupatenDetail })(KabupatenDetail)
