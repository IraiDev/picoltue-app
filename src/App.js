import AppProvider from './context/AppContext'
import UiProvider from './context/UiContext'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <UiProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </UiProvider>
  )
}

export default App
