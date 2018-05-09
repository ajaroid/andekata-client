// TODO dynamic error for different purposes
import * as types from './types'

const initialState = {
  loginError: '',
  authorizationError: '',
  genericError: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ERROR:
      return {
        ...state,
        [action.scope]: action.payload
      }

    case types.CLEAR_ERROR:
      return {
        ...state,
        [action.scope]: ''
      }

    default:
      return state
  }
}
