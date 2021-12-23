import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Alert } from '../../helpers/alerts'
import loginScreen from '../../assets/img/loginCherry.jpg'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import { useToggle } from '../../hooks/useToggle'
import Modal from '../ui/Modal'

export const Login = () => {
  const navigate = useNavigate()
  const { login, firstLogin } = useContext(AppContext)
  const { toggleLoading } = useContext(UiContext)
  const [showModalPin, toggleModalPin] = useToggle(false)
  const [showPass, setShowPass] = useState(false)
  const [{
    user,
    pass,
    newPass,
    repeatPass
  }, onChangeValues, reset] = useForm({
    user: 'sacuna',
    pass: 'Thomas1994!',
    newPass: '',
    repeatPass: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    toggleLoading(true)
    const resp = await login({ user_name: user, user_pass: pass })
    const { ok, isNew } = resp
    if (ok) { navigate('/') }
    else {
      const action = () => {
        toggleModalPin()
        setShowPass(false)
      }
      if (isNew) {
        Alert({
          title: 'Atención',
          content: 'Estimado usuario, dado que es su primer ingreso a la plataforma, es necesario modificar su contraseña para poder ingresar',
          action
        })
      }
    }
  }

  const handleRecoverPass = async () => {
    if (user.trim() === '') {
      Alert({
        title: 'Atencion',
        content: 'Por favor ingrese un usuario en el campo <strong class="capitalize">usuario</strong> para recuperar su contrasseña',
        showCancelButton: false,
        timer: 5000
      })
      return
    }
    reset()
  }

  const handleCloseModal = () => {
    toggleModalPin()
    setShowPass(false)
    reset()
  }

  const handleUpdatePass = () => {
    if (user.trim() === '' || pass.trim() === '' || newPass.trim() === '' || repeatPass.trim() === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'Por favor llene todos los campos para poder actualizar su contraseña',
        showCancelButton: false,
      })
      return
    }
    if (newPass !== repeatPass) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'Las contraseñas ingresadas no coinciden',
        showCancelButton: false,
      })
      return
    }

    if (newPass === pass) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'La nueva contraseña no puede ser igual a la actual',
        showCancelButton: false,
      })
      return
    }

    toggleLoading(true)

    const payload = {
      old_pass: pass,
      new_pass: newPass,
      new_pass_repeat: repeatPass,
      user_name: user
    }
    const ok = firstLogin({ payload })
    ok && handleCloseModal()
  }

  return (
    <>
      <div className='bg-gray-100 h-screen w-full flex items-center justify-center relative'>
        <div className='absolute top-0 right-0 left-0 bottom-0'>
          <img className='w-full h-full object-cover' src={loginScreen} alt='login-screen' />
        </div>
        <form onSubmit={onSubmit} className='bg-white p-6 rounded-md shadow-2xl grid gap-3 z-10'>
          <h1 className='text-xl font-semibold text-center'>Iniciar sesion</h1>
          <Input
            field='Usuario'
            name='user'
            value={user}
            onChange={onChangeValues} />
          <Input
            field='contraseña'
            type={showPass ? 'text' : 'password'}
            name='pass'
            value={pass}
            onChange={onChangeValues} />
          <label
            htmlFor='showPass'
            className='mx-auto transition duration-300 cursor-pointer'
          >
            <input
              className='mr-2 cursor-pointer'
              type='checkbox'
              id='showPass'
              checked={showPass}
              onChange={e => {
                setShowPass(e.target.checked)
              }}
            />
            Mostrar contraseña
          </label>
          <label
            className='hover:text-blue-500 hover:underline capitalize mx-auto transition duration-300 cursor-pointer'
            title='Para recuperar contraseña debe escribir un su usuario en el campo "USUARIO"'
            onClick={handleRecoverPass} >
            recuperar contraseña
          </label>
          <Button type='submit' name='Entrar' shadow />
        </form>
      </div>

      {/* modal change pin */}
      <Modal showModal={showModalPin} isBLur={false} onClose={toggleModalPin}
        className='max-w-sm' padding='p-6'
      >
        <div className='grid gap-4'>
          <h1 className='font-semibold text-lg'>Actualizar Contraseña</h1>
          <Input
            field='usuario'
            name='user'
            value={user}
            onChange={onChangeValues}
          />
          <Input
            type={showPass ? 'text' : 'password'}
            field='contraseña actual'
            name='pass'
            value={pass}
            onChange={onChangeValues}
          />
          <Input
            type={showPass ? 'text' : 'password'}
            field='nuevo contraseña'
            name='newPass'
            value={newPass}
            onChange={onChangeValues}
          />
          <Input
            type={showPass ? 'text' : 'password'}
            field='repetir nuevo contraseña'
            name='repeatPass'
            value={repeatPass}
            onChange={onChangeValues}
          />
          <label
            htmlFor='showPass'
            className='mx-auto transition duration-300 cursor-pointer'
          >
            <input
              className='mr-2 cursor-pointer'
              type='checkbox'
              id='showPass'
              checked={showPass}
              onChange={e => {
                setShowPass(e.target.checked)
              }}
            />
            Mostrar contraseña
          </label>
          <footer className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
            <Button
              className='rounded-full md:w-max w-full border-2 border-red-400 hover:bg-red-400 text-red-500 hover:text-white'
              name='cancelar'
              shadow
              onClick={handleCloseModal}
            />
            <Button
              className='rounded-full md:w-max w-full order-first md:order-last place-self-end bg-green-400 hover:bg-green-500 text-white'
              name='actualizar'
              shadow
              onClick={handleUpdatePass}
            />
          </footer>
        </div>
      </Modal>

    </>
  )
}
