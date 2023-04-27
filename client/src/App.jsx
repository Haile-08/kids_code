import AppProvider from './Provider/app'
import RoutesPath from './routes/route'
import './style/App.css'

function App() {
  return (
    <AppProvider>
      <RoutesPath/>
    </AppProvider>
  )
}

export default App
