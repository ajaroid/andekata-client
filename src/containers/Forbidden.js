import React from 'react'
import { Icon, Segment, Message } from 'semantic-ui-react'

const Forbidden = ({ match }) => {
  const pagename = match.params.pagename || 'tersebut'
  return (
    <Segment basic>
      <Message icon error>
        <Icon name='warning circle' />
        <Message.Content>Anda tidak mempunyai akses ke halaman <b>{pagename.replace('-', ' ')}</b></Message.Content>
      </Message>
    </Segment>
  )
}

export default Forbidden
