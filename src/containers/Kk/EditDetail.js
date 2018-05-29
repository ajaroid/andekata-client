import { connect } from 'react-redux'
import React from 'react'

class KkEdit extends React.Component {
  render () {
    return <p>Edit</p>
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    id: match.params.id,
    isLoading: state.kk.isLoading,
    initialValues: { ...state.kk.detail, kk_id: state.kk.detail.id }
  }
}

export default connect(mapStateToProps)(KkEdit)
