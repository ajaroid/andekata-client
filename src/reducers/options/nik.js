import callApi from '../../actions/callApi'

const toOptions = items => {
  return items.map(item => {
    return {
      text: item.nama + ', ' + item.nik,
      value: item.nik
    }
  })
}

const FETCH_REQUEST = 'FETCH_NIK_OPTIONS_REQUEST'
const FETCH_SUCCESS = 'FETCH_NIK_OPTIONS_SUCCESS'
const FETCH_FAILED = 'FETCH_NIK_OPTIONS_FAILED'

const initState = {
  isLoading: false,
  options: [],
  raw: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        options: toOptions(action.payload),
        raw: action.payload
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
    field: 'nik',
    url: `/penduduk?all=1`,
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

export const selectNik = (state, nik) => {
  return state.options.nik.raw.find(n => n.nik === nik)
}
