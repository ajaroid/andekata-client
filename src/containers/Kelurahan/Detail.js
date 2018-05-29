import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteKelurahan, fetchKelurahanDetail } from '../../actions/kelurahan'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class KelurahanDetail extends React.Component {
  componentWillMount () {
    const { id, fetchKelurahanDetail } = this.props
    fetchKelurahanDetail(id)
  }
  render () {
    const { hasPrivilege, kelurahan, history, deleteKelurahan, isLoading } = this.props
    if (!hasPrivilege('kelurahan-show')) {
      return (
        <Redirect to='/forbidden/detail-kelurahan' />
      )
    }
    const deleteItem = () => {
      deleteKelurahan({ id: kelurahan.id }).then(() => {
        history.push('/kelurahan')
      })
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='tree'
              title='Kelurahan'
              subTitle='Detail Data Kelurahan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/kelurahan'>Kelurahan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{kelurahan.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('kelurahan-update') ? <Button as={Link} to={`/kelurahan/edit/${kelurahan.id}`} color='teal' icon='pencil' content='Ubah' /> : null}
            {hasPrivilege('kelurahan-destroy') ? <DeleteModal label='kelurahan' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/kelurahan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{kelurahan.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kelurahan</Table.Cell>
              <Table.Cell>{kelurahan.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kecamatan</Table.Cell>
              <Table.Cell>{kelurahan.subdistrict && kelurahan.subdistrict.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kabupaten / Kota</Table.Cell>
              <Table.Cell>{kelurahan.subdistrict && kelurahan.subdistrict.regency && kelurahan.subdistrict.regency.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Provinsi</Table.Cell>
              <Table.Cell>{kelurahan.subdistrict && kelurahan.subdistrict.regency && kelurahan.subdistrict.regency.provincy && kelurahan.subdistrict.regency.provincy.name}</Table.Cell>
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
    isLoading: state.kelurahan.isLoading,
    hasPrivilege: hasPrivilege(state),
    kelurahan: state.kelurahan.detail
  }
}

export default connect(mapStateToProps, { deleteKelurahan, fetchKelurahanDetail })(KelurahanDetail)
