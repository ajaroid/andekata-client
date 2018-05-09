import * as actions from '../actions/group'
import { path } from 'ramda'

const initState = {
  isLoading: false,

  // used to store fetch detail
  detail: {},

  error: '',

  // from api
  data: [],
  current_page: null,
  from: null,
  to: null,
  next_page_url: null,
  prev_page_url: null,
  per_page: null,
  total: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_GROUP_PRIVILEGE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      }

    case actions.UPDATE_GROUP_USERS_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        ...action.payload
      }

    case actions.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.UPDATE_GROUP_PRIVILEGE_REQUEST:
    case actions.FETCH_GROUP_DETAIL_REQUEST:
    case actions.UPDATE_GROUP_USERS_REQUEST:
    case actions.FETCH_GROUP_REQUEST:
    case actions.CREATE_GROUP_REQUEST:
    case actions.UPDATE_GROUP_REQUEST:
    case actions.DELETE_GROUP_REQUEST:
      return { ...state, error: '', isLoading: true }

    case actions.UPDATE_GROUP_PRIVILEGE_FAILED:
    case actions.FETCH_GROUP_DETAIL_FAILED:
    case actions.UPDATE_GROUP_USERS_FAILED:
    case actions.FETCH_GROUP_FAILED:
    case actions.CREATE_GROUP_SUCCESS:
    case actions.CREATE_GROUP_FAILED:
    case actions.UPDATE_GROUP_FAILED:
    case actions.DELETE_GROUP_SUCCESS:
      return { ...state, error: '', isLoading: false }

    case actions.DELETE_GROUP_FAILED:
      return {
        ...state,
        error: path(['e', 'error'], action) || '',
        isLoading: false
      }

    case actions.DISMISS_GROUP_ERROR:
      return { ...state, error: '' }

    default:
      return state
  }
}
