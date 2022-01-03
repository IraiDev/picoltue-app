import { useContext, useEffect } from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { Login } from '../components/screens/Login'
import Loading from '../components/ui/Loading'
import { UiContext } from '../context/UiContext'
import { DashRoutes } from './DashRoutes'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { routes } from '../types/types'
import { AppContext } from '../context/AppContext'

const { login } = routes

const AppRoutes = () => {
  const { ShowLoading } = useContext(UiContext)
  const { validateSession } = useContext(AppContext)

  useEffect(() => {
    const token = window.localStorage.getItem('token-picoltue')
    if (token) {
      validateSession()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <HashRouter>
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
      </HashRouter>
      <Loading show={ShowLoading} />
    </>
  )
}

export default AppRoutes
