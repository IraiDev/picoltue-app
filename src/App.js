import { useEffect } from 'react'
import AppProvider from './context/AppContext'
import UiProvider from './context/UiContext'
import AppRoutes from './routes/AppRoutes'

const App = () => {

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then(res => res.json())
      .then(console.log)
  }, [])

  return (
    <UiProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </UiProvider>
  )
}

export default App
