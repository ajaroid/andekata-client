import * as actions from '../actions/kecamatan'

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
    case actions.FETCH_KECAMATAN_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_KECAMATAN_SUCCESS:
      const { data = {}, ...other } = action.payload
      return {
        ...state,
        ...other,
        isLoading: false,
        data
      }

    case actions.UPDATE_KECAMATAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_KECAMATAN_DETAIL_REQUEST:
    case actions.FETCH_KECAMATAN_REQUEST:
    case actions.CREATE_KECAMATAN_REQUEST:
    case actions.UPDATE_KECAMATAN_REQUEST:
    case actions.DELETE_KECAMATAN_REQUEST:
      return { ...state, isLoading: true }

    case actions.FETCH_KECAMATAN_DETAIL_FAILED:
    case actions.FETCH_KECAMATAN_FAILED:
    case actions.CREATE_KECAMATAN_SUCCESS:
    case actions.CREATE_KECAMATAN_FAILED:
    case actions.UPDATE_KECAMATAN_FAILED:
    case actions.DELETE_KECAMATAN_SUCCESS:
    case actions.DELETE_KECAMATAN_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
