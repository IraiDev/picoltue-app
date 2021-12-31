import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import { useWindowSize } from '../../hooks/useSize'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import Button from './Button'
import ExportExcel from './ExportExcel'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/img/logo150x150.png'
import moment from 'moment'

const Container = ({ children, title = 'Titulo', showMenu = false, toggleModal = () => { } }) => {
   const { user, getHarvestPDFEspecificExport } = useContext(AppContext)
   const { toggleSidebar } = useContext(UiContext)
   const { width } = useWindowSize()

   const handleDownloadPDF = async () => {

      const numberFormat = ({ num, decimals = 2, region = 'cl-CL' }) => {
         const options = { minimumFractionDigits: decimals }
         const formatter = new Intl.NumberFormat(region, options)
         return formatter.format(num)
      }

      const resp = await getHarvestPDFEspecificExport()

      if (!resp.ok) return

      const { general, top_five, under_average } = resp.data
      const date = moment(new Date()).format('DD-MM-YYYY HH:mm:ss')

      let doc = new jsPDF()
      doc.addImage(logo, 'PNG', 10, 10, 20, 20)
      doc.setFontSize(24)
      doc.text(general.nombre_empresa, 10, 40)
      doc.setFontSize(16)
      doc.text(general.msg_filtro_fecha, 10, 50)
      doc.autoTable({
         theme: 'grid',
         headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            lineWidth: 0.1,
            halign: 'center'
         },
         columnStyles: {
            0: { halign: 'right' },
            1: { halign: 'left' },
            2: { halign: 'right' },
         },
         footStyles: {
            halign: 'right',
            valign: 'bottom',
            minCellHeight: 10,
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
         },
         startY: 60,
         head: [['#', 'Mejores Totales', 'KGS']],
         body: top_five.map((item, i) => [i + 1, item.nombre_cosechero, numberFormat({ num: item.peso })]),
         foot: [['', `Fecha y hora impresion: ${date}`, '']]
      })
      doc.save('resume.pdf')

   }

   return (
      <>
         <div className="h-screen w-full bg-white p-6 ri">
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
                           <Button
                              className='hover:bg-gray-200'
                              type='iconText'
                              name='Resumen'
                              icon='fas fa-file-pdf text-red-400'
                              onClick={handleDownloadPDF}
                           />
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
