import React from 'react'
import { connect } from 'react-redux'
import { fetchDummy } from '../actions/dummy.js'

class Dummy extends React.Component {
  componentWillMount () {
    const { fetchDummy } = this.props
    fetchDummy()
  }

  render () {
    return (
      <div>
        <p>This is dummy component for fiddling and testing</p>
        <p>open dev console</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state.dummy
})

const mapDispatchToProps = { fetchDummy }

export default connect(mapStateToProps, mapDispatchToProps)(Dummy)
