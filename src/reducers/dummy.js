import * as a from '../actions/dummy'

const defaultState = {}

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case a.FETCH_DUMMY_REQUEST:
    case a.FETCH_DUMMY_SUCCESS:
    case a.FETCH_DUMMY_FAILED:
      return {}
    default: return state
  }
}

export default ui
