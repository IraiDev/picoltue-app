import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from '../components/screens/Login'
import { DashRoutes } from './DashRoutes'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        } />

        <Route path="/*" element={
          <PrivateRoutes>
            <DashRoutes />
          </PrivateRoutes>} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
