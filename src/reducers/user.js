import * as actions from '../actions/user'

const initState = {
  isLoading: false,

  detail: {},

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
    case actions.FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_USER_SUCCESS:
      const { data = {}, ...other } = action.payload
      return {
        ...state,
        ...other,
        isLoading: false,
        data
      }

    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_USER_DETAIL_REQUEST:
    case actions.RESET_PASSWORD_USER_REQUEST:
    case actions.FETCH_USER_REQUEST:
    case actions.CREATE_USER_REQUEST:
    case actions.UPDATE_USER_REQUEST:
    case actions.DELETE_USER_REQUEST:
      return { ...state, isLoading: true }

    case actions.FETCH_USER_DETAIL_FAILED:
    case actions.RESET_PASSWORD_USER_SUCCESS:
    case actions.RESET_PASSWORD_USER_FAILED:
    case actions.FETCH_USER_FAILED:
    case actions.CREATE_USER_SUCCESS:
    case actions.CREATE_USER_FAILED:
    case actions.UPDATE_USER_FAILED:
    case actions.DELETE_USER_SUCCESS:
    case actions.DELETE_USER_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
