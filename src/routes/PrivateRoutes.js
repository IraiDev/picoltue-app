import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PrivateRoutes = ({ children }) => {

  const { user } = useContext(AppContext)

  return user.ok ? children : <Navigate to='/login' />
}

export default PrivateRoutes
