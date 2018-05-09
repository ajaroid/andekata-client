import callApi from '../../actions/callApi'
import { buildQuery } from '../../lib/helpers'
import { prop, path } from 'ramda'

const provincy = i => path(['regency', 'provincy'], i)
const regency = i => path(['regency'], i)

const toOptions = items => items.map(i => ({
  text: [i, regency(i), provincy(i)].filter(i => !!i).map(prop('name')).join(', '),
  value: i.id
}))

const FETCH_REQUEST = 'FETCH_KECAMATAN_OPTIONS_REQUEST'
const FETCH_SUCCESS = 'FETCH_KECAMATAN_OPTIONS_SUCCESS'
const FETCH_FAILED = 'FETCH_KECAMATAN_OPTIONS_FAILED'

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
    all: 1,
    q
  })

  const request = {
    url: `/subdistrict${params}`,
    method: 'get'
  }

  console.log('fetch kecamatan options', request)
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_SUCCESS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_FAILED })
    })
}
