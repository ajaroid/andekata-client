import React from 'react'
import { Segment } from 'semantic-ui-react'
import { HeaderTitle } from 'components/common'

const Dashboard = () => {
  return (
    <Segment basic>
      <HeaderTitle
        icon='dashboard'
        title='Dashboard'
        subTitle='Dashboard Informasi Desa Saya' />
      {/* <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Header >Penduduk</Header>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Faves</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>31,200</Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Members</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
          <Grid.Column>
            Hello 2
          </Grid.Column>
          <Grid.Column>
            Hello 3
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </Segment>
  )
}

export default Dashboard
