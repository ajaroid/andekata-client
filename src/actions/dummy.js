import callApi from './callApi'

export const FETCH_DUMMY_REQUEST = 'FETCH_DUMMY_REQUEST'
export const FETCH_DUMMY_SUCCESS = 'FETCH_DUMMY_SUCCESS'
export const FETCH_DUMMY_FAILED = 'FETCH_DUMMY_FAILED'
export const fetchDummy = () => dispatch => {
  dispatch({ type: FETCH_DUMMY_REQUEST })

  const request = {
    url: `/auth/login`,
    method: 'post',
    body: {
      email: 'system@ajaro.id',
      password: 'system'
    }
  }
  return dispatch(callApi(request))
    .then(res => {
      dispatch({ type: FETCH_DUMMY_SUCCESS, payload: res })
    })
    .catch(e => {
      dispatch({ type: FETCH_DUMMY_FAILED })
    })
}
