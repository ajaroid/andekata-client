// const delay = ms => new Promise((res, rej) => setTimeout(res, ms))
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})

export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR
})
