import { useContext } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from '../components/screens/Login'
import Loading from '../components/ui/Loading'
import { UiContext } from '../context/UiContext'
import { DashRoutes } from './DashRoutes'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { routes } from '../types/types'

const { login } = routes

const AppRoutes = () => {
  const { ShowLoading } = useContext(UiContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={login} element={
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
      <Loading show={ShowLoading} />
    </>
  )
}

export default AppRoutes
