import * as types from './types'

export const setError = ({
  scope,
  message
}) => ({
  type: types.SET_ERROR,
  scope,
  payload: message
})

export const clearError = ({ scope }) => ({
  type: types.CLEAR_ERROR,
  scope
})
