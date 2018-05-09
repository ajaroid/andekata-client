import persistState from 'redux-localstorage'

const filterWhitelist = fields => key => fields.includes(key)
// const filterBlacklist = fields => key => !fields.includes(key)

const createSlicer = predicate => (fields, state) => Object.keys(state)
  .filter(predicate(fields))
  .reduce((sliced, key) => ({ ...sliced, [key]: state[key] }), {})

const includeFields = createSlicer(filterWhitelist)
// const excludeFields = createSlicer(filterBlacklist)

// determine which part of the state should be sync'ed with localstorage
const slicer = paths => state => {
  // const slicedState = excludeFields(['form'], state)
  //
  // return {
  //   ...slicedState,
  //   auth: includeFields(['isLoggedIn', 'token'], slicedState.auth)
  // }

  // only store auth state to localstorage
  const sliced = includeFields(['auth'], state)
  return { auth: includeFields(['isLoggedIn', 'token', 'user', 'privileges'], sliced.auth) }
}

export default persistState(null, { slicer })
