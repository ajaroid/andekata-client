import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteKecamatan, fetchKecamatanDetail } from '../../actions/kecamatan'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class KecamatanDetail extends React.Component {
  componentWillMount () {
    const { id, fetchKecamatanDetail } = this.props
    fetchKecamatanDetail(id)
  }
  render () {
    const { hasPrivilege, kecamatan, history, deleteKecamatan, isLoading } = this.props
    const deleteItem = () => {
      deleteKecamatan({ id: kecamatan.id }).then(() => {
        history.push('/kecamatan')
      })
    }

    if (!hasPrivilege('kecamatan-show')) {
      return (
        <Redirect to='/forbidden/detail-kecamatan' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='map signs'
              title='Kecamatan'
              subTitle='Detail Data Kecamatan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kecamatan'>Kecamatan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{kecamatan.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('kecamatan-update') ? <Button as={Link} to={`/kecamatan/edit/${kecamatan.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('kecamatan-destroy') ? <DeleteModal label='kecamatan' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/kecamatan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{kecamatan.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kecamatan</Table.Cell>
              <Table.Cell>{kecamatan.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kabupaten / Kota</Table.Cell>
              <Table.Cell>{kecamatan.regency && kecamatan.regency.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Provinsi</Table.Cell>
              <Table.Cell>{kecamatan.regency && kecamatan.regency.provincy && kecamatan.regency.provincy.name}</Table.Cell>
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
    isLoading: state.kecamatan.isLoading,
    kecamatan: state.kecamatan.detail
  }
}

export default connect(mapStateToProps, { deleteKecamatan, fetchKecamatanDetail })(KecamatanDetail)
