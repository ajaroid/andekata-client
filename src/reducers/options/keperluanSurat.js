import callApi from '../../actions/callApi'
import { buildQuery } from '../../lib/helpers'

const toOptions = items => items.map(i => ({
  text: i.nama,
  value: i.id
}))

const FETCH_REQUEST = 'FETCH_KEPERLUAN_SURAT_OPTIONS_REQUEST'
const FETCH_SUCCESS = 'FETCH_KEPERLUAN_SURAT_OPTIONS_SUCCESS'
const FETCH_FAILED = 'FETCH_KEPERLUAN_SURAT_OPTIONS_FAILED'

const initState = {
  isLoading: false,
  options: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        options: toOptions(action.payload)
      }

    case FETCH_REQUEST:
      return { ...state, isLoading: true }

    case FETCH_FAILED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export const fetchOptions = (params = {}) => dispatch => {
  dispatch({ type: FETCH_REQUEST })

  const q = buildQuery({
    all: 1,
    ...params
  })

  const request = {
    url: `/keperluan-surat${q}`,
    method: 'get'
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_FAILED })
    })
}
