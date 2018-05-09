import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Image, Table, Segment, Breadcrumb, Grid, Divider, Button } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { deleteDesa, fetchDesaDetail } from '../../actions/desa'
import DeleteModal from '../common/DeleteModal'
import Loader from '../common/Loader'
import { extractKelurahan } from '../../lib/helpers'
import HeaderTitle from '../common/HeaderTitle'

const containHttp = link => /^http:\/\//.test(link)

const websiteHref = href => containHttp(href) ? href : 'http://' + href

class DesaDetail extends React.Component {
  componentWillMount () {
    const { id, fetchDesaDetail } = this.props
    fetchDesaDetail(id)
  }
  render () {
    const { hasPrivilege, desa, history, deleteDesa, isLoading } = this.props
    const deleteItem = () => {
      deleteDesa({ id: desa.id }).then(() => {
        history.push('/desa')
      })
    }

    if (!hasPrivilege('identitas-desa-show')) {
      return (
        <Redirect to='/forbidden/detail-desa' />
      )
    }
    return isLoading ? (
      <Loader />
    ) : (
      <Segment basic loading={isLoading}>
        <Grid stackable>
          <Grid.Column width={10}>
            <HeaderTitle
              icon='info circle'
              title='Identitas Desa'
              subTitle='Detail Data Identitas Desa' />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section as={Link} to='/desa'>Identitas Desa</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{desa.village && desa.village.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column>
            {hasPrivilege('identitas-desa-update') && <Button as={Link} to={`/desa/edit/${desa.id}`} color='teal' icon='pencil' content='Ubah' />}
            {hasPrivilege('identitas-desa-destroy') && <DeleteModal label='desa' trigger={<Button color='red' icon='trash' content='Hapus' />} onDelete={deleteItem} />}
            &nbsp;&nbsp;&nbsp;&nbsp;<Link to='/desa'>Kembali</Link>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Nama</Table.Cell>
              <Table.Cell>{extractKelurahan(desa)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kepala Desa</Table.Cell>
              <Table.Cell>{desa.headman_name} ( NIP: {desa.headman_nip} )</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Kepala Camat</Table.Cell>
              <Table.Cell>{desa.head_subdistrict_name} ( NIP: {desa.head_subdistrict_nip} )</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Bupati</Table.Cell>
              <Table.Cell>{desa.regent_name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Alamat Balai Desa</Table.Cell>
              <Table.Cell>{desa.address}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>No. Telepon</Table.Cell>
              <Table.Cell>{desa.phone}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Website</Table.Cell>
              <Table.Cell><a target='_blank' href={websiteHref(desa.website)}>{desa.website}</a></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Email</Table.Cell>
              <Table.Cell>{desa.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Logo</Table.Cell>
              <Table.Cell>
                <a href={desa.logo} target='_blank'>
                  <Image size='small' src={desa.logo} />
                </a>
              </Table.Cell>
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
    isLoading: state.desa.isLoading,
    desa: state.desa.detail
  }
}

export default connect(mapStateToProps, { deleteDesa, fetchDesaDetail })(DesaDetail)
