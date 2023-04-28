import React from 'react'
import { persistor,store } from '../stores/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

function AppProvider({children}) {
  return (
    <Provider store={store}><PersistGate loading={"loading"} persistor={persistor}>{children}</PersistGate></Provider>
  )
}

export default AppProvider