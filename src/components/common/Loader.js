import { Dimmer, Loader } from 'semantic-ui-react'
import React from 'react'

/** Nice and simple full page loader for consistency accros ui **/
export default ({ active = true }) => (
  <Dimmer page inverted active={active}>
    <Loader>Loading...</Loader>
  </Dimmer>
)
