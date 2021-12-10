import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PublicRoutes = ({ children }) => {

  const { user } = useContext(AppContext)

  return user.ok ? <Navigate to='/' /> : children
}

export default PublicRoutes