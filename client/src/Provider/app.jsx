import React from 'react'
import { store } from '../stores/store'
import { Provider } from 'react-redux'

function AppProvider({children}) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default AppProvider