import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PrivateRoutes = ({ children }) => {

  const { user } = useContext(AppContext)
  const { pathname } = useLocation()

  window.localStorage.setItem('picoltue-lastpath', pathname)

  return user.ok ? children : <Navigate to='/login' />
}

export default PrivateRoutes
