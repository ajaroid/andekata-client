import * as actions from '../actions/auth'
import is from 'is_js'

const defaultState = {
  privileges: [],
  token: '',
  user: {},
  isLoggedIn: false,
  isLoading: false
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { ...state, isLoading: true }

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        privileges: action.all_privileges.map(i => i.name),
        token: action.token,
        user: action.user,
        isLoggedIn: true,
        isLoading: false
      }

    case actions.LOGIN_FAILED:
      return { ...state, isLoading: false }

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        privileges: [],
        token: '',
        user: {},
        isLoggedIn: false,
        isLoading: false
      }

    default: return state
  }
}

export default auth

export const hasPrivilege = state => p => {
  const ps = state.auth.privileges
  if (is.string(p)) {
    return ps ? ps.includes(p) : false
  } else if (is.array(p)) {
    return p.some(_p => ps.includes(_p))
  } else {
    return false
  }
}

export const belongsToGroup = state => group => {
  const user = state.auth.user
  return user.groups.map(g => g.name).includes(group)
}
