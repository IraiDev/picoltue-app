import { createContext, useEffect, useState } from 'react'
import { Alert } from '../helpers/alerts'
import { fetchToken, fetchUnToken } from '../helpers/fetch'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
   const [user, setUser] = useState({ ok: false })
   const [cosechas, setCosechas] = useState({})
   const [inscripciones, setInscripciones] = useState({})
   const [filtros, setFiltros] = useState({})

   const login = async (data) => {
      const resp = await fetchUnToken('auth/login', data, 'POST')
      const body = await resp.json()
      const { ok, usuario, token, msg } = body
      if (ok) {
         window.localStorage.setItem('token-picoltue', token)
         setUser({ ok, usuario })
      }
      else {
         Alert({
            icon: 'warn',
            title: 'Atencion',
            content: msg,
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const validateSeesion = async () => {
      const resp = await fetchToken('auth/renew')
      const body = await resp.json()
      const { ok, usuario, token } = body
      // console.log('user: ', body)
      if (ok) {
         window.localStorage.setItem('token-picoltue', token)
         setUser({ ok, usuario })
      }
      else {
         Alert({
            title: 'Atencion',
            content: 'Su sesion ha expirado',
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const logout = () => {
      window.localStorage.removeItem('token-picoltue')
      setUser({ ok: false })
   }

   const getHarvest = async (data = {}) => {
      const resp = await fetchToken('lecturas', data, 'POST')
      const body = await resp.json()
      // console.log('cosechas: ', body)
      if (body.ok) {
         setCosechas(body)
      }
      else {
         Alert({
            title: 'Error',
            content: 'Error al obtener cosechas, por favor recargue la pagina',
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const getSheets = async (data = {}) => {
      const resp = await fetchToken('fichas', data, 'POST')
      const body = await resp.json()
      console.log('fichas: ', body)
      if (body.ok) {
         setInscripciones(body)
      }
      else {
         Alert({
            title: 'Error',
            content: 'Error al obtener fichas de inscripcion, por favor recargue la pagina',
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const insertSheet = async ({ payload, filters }) => {
      const resp = await fetchToken('fichas/insert', payload, 'POST')
      const body = await resp.json()
      const { ok, response } = body
      console.log('fichas: ', body)
      if (ok) {
         getSheets()
      }
      else {
         Alert({
            title: 'Error',
            content: response,
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const updateSheet = async ({ payload, filters }) => {
      const resp = await fetchToken('fichas/update', payload, 'POST')
      const body = await resp.json()
      const { ok } = body
      console.log('fichas: ', body)
      if (ok) {
         getSheets()
      }
      else {
         Alert({
            title: 'Error',
            content: 'Error al actualizar la ficha de inscripcion, por favor vuelva a intentarlo, si el error persiste comuniquee con un administrador',
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const getFilters = async () => {

      const filters = ['fundos', 'cuarteles', 'especies', 'comunas', 'ciudades']

      filters.forEach(async (f) => {
         const resp = await fetchToken(`filters/${f}`)
         const body = await resp.json()
         // console.log(`${f}: `, body)
         if (body.ok) {
            setFiltros({ ...filtros, [f]: body.response })
         }
         else console.log('error al obtener filtros ', body)
      })

   }

   useEffect(() => {
      console.log('se lanzo el efecto')
      const token = window.localStorage.getItem('token-picoltue')
      if (token) {
         validateSeesion()
         getHarvest()
         getSheets()
         getFilters()
      }
   }, [])

   return (
      <AppContext.Provider value={{
         login, logout, user, cosechas, inscripciones, insertSheet, updateSheet, filtros, getSheets
      }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider
