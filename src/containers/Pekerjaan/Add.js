import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createPekerjaan } from '../../actions/pekerjaan'
import Form from './Form'
import { HeaderTitle } from 'components/common'

let PekerjaanAdd = ({ hasPrivilege, isLoading, createPekerjaan }) => {
  if (!hasPrivilege('pekerjaan-store')) {
    return (
      <Redirect to='/forbidden/tambah-pekerjaan' />
    )
  }

  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='black tie'
            title='Pekerjaan'
            subTitle='Tambah Data Pekerjaan' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/pekerjaan'>Pekerjaan</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createPekerjaan} successMessage='Sukses menambahkan pekerjaan' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  hasPrivilege: hasPrivilege(state),
  isLoading: state.pekerjaan.isLoading
})

export default connect(mapStateToProps, { createPekerjaan })(PekerjaanAdd)
