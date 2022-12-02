import { useContext, useEffect, useRef, useState } from 'react'
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
import { Alert } from '../../helpers/alerts'
import { checkForms } from '../../helpers/helpers'
import moment from 'moment'
import { useToggle } from '../../hooks/useToggle'
import { AppContext } from '../../context/AppContext'
import TFooter from '../table/TFooter'
import { useDependSelect } from '../../hooks/useDependSelect'
import { UiContext } from '../../context/UiContext'
import NumberFormat from 'react-number-format'

const limite = [
   { value: 10, label: '10' },
   { value: 25, label: '25' },
   { value: 50, label: '50' },
   { value: 100, label: '100' },
]

const initForm = {
   rut: '',
   firstName: '',
   secondName: '',
   lastName: '',
   secondLastName: '',
   date: '',
   city: '',
   country: '',
   id: null,
}

const Inscription = () => {
   const { inscripciones, updateSheet, insertSheet, getSheets, filtros } = useContext(AppContext)
   const { toggleLoading } = useContext(UiContext)

   const [showModal, toggleModal] = useToggle(false)
   const [values, setValues] = useState(initForm)
   const [page, setPage] = useState(1)
   const [offSet, setOffSet] = useState(0)
   const [resetFilters, onReset] = useToggle(false)

   // destructuring
   const { rut, firstName, secondName, lastName, secondLastName, date, city, country, id } =
      values
   const { ciudades, comunas } = filtros
   // destructuring

   const rutRef = useRef(),
      nameRef = useRef()

   const [
      { filterRut, filterName, filterCountry, filterCity, filterLimit },
      onChangeValues,
      reset,
   ] = useForm({
      filterRut: '',
      filterName: '',
      filterLimit: 10,
      filterCountry: '',
      filterCity: '',
   })
   const cityTable = useDependSelect(filterCountry, ciudades)
   const cityForm = useDependSelect(country, ciudades)

   const getSheetsData = (offset = 0, page = 1) => {
      toggleLoading(true)
      setPage(page)
      getSheets({
         offset,
         limite: Number(filterLimit),
         rut_trabajador: filterRut,
         nombre_trabajador: filterName,
         comuna: Number(filterCountry),
         ciudad: Number(filterCity),
      })
   }

   const handleCloseModal = () => {
      toggleModal()
      setValues(initForm)
   }

   const handleNewInscription = () => {
      const fieldValidations =
         rut.trim() === '' ||
         firstName.trim() === '' ||
         secondName.trim() === '' ||
         lastName.trim() === '' ||
         secondLastName.trim() === '' ||
         date.trim() === ''
      const selectValidation = country === '' || city === ''

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
            timer: 8000,
         })
         return
      }

      if (fs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(fc, fl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (sns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(snc, snl, 'segundo nombre'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (ls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(lc, ll, 'apellido paterno'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (sls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(slc, sll, 'apellido materno'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (selectValidation || fieldValidations) {
         Alert({
            title: 'Atencion',
            icon: 'warn',
            content: `
            <p class="block">Todos los campos son obligatorios, por favor llene todos los campos.</p>
             <strong class="mt-4 block">
               Nombre, segundo nombre, apellido paterno, apellido materno, 
               rut, fecha de nacimiento, ciudad y comuna.
             </strong>`,
            showCancelButton: false,
         })
         return
      }

      if (!checkRut(rut)) {
         Alert({
            icon: 'warn',
            title: 'Rut invalido',
            content: 'El rut ingresado no es valido, por favor verifiquelo y vuelva a intentarlo',
            showCancelButton: false,
            timer: 6000,
         })
         return
      }

      const payload = {
         rut: prettifyRut(rut),
         nombre: firstName,
         segundo_nombre: secondName,
         apellido_p: lastName,
         apellido_m: secondLastName,
         ciudad: city,
         comuna: country,
         fecha_ncto: date,
      }

      const filters = {
         offset: offSet,
         limite: Number(filterLimit),
         rut_trabajador: filterRut,
         nombre_trabajador: filterName,
         comuna: Number(filterCountry),
         ciudad: Number(filterCity),
      }

      toggleLoading(true)
      insertSheet({ payload, filters })
      toggleModal()
      setValues(initForm)
   }

   const handleUpdateInscription = () => {
      const fieldValidations =
         rut.trim() === '' ||
         firstName.trim() === '' ||
         secondName.trim() === '' ||
         lastName.trim() === '' ||
         secondLastName.trim() === '' ||
         date.trim() === ''
      const selectValidation = country === '' || city === ''

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
            timer: 8000,
         })
         return
      }

      if (fs) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(fc, fl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (sns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(snc, snl, 'segundo nombre'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (ls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(lc, ll, 'apellido paterno'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (sls) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(slc, sll, 'apellido materno'),
            showCancelButton: false,
            timer: 8000,
         })
         return
      }

      if (selectValidation || fieldValidations) {
         Alert({
            title: 'Atencion',
            icon: 'warn',
            content: `
            <p class="block">Todos los campos son obligatorios, por favor llene todos los campos.</p>
             <strong class="mt-4 block">
               Nombre, segundo nombre, apellido paterno, apellido materno, 
               rut, fecha de nacimiento, ciudad y comuna.
             </strong>`,
            showCancelButton: false,
         })
         return
      }

      if (!checkRut(rut)) {
         Alert({
            icon: 'warn',
            title: 'Rut invalido',
            content: 'El rut ingresado no es valido, por favor verifiquelo y vuelva a intentarlo',
            showCancelButton: false,
            timer: 6000,
         })
         return
      }

      const payload = {
         id_ficha: id,
         rut: prettifyRut(rut),
         nombre: firstName,
         segundo_nombre: secondName,
         apellido_p: lastName,
         apellido_m: secondLastName,
         ciudad: city,
         comuna: country,
         fecha_ncto: date,
      }

      const filters = {
         offset: offSet,
         limite: Number(filterLimit),
         rut_trabajador: filterRut,
         nombre_trabajador: filterName,
         comuna: Number(filterCountry),
         ciudad: Number(filterCity),
      }

      toggleLoading(true)
      updateSheet({ payload, filters })
      toggleModal()
      setValues(initForm)
   }

   const updateAction = (id) => {
      const i = inscripciones.fichas.find((f) => f.id_ficha_inscripcion === id)
      const {
         nombre,
         segundo_nombre,
         rut_trabajador,
         apellido_materno,
         apellido_paterno,
         fecha_nacto,
         id_ciudad,
         id_comuna,
      } = i

      let co = { value: '' },
         ci = { value: '' }

      if (id_comuna || id_ciudad) {
         co = comunas.find((c) => Number(c.value) === id_comuna)
         ci = ciudades.find((c) => Number(c.value) === id_ciudad)
      }
      setValues({
         rut: rut_trabajador,
         firstName: nombre,
         secondName: segundo_nombre,
         lastName: apellido_paterno,
         secondLastName: apellido_materno,
         date: moment(new Date(fecha_nacto)).format('yyyy-MM-DD'),
         city: ci.value,
         country: co.value,
         id,
      })

      toggleModal()
   }

   const handleOnChangePage = (e, value) => {
      let offset = ((value - 1) * Number(filterLimit)) % inscripciones.fichas_pagina
      setOffSet(offset)
      setPage(value)
      getSheetsData(offset, value)
   }

   const onSearch = (e) => {
      nameRef.current.blur()
      rutRef.current.blur()
      e.preventDefault()
      getSheetsData()
   }

   const handleReset = () => {
      reset()
      onReset()
   }

   useEffect(() => {
      getSheetsData()
      // eslint-disable-next-line
   }, [filterCity, filterCountry, filterLimit, resetFilters])

   return (
      <>
         <Container title="Fichas de Inscripciones" toggleModal={toggleModal}>
            <Table width="w-table_md">
               <THead>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <th className="px-3" colSpan={2}>
                        <button
                           className="capitalize rounded-full px-2 py-1.5 font-semibold text-white bg-blue-500 hover:bg-blue-400 transition duration-500 focus:outline-none"
                           onClick={handleReset}
                        >
                           reestablecer
                        </button>
                     </th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={rutRef}
                              className="p-1 w-full rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterRut"
                              value={filterRut}
                              placeholder="Rut..."
                              onChange={onChangeValues}
                              onFocus={(e) => {
                                 e.target.select()
                              }}
                           />
                           <button className="hidden" type="submit"></button>
                        </form>
                     </Th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={nameRef}
                              className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterName"
                              value={filterName}
                              placeholder="Nombre..."
                              onChange={onChangeValues}
                              onFocus={(e) => {
                                 e.target.select()
                              }}
                           />
                           <button className="hidden" type="submit"></button>
                        </form>
                     </Th>
                     <Th>
                        <Select
                           options={comunas}
                           value={filterCountry}
                           name="filterCountry"
                           onChange={onChangeValues}
                        />
                     </Th>
                     <Th>
                        <Select
                           options={cityTable}
                           value={filterCity}
                           name="filterCity"
                           onChange={onChangeValues}
                        />
                     </Th>
                     <Th>
                        <div className="flex items-center gap-2 rounded-md bg-gray-300 p-1 mr-1 w-max">
                           <label>Limite</label>
                           <Select
                              options={limite}
                              value={filterLimit}
                              name="filterLimit"
                              onChange={onChangeValues}
                              showAllOption={filterName === '' && filterRut === ''}
                           />
                        </div>
                     </Th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                     <Th>#</Th>
                     <Th>ID</Th>
                     <Th>RUT</Th>
                     <Th>Nombre</Th>
                     <Th>comuna</Th>
                     <Th>ciudad</Th>
                     <Th>Acciones</Th>
                  </tr>
               </THead>
               <TBody>
                  {Object.keys(inscripciones).length > 0 &&
                     inscripciones.fichas.map((f, i) => (
                        <tr
                           key={f.id_ficha_inscripcion}
                           className="text-gray-700 text-sm border-b"
                        >
                           <Td borderLeft={false}>
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                                 {i + 1}
                              </span>
                           </Td>
                           <Td>{f.id_ficha_inscripcion}</Td>
                           <Td className="w-max">{f.rut_trabajador}</Td>
                           <Td className="w-max">
                              {f.nombre} {f.segundo_nombre} {f.apellido_paterno}{' '}
                              {f.apellido_materno}
                           </Td>
                           <Td className="w-max">{f.comuna ? f.comuna.nombre : '--'}</Td>
                           <Td className="w-max">{f.ciudad ? f.ciudad.nombre : '--'}</Td>
                           <Td>
                              <div className="flex items-center justify-center">
                                 {/* <Button
                                    className="text-red-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-trash-alt"
                                 /> */}
                                 <Button
                                    className="text-blue-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-pen"
                                    onClick={() => updateAction(f.id_ficha_inscripcion)}
                                 />
                              </div>
                           </Td>
                        </tr>
                     ))}
               </TBody>
               <TFooter>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <td colSpan={8} className="p-2 w-full">
                        <div className="flex justify-around items-center px-4">
                           <label>
                              Total inscripciones:
                              <NumberFormat
                                 className="ml-1"
                                 value={inscripciones.fichas_totales}
                                 displayType={'text'}
                                 decimalSeparator=","
                                 thousandSeparator="."
                              />
                           </label>
                           {filterLimit !== '' ? (
                              <Pager
                                 page={page}
                                 onPageChange={handleOnChangePage}
                                 pageRangeDisplayed={5}
                                 limit={filterLimit}
                                 totals={inscripciones.fichas_pagina}
                              />
                           ) : (
                              <div></div>
                           )}
                           <label>
                              Total según filtro :
                              <NumberFormat
                                 className="ml-1"
                                 value={inscripciones.fichas_pagina}
                                 displayType={'text'}
                                 decimalSeparator=","
                                 thousandSeparator="."
                              />
                           </label>
                        </div>
                     </td>
                  </tr>
               </TFooter>
            </Table>
         </Container>

         <Modal showModal={showModal} onClose={handleCloseModal}>
            <header className="flex justify-between items-center mt-2 mb-5">
               <h1 className="uppercase font-semibold text-lg">
                  {id ? 'MOdificar FICHA DE INSCRIPCION' : 'NUEVA FICHA DE INSCRIPCION'}
               </h1>
               {id && (
                  <h5 className="capitalize bg-gray-100 rounded-full py-1 px-2 font-semibold text-gray-500">
                     ID ficha: {id}
                  </h5>
               )}
            </header>
            <section className="grid gap-4">
               <HrLabel name="datos ficha" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="Primer nombre"
                     name="firstName"
                     value={firstName}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           firstName: e.target.value,
                        })
                     }
                  />
                  <Input
                     field="segundo nombre"
                     name="secondName"
                     value={secondName}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           secondName: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="apellido paterno"
                     name="lastName"
                     value={lastName}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           lastName: e.target.value,
                        })
                     }
                  />
                  <Input
                     field="apellido materno"
                     name="secondLastName"
                     value={secondLastName}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           secondLastName: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                     field="RUT"
                     name="rut"
                     placeholder="ej: 12.345.678-9"
                     value={prettifyRut(rut)}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           rut: e.target.value,
                        })
                     }
                  />
                  <Input
                     type="date"
                     field="Fecha de nacimiento"
                     name="date"
                     value={date}
                     onChange={(e) =>
                        setValues({
                           ...values,
                           date: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <section className="flex items-center gap-2">
                     <label className="px-2">Comuna:</label>
                     <Select
                        className="w-full p-2 bg-gray-100 rounded-md"
                        options={comunas}
                        value={country}
                        name="country"
                        onChange={(e) =>
                           setValues({
                              ...values,
                              country: e.target.value,
                           })
                        }
                     />
                  </section>
                  <section className="flex items-center gap-2">
                     <label className="px-2">Ciudad:</label>
                     <Select
                        className="w-full p-2 bg-gray-100 rounded-md"
                        options={cityForm}
                        value={city}
                        name="city"
                        onChange={(e) =>
                           setValues({
                              ...values,
                              city: e.target.value,
                           })
                        }
                     />
                  </section>
               </div>
               <div></div>
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
                  name={id ? 'modificar' : 'guardar'}
                  shadow
                  onClick={id ? handleUpdateInscription : handleNewInscription}
               />
            </footer>
         </Modal>
      </>
   )
}

export default Inscription
