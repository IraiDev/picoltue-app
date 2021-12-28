import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import { useWindowSize } from '../../hooks/useSize'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import Button from './Button'
import ExportExcel from './ExportExcel'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFResume from '../pdf/PDFResume'

const Container = ({ children, title = 'Titulo', showMenu = false, toggleModal = () => { } }) => {
   const { user, getHarvestPDFResumeExport, params } = useContext(AppContext)
   const { toggleSidebar } = useContext(UiContext)
   const [data, setData] = useState({})
   const { width } = useWindowSize()

   const getData = async () => {
      const resp = await getHarvestPDFResumeExport()
      console.log(resp)
      setData(resp)
   }

   useEffect(() => {
      getData()

      // eslint-disable-next-line
   }, [params])

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

                           {/* <ResumePDF /> */}
                           {/* <Link to='pdf' target='_blank' >pdf</Link> */}
                           <PDFDownloadLink
                              fileName='resumen lecturas'
                              document={<PDFResume data={data} />} >
                              <Button className='hover: text-red-400' name='pdf' />
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
