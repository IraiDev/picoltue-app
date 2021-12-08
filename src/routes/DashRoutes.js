import { Routes, Route } from 'react-router-dom'
import Harvest from '../components/screens/Harvest'
import Inscription from '../components/screens/Inscription'
import UserManteiner from '../components/screens/UserManteiner'
import SideBar from '../components/ui/SideBar'

export const DashRoutes = () => {

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="cosechas" element={<Harvest />} />
        <Route path="personal" element={<Inscription />} />
        <Route path="mantenedor-usuario" element={<UserManteiner />} />
        <Route path="/" element={<Harvest />} />
      </Routes>
    </>
  )
}
