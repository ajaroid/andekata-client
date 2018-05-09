import { LOGOUT_SUCCESS } from '../actions/auth'
import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR } from '../actions/ui'

const defaultState = { sidebarVisible: false }

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case CLOSE_SIDEBAR:
      return { ...state, sidebarVisible: false }

    case TOGGLE_SIDEBAR:
      return { ...state, sidebarVisible: !state.sidebarVisible }

    case LOGOUT_SUCCESS:
      return defaultState

    default: return state
  }
}

export default ui
