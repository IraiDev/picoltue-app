import React, { useEffect, useState } from 'react'
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

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

const arr = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
]

let initForm = {
   rut: '',
   name: '',
   email: '',
   login: ''
}

const UserManteiner = () => {
   const [state, setstate] = useState(2)
   const [showModal, toggleModal] = useToggle(false)
   const [isUpdate, setIsUpdate] = useState(false)
   const [values, setValues] = useState(initForm)
   const { rut, name, email, login } = values

   const handleCloseModal = () => {
      toggleModal()
      setValues(initForm)
   }

   const handleNewUser = () => {

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
   }

   const handleUpdateUser = () => {

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
   }

   useEffect(() => {
      if (isUpdate) {
         initForm = {
            rut: '1111-2',
            name: 'juan',
            email: 'a@a.cl',
            login: 'juanito'
         }
      }
      else {
         initForm = {
            rut: '',
            name: '',
            email: '',
            login: ''
         }
      }
      setValues(initForm)
   }, [isUpdate])

   return (
      <>
         <Container
            title="Usuarios del sistema"
            user="Ignacio arriagada"
            toggleModal={() => {
               setIsUpdate(false)
               toggleModal()
            }}
         >
            <Table>
               <THead>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th></Th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                     <Th>RUT</Th>
                     <Th>Nombre</Th>
                     <Th>login</Th>
                     <Th>acciones</Th>
                  </tr>
               </THead>
               <TBody>
                  {
                     arr.map((option, index) => (
                        <tr key={index} className="text-gray-700 text-sm border-b">
                           <Td borderLeft={false}>RUT</Td>
                           <Td>Nombre</Td>
                           <Td>Login</Td>
                           <Td>
                              <div className="flex items-center justify-center">
                                 <Button
                                    className="text-blue-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-pen"
                                    onClick={() => {
                                       setIsUpdate(true)
                                       toggleModal()
                                    }} />
                                 <Button
                                    className="text-green-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-undo" />
                              </div>
                           </Td>
                        </tr>
                     ))
                  }
               </TBody>
            </Table>
         </Container>

         <Modal showModal={showModal} onClose={handleCloseModal}
            className="max-w-lg" padding="p-7" >
            <section className="grid gap-4">
               <h1 className="uppercase font-semibold text-lg">
                  {
                     isUpdate ? 'modificar usuario' : 'Nuevo usuario'
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
                  field="Nombre completo (Nombres y Apellidos)"
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
                  name="Guardar"
                  shadow
                  onClick={isUpdate ? handleUpdateUser : handleNewUser}
               />
            </footer>
         </Modal>

      </>
   )
}

export default UserManteiner
