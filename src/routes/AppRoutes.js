import { useContext, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
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
  const { validateSession, getHarvestPDFResumeExport } = useContext(AppContext)

  useEffect(() => {
    const token = window.localStorage.getItem('token-picoltue')
    if (token) {
      validateSession()
      getHarvestPDFResumeExport()
    }
    // eslint-disable-next-line
  }, [])

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
