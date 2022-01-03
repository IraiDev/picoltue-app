import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PublicRoutes = ({ children }) => {

  const { user } = useContext(AppContext)

  const lastPath = window.localStorage.getItem('picoltue-lastpath') || '/'

  return user.ok ? <Navigate to={lastPath} /> : children
}

export default PublicRoutes