import moment from 'moment'
import { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from '../helpers/alerts'
import { fetchToken, fetchUnToken } from '../helpers/fetch'
import { UiContext } from './UiContext'

export const AppContext = createContext()

const token = window.localStorage.getItem('token-picoltue')

const isToken = token ? { ok: true, usuario: [] } : { ok: false }

const initUser = isToken

const AppProvider = ({ children }) => {
   const { toggleLoading } = useContext(UiContext)
   const [user, setUser] = useState(initUser)
   const [cosechas, setCosechas] = useState({})
   const [inscripciones, setInscripciones] = useState({})
   const [usersData, setUsersData] = useState({})
   const [filtros, setFiltros] = useState({})
   const [params, setParams] = useState({})
   const [resume, setResume] = useState({})

   const login = async (data) => {
      const resp = await fetchUnToken('auth/login', data, 'POST')
      const body = await resp.json()
      const { ok, usuario, token, msg, is_new } = body

      toggleLoading(false)

      if (ok) {
         window.localStorage.setItem('token-picoltue', token)
         setUser({ ok, usuario })
         return { ok, usuario }
      }
      else {
         if (!is_new) {
            Alert({
               icon: 'warn',
               title: 'Atencion',
               content: msg,
               showCancelButton: false
            })
         }
         return { ok, msg, isNew: is_new }
      }
   }

   const validateSession = async () => {
      const resp = await fetchToken('auth/renew')
      const body = await resp.json()
      const { ok, usuario, token } = body

      if (ok) {
         window.localStorage.setItem('token-picoltue', token)
         setUser({ ok, usuario })
      }
      else {
         Alert({
            title: 'Atencion',
            content: 'Su sesion ha expirado',
            showCancelButton: false
         })
      }
   }

   const logout = () => {
      window.localStorage.removeItem('token-picoltue')
      setUser({ ok: false })
   }

   const resetPassword = async (data) => {
      const resp = await fetchToken('auth/recuperar-pass', data, 'POST')
      const body = await resp.json()
      const { ok, response } = body

      if (ok) {
         Alert({
            title: 'Atencion',
            content: response,
            showCancelButton: false
         })
      }
      else {
         Alert({
            title: 'Atencion',
            icon: 'warn',
            content: response,
            showCancelButton: false
         })
      }
   }

   const getHarvest = async (data = {}) => {
      const resp = await fetchToken('lecturas', data, 'POST')
      const body = await resp.json()

      toggleLoading(false)

      if (body.ok) {
         setParams({ ...data, offset: 0, limite: body.total_lecturas })
         setCosechas(body)
         getHarvestPDFResumeExport(data)
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

   const getHarvestExport = async () => {

      const resp = await fetchToken('lecturas', params, 'POST')
      const body = await resp.json()

      if (body.ok) {
         let data = []
         data = body.lecturas.map(l => {
            return {
               fundo: l.desc_item_negocio,
               cuartel: l.desc_cuartel,
               especie: l.desc_especie,
               rut_cosechero: l.rut_trabajador,
               nombre_cosechero: l.nombre_cosechero,
               cantidad: l.peso,
               unidad: l.desc_tipo_med,
               hora: moment(l.fecha_hora_lect).format('DD-MM-YYYY, HH:MM:ss'),
               equipo: l.id_dispo,
               usuario: l.rut_supervisor,
               idServ: l.id,
               idLocal: l.id_local
            }
         })
         return { ok: true, data }
      }
      else {
         console.log('error export excel data')
         return { ok: false, data: [] }
      }
   }

   const getHarvestPDFResumeExport = async (data) => {
      const resp = await fetchToken('lecturas/pdf-general', data, 'POST')
      const body = await resp.json()

      const { ok, response } = body

      if (ok) {
         setResume(response)
         return response
      }
      else {
         console.log('error export pdf data')
         return {}
      }
   }

   const getSheets = async (data) => {
      const resp = await fetchToken('fichas', data, 'POST')
      const body = await resp.json()

      toggleLoading(false)

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

   const getUsers = async (data) => {
      const resp = await fetchToken('usuarios', data, 'POST')
      const body = await resp.json()

      toggleLoading(false)

      if (body.ok) {
         setUsersData(body)
      }
      else {
         console.log(body)
         Alert({
            title: 'Error',
            content: 'Error al obtener usuarios',
            showCancelButton: false,
            timer: 6000
         })
      }
   }

   const insertUser = async ({ payload, filters }) => {
      const resp = await fetchToken('usuarios/insert', payload, 'POST')
      const body = await resp.json()
      const { ok, response } = body

      toggleLoading(false)

      if (ok) {
         Alert({
            title: 'Atencion',
            content: response ? response : 'Usuario creado con exito',
            showCancelButton: false,
            timer: 6000
         })
         getUsers(filters)
         return true
      }
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: response ? response : 'Error al crear usuario',
            showCancelButton: false
         })
         toggleLoading(false)
         return false
      }
   }

   const updateUser = async ({ payload, filters }) => {
      const resp = await fetchToken('usuarios/update', payload, 'POST')
      const body = await resp.json()
      const { ok, response } = body

      toggleLoading(false)

      if (ok) {
         Alert({
            title: 'Atencion',
            content: response ? response : 'Usuario actualizado con exito',
            showCancelButton: false,
            timer: 6000
         })
         getUsers(filters)
         return true
      }
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: response ? response : 'Error al actualizar usuario',
            showCancelButton: false
         })
         toggleLoading(false)
         return false
      }
   }

   const resetUserPassword = async ({ payload }) => {
      const resp = await fetchToken('usuarios/reset-pass', payload, 'POST')
      const body = await resp.json()
      const { ok, response } = body

      toggleLoading(false)

      if (ok) {
         Alert({
            title: 'Atencion',
            content: response ? response : 'Contraseña reseteada con exito',
            showCancelButton: false,
            timer: 4000
         })
         return true
      }
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: response ? response : 'Error al resetear contraseña, vuelva a intentarlo, si el error persiste comuniquese con un administrador',
            showCancelButton: false
         })
         return false
      }
   }

   const firstLogin = async ({ payload }) => {
      const resp = await fetchToken('auth/primer-ingreso', payload, 'POST')
      const body = await resp.json()
      const { ok, msg } = body

      toggleLoading(false)

      if (ok) {
         Alert({
            title: 'Atencion',
            content: msg ? msg : 'Contraseña reseteada con exito',
            showCancelButton: false,
            timer: 6000
         })
         return true
      }
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: msg ? msg : 'Error al resetear contraseña, vuelva a intentarlo, si el error persiste comuniquese con un administrador',
            showCancelButton: false
         })
         return false
      }
   }

   const insertSheet = async ({ payload, filters }) => {
      const resp = await fetchToken('fichas/insert', payload, 'POST')
      const body = await resp.json()
      const { ok, response } = body

      if (ok) {
         getSheets(filters)
         return true
      }
      else {
         Alert({
            title: 'Error',
            content: response ? response : 'Error al crear ficha de inscripcion',
            showCancelButton: false
         })
         toggleLoading(false)
         return false
      }
   }

   const updateSheet = async ({ payload, filters }) => {
      const resp = await fetchToken('fichas/update', payload, 'POST')
      const body = await resp.json()
      const { ok, reponse } = body

      if (ok) {
         getSheets(filters)
         return true
      }
      else {
         Alert({
            title: 'Error',
            content: reponse ? reponse : 'Error al actualizar ficha',
            showCancelButton: false
         })
         toggleLoading(false)
         return false
      }
   }

   const getFilters = async () => {

      const filters = ['fundos', 'cuarteles', 'especies', 'comunas', 'ciudades']

      const data = []
      for (const f of filters) {
         const resp = await fetchToken(`filters/${f}`)
         const body = await resp.json()
         data.push({ [f]: body.response })
      }

      setFiltros({
         fundos: data[0].fundos.map(f => ({ value: f.id_item_negocio, label: f.desc_item_negocio })),
         cuarteles: data[1].cuarteles.map(c => ({ value: c.id_centro_costo, label: c.nombre })),
         especies: data[2].especies.map(e => ({ value: e.id_especie, label: e.desc_especie })),
         comunas: data[3].comunas.map(c => ({ value: c.id_comuna, label: c.nombre })),
         ciudades: data[4].ciudades.map(c => ({ value: c.id_ciudad, label: c.nombre, id_comuna: c.id_comuna })),
      })
   }

   useEffect(() => {
      const token = window.localStorage.getItem('token-picoltue')
      if (token) {
         getFilters()
      }
      // eslint-disable-next-line
   }, [user])

   return (
      <AppContext.Provider value={{
         login,
         logout,
         user,
         inscripciones,
         cosechas,
         insertSheet,
         updateSheet,
         filtros,
         getSheets,
         getHarvest,
         getHarvestExport,
         getUsers,
         usersData,
         updateUser,
         insertUser,
         resetUserPassword,
         validateSession,
         firstLogin,
         resetPassword,
         resume,
         getHarvestPDFResumeExport,
         params
      }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider
