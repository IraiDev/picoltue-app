import React, { useContext, useEffect, useRef, useState } from 'react'
import Table from '../table/Table'
import TBody from '../table/TBody'
import Td from '../table/Td'
import Th from '../table/Th'
import THead from '../table/THead'
import Button from '../ui/Button'
import Container from '../ui/Container'
import HrLabel from '../ui/HrLabel'
import Input from '../ui/Input'
import Modal from '../ui/Modal'
import Select from '../ui/Select'
import { checkRut, prettifyRut } from 'react-rut-formatter'
import { Alert } from '../../helpers/alerts'
import { checkForms } from '../../helpers/helpers'
import { useToggle } from '../../hooks/useToggle'
import TFooter from '../table/TFooter'
import Pager from '../ui/Pager'
import { AppContext } from '../../context/AppContext'
import { useForm } from '../../hooks/useForm'
import NumberFormat from 'react-number-format'
import { UiContext } from '../../context/UiContext'

const limite = [
   { value: 10, label: '10' },
   { value: 25, label: '25' },
   { value: 50, label: '50' },
   { value: 100, label: '100' }
]

const initForm = {
   rut: '',
   name: '',
   email: '',
   login: '',
   id: null
}

const UserManteiner = () => {

   const { getUsers, usersData, insertUser, updateUser, resetUserPassword } = useContext(AppContext)
   const { toggleLoading } = useContext(UiContext)
   const [showModal, toggleModal] = useToggle(false)
   const [page, setPage] = useState(1)
   const [offSet, setOffSet] = useState(0)
   const [values, setValues] = useState(initForm)
   const [resetFilters, onReset] = useToggle(false)
   const [{
      filterRut,
      filterName,
      filterLogin,
      filterLimit,
      filterEmail
   }, onChangeValues, reset] = useForm({
      filterRut: '',
      filterName: '',
      filterLogin: '',
      filterLimit: 10,
      filterEmail: ''
   })

   const rutRef = useRef(), nameRef = useRef(), emailRef = useRef(), loginRef = useRef()

   // destructuring
   const { rut, name, email, login, id } = values
   // destructuring

   const getUsersData = async (offset = 0, page = 1) => {
      toggleLoading(true)
      setPage(page)
      getUsers({
         offset,
         limit: Number(filterLimit),
         rut_user: filterRut,
         nom_user: filterName,
         login_user: filterLogin,
         correo_user: filterEmail,
      })
   }

   const handleOnChangePage = (e, value) => {
      let offset = ((value - 1) * Number(filterLimit)) % usersData.total_filtro
      setOffSet(offset)
      setPage(value)
      getUsersData(offset, value)
   }

   const handleCloseModal = () => {
      toggleModal()
      setValues(initForm)
   }

   const handleNewUser = async () => {

      const { state: rs, char: rc, list: rl } = checkForms(rut)
      const { state: ns, char: nc, list: nl } = checkForms(name)
      const { state: es, char: ec, list: el } = checkForms(email)
      const { state: ls, char: lc, list: ll } = checkForms(login)

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

      if (ns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(nc, nl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (es) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(ec, el, 'segundo nombre'),
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

      if (rut.trim() === '' || name.trim() === '' || email.trim() === '' || login.trim() === '') {
         Alert({
            title: 'Atencion',
            icon: 'warn',
            content: `
            <p class="block">Todos los campos son obligatorios, por favor llene todos los campos.</p>
             <strong class="mt-4 block">
               Nombre y apellido, rut, login, correo.
             </strong>`,
            showCancelButton: false
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

      toggleLoading(true)

      const payload = {
         rut_user: prettifyRut(rut),
         nom_user: name,
         login_user: login,
         correo_user: email,
      }

      const filters = {
         offset: offSet,
         limit: Number(filterLimit),
         rut_user: filterRut,
         nom_user: filterName,
         login_user: filterLogin,
         correo_user: filterEmail,
      }

      const ok = await insertUser({ payload, filters })
      ok && handleCloseModal()
   }

   const handleUpdateUser = async () => {

      const { state: rs, char: rc, list: rl } = checkForms(rut)
      const { state: ns, char: nc, list: nl } = checkForms(name)
      const { state: es, char: ec, list: el } = checkForms(email)
      const { state: ls, char: lc, list: ll } = checkForms(login)

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

      if (ns) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(nc, nl, 'primer nombre'),
            showCancelButton: false,
            timer: 8000
         })
         return
      }

      if (es) {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: contentFormat(ec, el, 'segundo nombre'),
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

      if (rut === '' || name === '' || email === '' || login === '') {
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

      toggleLoading(true)

      const payload = {
         id_user: id,
         rut_user: prettifyRut(rut),
         nom_user: name,
         login_user: login,
         correo_user: email,
      }

      const filters = {
         offset: offSet,
         limit: Number(filterLimit),
         rut_user: filterRut,
         nom_user: filterName,
         login_user: filterLogin,
         correo_user: filterEmail,
      }

      const ok = await updateUser({ payload, filters })
      ok && handleCloseModal()
   }

   const handleResetPass = (id) => {
      toggleLoading(true)
      const payload = { id_user: id }
      resetUserPassword({ payload })
   }

   const onSearch = (e) => {
      rutRef.current.blur()
      nameRef.current.blur()
      emailRef.current.blur()
      loginRef.current.blur()
      e.preventDefault()
      getUsersData()
   }

   const handleReset = () => {
      reset()
      onReset()
   }

   const openUpdateModal = (id) => {
      const u = usersData.usuarios.find(user => user.id_user === id)
      const { rut_user, nom_user, login_user, correo_user } = u
      setValues({
         rut: rut_user,
         name: nom_user,
         email: correo_user,
         login: login_user,
         id,
      })
      toggleModal()
   }

   useEffect(() => {
      getUsersData()
      // eslint-disable-next-line
   }, [filterLimit, resetFilters])

   return (
      <>
         <Container
            title="Usuarios del sistema"
            toggleModal={toggleModal}
         >
            <Table width='w-table_md'>
               <THead>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <Th>
                        <button
                           className='capitalize rounded-full px-2 py-1.5 font-semibold text-white bg-blue-500 hover:bg-blue-400 transition duration-500 focus:outline-none'
                           onClick={handleReset} >
                           reestablecer
                        </button>
                     </Th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={rutRef}
                              className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterRut"
                              value={prettifyRut(filterRut)}
                              placeholder='Rut...'
                              onChange={onChangeValues}
                              onFocus={e => {
                                 e.target.select()
                              }} />
                           <button className='hidden' type='submit'></button>
                        </form>
                     </Th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={nameRef}
                              className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterName"
                              value={filterName}
                              placeholder='Nombre...'
                              onChange={onChangeValues}
                              onFocus={e => {
                                 e.target.select()
                              }} />
                           <button className='hidden' type='submit'></button>
                        </form>
                     </Th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={loginRef}
                              className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterLogin"
                              value={filterLogin}
                              placeholder='Login...'
                              onChange={onChangeValues}
                              onFocus={e => {
                                 e.target.select()
                              }} />
                           <button className='hidden' type='submit'></button>
                        </form>
                     </Th>
                     <Th>
                        <form onSubmit={onSearch}>
                           <input
                              ref={emailRef}
                              className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                              type="text"
                              name="filterEmail"
                              value={filterEmail}
                              placeholder='Correo...'
                              onChange={onChangeValues}
                              onFocus={e => {
                                 e.target.select()
                              }} />
                           <button className='hidden' type='submit'></button>
                        </form>
                     </Th>
                     <Th>
                        <Select
                           options={limite}
                           value={filterLimit}
                           name='filterLimit'
                           onChange={onChangeValues}
                           showAllOption={filterLogin === '' && filterEmail === '' && filterName === '' && filterRut === ''}
                        />
                     </Th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                     <Th>#</Th>
                     <Th>RUT</Th>
                     <Th>Nombre</Th>
                     <Th>login</Th>
                     <Th>Correo</Th>
                     <Th>acciones</Th>
                  </tr>
               </THead>
               <TBody>
                  {
                     Object.keys(usersData).length > 0 &&
                     usersData.usuarios.map((us, i) => (
                        <tr
                           key={us.id_user}
                           className="text-gray-700 text-sm border-b"
                        >
                           <Td borderLeft={false}>
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                                 {i + 1}
                              </span>
                           </Td>
                           <Td className='w-max'>{us.rut_user}</Td>
                           <Td className='uppercase w-max'>{us.nom_user}</Td>
                           <Td className='w-max'>{us.login_user}</Td>
                           <Td className='w-max'>{us.correo_user}</Td>
                           <Td>
                              <div className="flex items-center justify-center">
                                 <Button
                                    className="text-blue-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-pen"
                                    onClick={() => openUpdateModal(us.id_user)} />
                                 <Button
                                    className="text-green-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-undo"
                                    onClick={() => handleResetPass(us.id_user)} />
                              </div>
                           </Td>
                        </tr>
                     ))
                  }
               </TBody>
               <TFooter>
                  <tr className='text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize'>
                     <td colSpan={8} className='p-2 w-full'>
                        <div className='flex justify-around items-center px-4'>
                           <label>Total inscripciones:
                              <NumberFormat
                                 className='ml-1'
                                 value={usersData.total_global}
                                 displayType={'text'}
                                 decimalSeparator=','
                                 thousandSeparator='.'
                              />
                           </label>
                           {
                              filterLimit !== '' ?
                                 <Pager
                                    page={page}
                                    onPageChange={handleOnChangePage}
                                    pageRangeDisplayed={5}
                                    limit={filterLimit}
                                    totals={usersData.total_filtro}
                                 />
                                 :
                                 <div></div>
                           }
                           <label>Total según filtro :
                              <NumberFormat
                                 className='ml-1'
                                 value={usersData.total_filtro}
                                 displayType={'text'}
                                 decimalSeparator=','
                                 thousandSeparator='.'
                              />
                           </label>
                        </div>
                     </td>
                  </tr>
               </TFooter>
            </Table>
         </Container>

         <Modal showModal={showModal} onClose={handleCloseModal}
            className="max-w-lg" padding="p-7" >
            <section className="grid gap-4">
               <h1 className="uppercase font-semibold text-lg">
                  {
                     id ? 'modificar usuario' : 'Nuevo usuario'
                  }
               </h1>
               <HrLabel name="datos usuario" />
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
                  field="Nombre completo (Nombre y Apellido)"
                  name="name"
                  value={name}
                  onChange={e => setValues({
                     ...values,
                     name: e.target.value
                  })} />
               <Input
                  field="correo"
                  name="email"
                  type="email"
                  placeholder="ej: ejemplo@ejemplo.com"
                  value={email}
                  onChange={e => setValues({
                     ...values,
                     email: e.target.value
                  })} />
               <Input
                  field="login"
                  name="login"
                  value={login}
                  onChange={e => setValues({
                     ...values,
                     login: e.target.value
                  })} />

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
                  onClick={id ? handleUpdateUser : handleNewUser}
               />
            </footer>
         </Modal>

      </>
   )
}

export default UserManteiner
