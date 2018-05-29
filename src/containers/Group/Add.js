import React from 'react'
import { hasPrivilege } from '../../reducers/auth'
import { connect } from 'react-redux'
import { Segment, Breadcrumb, Divider, Grid } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { createGroup } from '../../actions/group'
import Form from './Form'
import { HeaderTitle } from 'components/common'

let GroupAdd = ({ isLoading, createGroup }) => {
  if (!hasPrivilege('group-store')) {
    return (
      <Redirect to='/forbidden/tambah-group' />
    )
  }
  return (
    <Segment basic>
      <Grid stackable>
        <Grid.Column width={10}>
          <HeaderTitle
            icon='group'
            title='Grup'
            subTitle='Tambah Data Grup' />
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Dashboard</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to='/group'>Grup</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <Form onSubmit={createGroup} successMessage='Sukses menambahkan grup' isLoading={isLoading} />
    </Segment>
  )
}

const mapStateToProps = state => ({
  isLoading: state.group.isLoading,
  hasPrivilege: hasPrivilege(state)
})

export default connect(mapStateToProps, { createGroup })(GroupAdd)
