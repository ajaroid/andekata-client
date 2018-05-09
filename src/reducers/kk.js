import * as actions from '../actions/kk'

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
    case actions.FETCH_KK_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_KK_SUCCESS:
      const { data = {}, ...other } = action.payload
      return {
        ...state,
        ...other,
        isLoading: false,
        data
      }

    case actions.UPDATE_KK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.CREATE_KK_DETAIL_REQUEST:
    case actions.DELETE_KK_DETAIL_REQUEST:
    case actions.FETCH_KK_DETAIL_REQUEST:
    case actions.FETCH_KK_REQUEST:
    case actions.CREATE_KK_REQUEST:
    case actions.UPDATE_KK_REQUEST:
    case actions.DELETE_KK_REQUEST:
      return { ...state, isLoading: true }

    case actions.CREATE_KK_DETAIL_SUCCESS:
    case actions.CREATE_KK_DETAIL_FAILED:
    case actions.DELETE_KK_DETAIL_SUCCESS:
    case actions.DELETE_KK_DETAIL_FAILED:
    case actions.FETCH_KK_DETAIL_FAILED:
    case actions.FETCH_KK_FAILED:
    case actions.CREATE_KK_SUCCESS:
    case actions.CREATE_KK_FAILED:
    case actions.UPDATE_KK_FAILED:
    case actions.DELETE_KK_SUCCESS:
    case actions.DELETE_KK_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
