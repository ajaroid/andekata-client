import callApi from '../../actions/callApi'
import { toOptions } from '../../lib/helpers'

const FETCH_REQUEST = 'FETCH_POSITION_OPTIONS_REQUEST'
const FETCH_SUCCESS = 'FETCH_POSITION_OPTIONS_SUCCESS'
const FETCH_FAILED = 'FETCH_POSITION_OPTIONS_FAILED'

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

export const fetchOptions = () => dispatch => {
  dispatch({ type: FETCH_REQUEST })

  const request = {
    url: `/position?all=1`,
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
