import callApi from '../../actions/callApi'
import { buildQuery } from '../../lib/helpers'

const toOptions = items => items.map(i => ({
  text: i.nama + ', ' + i.no_kk,
  value: i.no_kk
}))

const FETCH_REQUEST = 'FETCH_KK_OPTIONS_REQUEST'
const FETCH_SUCCESS = 'FETCH_KK_OPTIONS_SUCCESS'
const FETCH_FAILED = 'FETCH_KK_OPTIONS_FAILED'

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

export const fetchOptions = ({ q }) => dispatch => {
  dispatch({ type: FETCH_REQUEST })

  const params = buildQuery({
    field: 'no_kk',
    all: 1,
    q
  })

  const request = {
    url: `/kk${params}`,
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
