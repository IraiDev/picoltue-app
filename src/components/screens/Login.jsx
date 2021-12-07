import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Input from '../ui/Input'

export const Login = () => {
  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center">
      <form className="bg-white p-6 rounded-md shadow-md grid gap-3">
        <h1 className="text-xl font-semibold text-center">Iniciar sesion</h1>
        <Input field="Usuario" />
        <Input field="contraseña" type="password" />
        <Button name="Entrar" shadow onClick={handleLogin} />
      </form>
    </div>
  )
}
