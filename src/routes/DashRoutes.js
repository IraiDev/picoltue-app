import { PDFViewer } from '@react-pdf/renderer'
import { Routes, Route } from 'react-router-dom'
import PDFResume from '../components/pdf/PDFResume'
import Harvest from '../components/screens/Harvest'
import Inscription from '../components/screens/Inscription'
import UserManteiner from '../components/screens/UserManteiner'
import SideBar from '../components/ui/SideBar'
import { routes } from '../types/types'

const { home, harvest, inscription, userManteiner, pdf } = routes

export const DashRoutes = () => {

  return (
    <>
      <SideBar />
      <Routes>
        <Route path={harvest} element={<Harvest />} />
        <Route path={inscription} element={<Inscription />} />
        <Route path={userManteiner} element={<UserManteiner />} />
        <Route path={home} element={<Harvest />} />
        <Route path={pdf} element={
          <PDFViewer>
            <PDFResume />
          </PDFViewer>
        } />
      </Routes>
    </>
  )
}
