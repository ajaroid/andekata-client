import * as actions from '../actions/penduduk'

const initState = {
  isLoading: false,

  isImportingCsv: false,

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
    case actions.IMPORT_PENDUDUK:
      return {
        ...state,
        isImportingCsv: true
      }

    case actions.IMPORT_PENDUDUK_SUCCESS:
    case actions.IMPORT_PENDUDUK_FAILED:
      return {
        ...state,
        isImportingCsv: false
      }

    case actions.FETCH_PENDUDUK_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_PENDUDUK_SUCCESS:
      const { data = {}, ...other } = action.payload
      return {
        ...state,
        ...other,
        isLoading: false,
        data
      }

    case actions.UPDATE_PENDUDUK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action.payload
      }

    case actions.FETCH_PENDUDUK_DETAIL_REQUEST:
    case actions.FETCH_PENDUDUK_REQUEST:
    case actions.CREATE_PENDUDUK_REQUEST:
    case actions.UPDATE_PENDUDUK_REQUEST:
    case actions.DELETE_PENDUDUK_REQUEST:
      return { ...state, isLoading: true }

    case actions.FETCH_PENDUDUK_DETAIL_FAILED:
    case actions.FETCH_PENDUDUK_FAILED:
    case actions.CREATE_PENDUDUK_SUCCESS:
    case actions.CREATE_PENDUDUK_FAILED:
    case actions.UPDATE_PENDUDUK_FAILED:
    case actions.DELETE_PENDUDUK_SUCCESS:
    case actions.DELETE_PENDUDUK_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}
