import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deletePekerjaan, fetchPekerjaanDetail } from '../../actions/pekerjaan'
import { HeaderTitle, Loader, DeleteModal } from 'components/common'

class PekerjaanDetail extends React.Component {
  componentWillMount () {
    const { id, fetchPekerjaanDetail } = this.props
    fetchPekerjaanDetail(id)
  }
  render () {
    const { hasPrivilege, pekerjaan, history, deletePekerjaan, isLoading } = this.props
    const deleteItem = () => {
      deletePekerjaan({ id: pekerjaan.id }).then(() => {
        history.push('/pekerjaan')
      })
    }

    if (!hasPrivilege('pekerjaan-show')) {
      return (
        <Redirect to='/forbidden/detail-pekerjaan' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='black tie'
              title='Pekerjaan'
              subTitle='Detail Data Pekerjaan' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/pekerjaan'>Pekerjaan</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{pekerjaan.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('pekerjaan-update') ? <Button as={Link} to={`/pekerjaan/edit/${pekerjaan.id}`} color='teal' icon='pencil' content='Ubah' /> : null }
            {hasPrivilege('pekerjaan-destroy') ? <DeleteModal label='pekerjaan' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} /> : null }
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/pekerjaan'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{pekerjaan.name}</Table.Cell>
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
    isLoading: state.pekerjaan.isLoading,
    hasPrivilege: hasPrivilege(state),
    pekerjaan: state.pekerjaan.detail
  }
}

export default connect(mapStateToProps, { deletePekerjaan, fetchPekerjaanDetail })(PekerjaanDetail)
