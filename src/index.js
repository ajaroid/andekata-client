import 'semantic-ui-css/semantic.min.css'
import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import configureStore from './lib/configureStore'

const store = configureStore()

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
