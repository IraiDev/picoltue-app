import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Alert } from '../../helpers/alerts'
import loginScreen from '../../assets/img/loginCherry.jpg'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'

export const Login = () => {
  const navigate = useNavigate()
  const [{ user, pass }, onChangeValues, reset] = useForm({ user: 'sacuna', pass: 'Thomas1994!' })
  const { login } = useContext(AppContext)
  const { toggleLoading } = useContext(UiContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    toggleLoading(true)
    await login({ user_name: user, user_pass: pass })
    navigate('/')
    reset()
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

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center relative">
      <div className="absolute top-0 right-0 left-0 bottom-0">
        <img className="w-full h-full object-cover" src={loginScreen} alt="login-screen" />
      </div>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-md shadow-2xl grid gap-3 z-50">
        <h1 className="text-xl font-semibold text-center">Iniciar sesion</h1>
        <Input
          field="Usuario"
          name="user"
          value={user}
          onChange={onChangeValues} />
        <Input
          field="contraseña"
          type="password"
          name="pass"
          value={pass}
          onChange={onChangeValues} />
        <label
          className="hover:text-blue-500 hover:underline capitalize mx-auto transition duration-300 cursor-pointer"
          title='Para recuperar contraseña debe escribir un su usuario en el campo "USUARIO"'
          onClick={handleRecoverPass} >
          recuperar contraseña
        </label>
        <Button type="submit" name="Entrar" shadow />
      </form>
    </div>
  )
}
