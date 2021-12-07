import { UiProvider } from './context/Ui'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <UiProvider>
      <AppRoutes />
    </UiProvider>
  )
}

export default App
