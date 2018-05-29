import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'
import Add from './Add'
import Edit from './Edit'
import Detail from './Detail'
import AddDetail from './AddDetail'
import EditDetail from './EditDetail'

const KkPage = ({ match }) => {
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
        <Route exact path={match.url + '/:id/kkdetail/add'} component={AddDetail} />
        <Route exact path={match.url + '/:id/kkdetail/edit/:detailId'} component={EditDetail} />
      </Switch>
    </div>
  )
}

export default KkPage
