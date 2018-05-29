import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../../reducers/auth'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteProvinsi, fetchProvinsiDetail } from '../../actions/provinsi'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class ProvinsiDetail extends React.Component {
  componentWillMount () {
    const { id, fetchProvinsiDetail } = this.props
    fetchProvinsiDetail(id)
  }
  render () {
    const { hasPrivilege, provinsi, history, deleteProvinsi, isLoading } = this.props
    const deleteItem = () => {
      deleteProvinsi({ id: provinsi.id }).then(() => {
        history.push('/provinsi')
      })
    }
    if (!hasPrivilege('provinsi-show')) {
      return (
        <Redirect to='/forbidden/detail-provinsi' />
      )
    }

    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='marker'
              title='Provinsi'
              subTitle='Detail Data Provinsi' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/provinsi'>Provinsi</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{provinsi.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('provinsi-update') ? <Button as={Link} to={`/provinsi/edit/${provinsi.id}`} color='teal' icon='pencil' content='Edit' /> : null}
            {hasPrivilege('provinsi-destroy') ? <DeleteModal label='provinsi' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/provinsi'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Kode</Table.Cell>
              <Table.Cell>{provinsi.code}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Provinsi</Table.Cell>
              <Table.Cell>{provinsi.name}</Table.Cell>
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
    isLoading: state.provinsi.isLoading,
    hasPrivilege: hasPrivilege(state),
    provinsi: state.provinsi.detail
  }
}

export default connect(mapStateToProps, { deleteProvinsi, fetchProvinsiDetail })(ProvinsiDetail)
