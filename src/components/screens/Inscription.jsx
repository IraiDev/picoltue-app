import { useContext, useState } from 'react'
import Td from '../table/Td'
import Th from '../table/Th'
import Button from '../ui/Button'
import Container from '../ui/Container'
import HrLabel from '../ui/HrLabel'
import Modal from '../ui/Modal'
import Pager from '../ui/Pager'
import Select from '../ui/Select'
import Input from '../ui/Input'
import Table from '../table/Table'
import THead from '../table/THead'
import TBody from '../table/TBody'
import { useForm } from '../../hooks/useForm'
import { checkRut, prettifyRut } from 'react-rut-formatter'
import { Alert } from '../../helpers/alerts';
import { checkForms } from '../../helpers/helpers'
import moment from 'moment'
import { useToggle } from '../../hooks/useToggle'
import { AppContext } from '../../context/AppContext'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

let initForm = {
   rut: '',
   firstName: '',
   secondName: '',
   lastName: '',
   secondLastName: '',
   date: ''
}

const Inscription = () => {
   const { inscripciones, updateSheet, insertSheet, getSheets } = useContext(AppContext)
   const [state, setstate] = useState(2)
   const [showModal, toggleModal] = useToggle(false)
   const [sheet, setSheet] = useState(null)
   const [page, setPage] = useState(0)
   const [{ filterRut, filterName }, onChangeValues] = useForm({ filterRut: '', filterName: '' })
   const [values, setValues] = useState(initForm)

   // destructuring
   const { rut, firstName, secondName, lastName, secondLastName, date } = values
   // destructuring

   const handleCloseModal = () => {
      toggleModal()
      setSheet(null)
      setValues(initForm)
   }

   const handleNewInscription = () => {

      const { state: rs, char: rc, list: rl } = checkForms(rut)
      const { state: fs, char: fc, list: fl } = checkForms(firstName)
      const { state: sns, char: snc, list: snl } = checkForms(secondName)
      const { state: ls, char: lc, list: ll } = checkForms(lastName)
      const { state: sls, char: slc, list: sll } = checkForms(secondLastName)

      const contentFormat = (char, list, field) => {
         return `Caracter <strong class="text-xl">${char}</strong> no permitido en campo <strong class="uppercase">${field}</strong> <br />
         Lista de caracteres no permitidos por el sistema: <br /> <strong>${list}</strong>`
      }

      if (rs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(rc, rl, 'Rut'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (fs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(fc, fl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (sns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(snc, snl, 'segundo nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (ls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(lc, ll, 'apellido paterno'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (sls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(slc, sll, 'apellido materno'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (rut === '' || firstName === '' || secondName === '' || lastName === '' || secondLastName === '' || date === '') {
         Alert({
            title: 'Atencion',
            content: 'Todos los campos son obligatorios, por favor llene todos los campos',
            showCancelButton: false,
            timer: 6000
         })
         return
      }

      if (!checkRut(rut)) {
         Alert({
            icon: 'warn',
            title: 'Rut invalido',
            content: 'El rut ingresado no es valido, por favor verifiquelo y vuelva a intentarlo',
            showCancelButton: false,
            timer: 6000
         })
         return
      }

      const payload = {
         rut: prettifyRut(rut),
         nombre: firstName,
         segundo_nombre: secondName,
         apellido_p: lastName,
         apellido_m: secondLastName,
      }

      insertSheet({ payload })
      toggleModal()

      console.log('insert data', payload)
   }

   const handleUpdateInscription = () => {

      const { state: rs, char: rc, list: rl } = checkForms(rut)
      const { state: fs, char: fc, list: fl } = checkForms(firstName)
      const { state: sns, char: snc, list: snl } = checkForms(secondName)
      const { state: ls, char: lc, list: ll } = checkForms(lastName)
      const { state: sls, char: slc, list: sll } = checkForms(secondLastName)

      const contentFormat = (char, list, field) => {
         return `Caracter <strong class="text-xl">${char}</strong> no permitido en campo <strong class="uppercase">${field}</strong> <br />
         Lista de caracteres no permitidos por el sistema: <br /> <strong>${list}</strong>`
      }

      if (rs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(rc, rl, 'Rut'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (fs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(fc, fl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (sns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(snc, snl, 'segundo nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (ls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(lc, ll, 'apellido paterno'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (sls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(slc, sll, 'apellido materno'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (rut === '' || firstName === '' || secondName === '' || lastName === '' || secondLastName === '' || date === '') {
         Alert({
            title: 'Atencion',
            content: 'Todos los campos son obligatorios, por favor llene todos los campos',
            showCancelButton: false,
            timer: 6000
         })
         return
      }

      if (!checkRut(rut)) {
         Alert({
            icon: 'warn',
            title: 'Rut invalido',
            content: 'El rut ingresado no es valido, por favor verifiquelo y vuelva a intentarlo',
            showCancelButton: false,
            timer: 6000
         })
         return
      }

      const payload = {
         id_ficha: sheet.id_ficha_inscripcion,
         rut,
         nombre: firstName,
         segundo_nombre: secondName,
         apellido_p: lastName,
         apellido_m: secondLastName,
      }

      updateSheet({ payload })
      toggleModal()

      console.log('update data', payload)
   }

   const updateAction = (id) => {
      const i = inscripciones.fichas.find(f => f.id_ficha_inscripcion === id)
      const {
         nombre,
         segundo_nombre,
         rut_trabajador,
         apellido_materno,
         apellido_paterno,
         fecha_nacto
      } = i

      setValues({
         rut: rut_trabajador,
         firstName: nombre,
         secondName: segundo_nombre,
         lastName: apellido_paterno,
         secondLastName: apellido_materno,
         date: moment(new Date(fecha_nacto)).format('yyyy-MM-DD')
      })
      setSheet(i)
      toggleModal()
   }

   const handleLastPage = () => {
      const offset = inscripciones.fichas_totales - inscripciones.fichas_pagina
      getSheets({ offset })
   }

   const handleNextPage = () => {
      let offset
      if (page + inscripciones.fichas_pagina > 0) {

         offset = page + inscripciones.fichas_pagina
      } else {
         offset = inscripciones.fichas_totales
         return
      }
      console.log(offset)
      setPage(offset)
      getSheets({ offset })
   }

   const handlePrevPage = () => {
      let offset
      if (page - inscripciones.fichas_pagina <= 0) {

         offset = page - inscripciones.fichas_pagina
      } else {
         offset = 0
         return
      }
      setPage(offset)
      getSheets({ offset })
   }

   return (
      <>
         <Container
            title="Fichas de Inscripciones"
            toggleModal={toggleModal} >
            <Table>
               <THead>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <Th></Th>
                     <Th></Th>
                     <Th>
                        <input
                           className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                           type="text"
                           name="filterRut"
                           value={filterRut}
                           onChange={onChangeValues} />
                     </Th>
                     <Th>
                        <input
                           className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                           type="text"
                           name="filterName"
                           value={filterName}
                           onChange={onChangeValues} />
                     </Th>
                     <Th></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th></Th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                     <Th>#</Th>
                     <Th>ID</Th>
                     <Th>RUT</Th>
                     <Th>Nombre</Th>
                     <Th>telefono</Th>
                     <Th>comuna</Th>
                     <Th>ciudad</Th>
                     <Th>Acciones</Th>
                  </tr>
               </THead>
               <TBody>
                  {
                     Object.keys(inscripciones).length > 0 &&
                     inscripciones.fichas.map((f, i) => (
                        <tr key={f.id_ficha_inscripcion} className="text-gray-700 text-sm border-b">
                           <Td borderLeft={false}>
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                                 {i + 1}
                              </span>
                           </Td>
                           <Td>{f.id_ficha_inscripcion}</Td>
                           <Td>{f.rut_trabajador}</Td>
                           <Td>{f.nombre} {f.segundo_nombre} {f.apellido_paterno} {f.apellido_materno}</Td>
                           <Td>telefono</Td>
                           <Td>{f.comuna ? f.comuna.nombre : '--'}</Td>
                           <Td>{f.ciudad ? f.ciudad.nombre : '--'}</Td>
                           <Td>
                              <div className="flex items-center justify-center">
                                 <Button
                                    className="text-red-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-trash-alt" />
                                 <Button
                                    className="text-blue-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-pen"
                                    onClick={() => updateAction(f.id_ficha_inscripcion)} />
                              </div>
                           </Td>
                        </tr>
                     ))
                  }
               </TBody>
            </Table>
            <footer className='grid grid-cols-1 md:grid-cols-2 mx-auto text-center gap-10 mt-4'>
               <label>Total global de inscripciones: {inscripciones.fichas_totales}</label>
               <label>Total de inscripciones según filtro : {inscripciones.fichas_totales}</label>
            </footer>
            <Pager
               page={inscripciones.fichas_totales}
               nextPage={handleNextPage}
               lastPage={handleLastPage}
               prevPage={handlePrevPage} />
         </Container>



         <Modal showModal={showModal} onClose={handleCloseModal}>
            <header className='flex justify-between items-center mt-2 mb-5'>
               <h1 className="uppercase font-semibold text-lg">
                  {sheet ? 'MOdificar FICHA DE INSCRIPCION' : 'NUEVA FICHA DE INSCRIPCION'}
               </h1>
               {
                  sheet &&
                  <h5 className='capitalize bg-gray-100 rounded-full py-1 px-2 font-semibold text-gray-500'>
                     ID ficha: {sheet.id_ficha_inscripcion}
                  </h5>
               }
            </header>
            <section className="grid gap-4">
               <HrLabel name="datos ficha" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="Primer nombre"
                     name="firstName"
                     value={firstName}
                     onChange={e => setValues({
                        ...values,
                        firstName: e.target.value
                     })} />
                  <Input
                     field="segundo nombre"
                     name="secondName"
                     value={secondName}
                     onChange={e => setValues({
                        ...values,
                        secondName: e.target.value
                     })} />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="apellido paterno"
                     name="lastName"
                     value={lastName}
                     onChange={e => setValues({
                        ...values,
                        lastName: e.target.value
                     })} />
                  <Input
                     field="apellido materno"
                     name="secondLastName"
                     value={secondLastName}
                     onChange={e => setValues({
                        ...values,
                        secondLastName: e.target.value
                     })} />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="RUT"
                     name="rut"
                     placeholder="ej: 12.345.678-9"
                     value={prettifyRut(rut)}
                     onChange={e => setValues({
                        ...values,
                        rut: e.target.value
                     })} />
                  <Input
                     type="date"
                     field="Fecha de nacimiento"
                     name="date"
                     value={date}
                     onChange={e => setValues({
                        ...values,
                        date: e.target.value
                     })} />
               </div>
               <div>
                  {/* <div className="flex items-center gap-4 w-1/2 pr-2">
                  <label className="capitalize text-xs w-24">nacionalidad:</label>
                  <Select className="p-2 bg-gray-100 rounded-md w-full" />
               </div>
               <HrLabel name="datos de postulacion" />
               <div className="grid grid-cols-2 gap-4">
                  <Input field="Dirección" />
                  <Input field="telefono" />
               </div>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">Comuna:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">ciudad:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sexo:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">estado civil:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sistema de salud:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sistema previsional:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <div className="flex items-center gap-4 w-1/2 pr-2">
                  <label className="capitalize text-xs w-24">Cargo Postulación:</label>
                  <Select className="p-2 bg-gray-100 rounded-md w-full" />
               </div> */}
               </div>
            </section>
            <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
               <Button
                  className="rounded-full md:w-max w-full border-2 border-red-400 hover:bg-red-400 text-red-500 hover:text-white"
                  name="cancelar"
                  shadow
                  onClick={handleCloseModal}
               />
               <Button
                  className="rounded-full md:w-max w-full order-first md:order-last place-self-end bg-green-400 hover:bg-green-500 text-white"
                  name={sheet ? 'modificar' : 'guardar'}
                  shadow
                  onClick={sheet ? handleUpdateInscription : handleNewInscription}
               />
            </footer>
         </Modal>

      </>
   )
}

export default Inscription
