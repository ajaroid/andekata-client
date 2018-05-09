import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

export default ({ icon, title, subTitle }) => (
  <Header as='h2'>
    <Icon name={icon} />
    <Header.Content>
      {title}
      <Header.Subheader>
        {subTitle}
      </Header.Subheader>
    </Header.Content>
  </Header>
)
