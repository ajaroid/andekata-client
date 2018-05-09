import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'
import Add from './Add'
import Edit from './Edit'
import Detail from './Detail'

const GroupPage = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={List} />
        <Route exact path={match.url + '/page/:page'} component={List} />
        <Route exact path={match.url + '/search/:q'} component={List} />
        <Route exact path={match.url + '/search/:q/page/:page'} component={List} />
        <Route exact path={match.url + '/edit/:id'} component={Edit} />
        <Route exact path={match.url + '/add'} component={Add} />
        <Route exact path={match.url + '/:id'} component={Detail} />
      </Switch>
    </div>
  )
}

export default GroupPage
