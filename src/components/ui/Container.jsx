import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import { useWindowSize } from '../../hooks/useSize'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import Button from './Button'
import ExportExcel from './ExportExcel'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFResume from '../pdf/PDFResume'
import PDFEspecific from '../pdf/PDFEspecific'

const Container = ({ children, title = 'Titulo', showMenu = false, toggleModal = () => { } }) => {
   const { user, pdfData } = useContext(AppContext)
   const { toggleSidebar } = useContext(UiContext)
   const { width } = useWindowSize()

   const handleDownloadPDF = () => {

   }

   return (
      <>
         <div className="h-screen w-full bg-white p-6">
            <header className="bg-gray-100 py-2 px-5 rounded-md flex items-center justify-between border border-gray-200 shadow-md">
               <Button
                  className="rounded-lg hover:bg-gray-300"
                  type="icon"
                  onClick={toggleSidebar} />
               <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold text-center">{title}</h1>
                  {
                     showMenu &&
                     <Menu
                        className='py-1.5 px-3 text-white bg-blue-400 hover:bg-blue-500 rounded-full flex gap-2 items-center'
                        menuButton='Exportar'
                        icon={<i className="fas fa-file-export"></i>}
                     >
                        <MenuContent>
                           <ExportExcel EnterpriseName='AGRICOLA PICOLTUE LIMITADA' />
                           <hr />
                           <PDFDownloadLink
                              fileName='resumen cosechas'
                              document={<PDFResume data={pdfData.resume} />} >
                              <Button className='hover:bg-gray-200' type='iconText' name='Resumen' icon='fas fa-file-pdf text-red-400' />
                           </PDFDownloadLink>
                           <hr />
                           <PDFDownloadLink
                              fileName='especifico cosechas'
                              document={<PDFEspecific data={pdfData.especific} />} >
                              <Button className='hover:bg-gray-200' type='iconText' name='Especifico' icon='fas fa-file-pdf text-red-400' />
                           </PDFDownloadLink>
                        </MenuContent>
                     </Menu>
                  }
                  {!showMenu &&
                     <Button
                        className={`${width < 768 ? 'rounded-md' : 'rounded-full'} bg-green-400 hover:bg-green-500 text-white`}
                        type={width < 768 ? 'icon' : 'iconText'}
                        icon="fas fa-user-plus"
                        iconFirst
                        name="Nuevo"
                        tooltip="crear nuevo usuario"
                        onClick={toggleModal} />
                  }
               </div>

               <h1 className="text-base font-semibold text-center capitalize hidden md:inline">{user.usuario.nom_user}</h1>
            </header>
            {children}
         </div >
      </>
   )
}

export default Container
