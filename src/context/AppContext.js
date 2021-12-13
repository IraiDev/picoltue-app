import moment from 'moment'
import { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from '../helpers/alerts'
import { fetchToken, fetchUnToken } from '../helpers/fetch'
import { UiContext } from './UiContext'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
   const { toggleLoading } = useContext(UiContext)
   const [user, setUser] = useState({ ok: false })
   const [cosechas, setCosechas] = useState({})
   const [inscripciones, setInscripciones] = useState({})
   const [filtros, setFiltros] = useState({})
   const [excelData, setExcelData] = useState([])

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
         getHarvestExport(data)
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


   const getHarvestExport = async (data) => {
      const resp = await fetchToken('lecturas', data, 'POST')
      const body = await resp.json()
      console.log('fichas: ', body)
      if (body.ok) {
         let data = []
         data = body.lecturas.map(l => {
            return {
               Fundo: l.lectura_relacion_ig.item_negocio.desc_item_negocio,
               Cuartel: l.lectura_relacion_ig.cuartel.nombre,
               Especie: 'especie',
               Rut_Cosechero: l.lectura_cosechero.rut_trabajador,
               Nombre_Cosechero: l.lectura_cosechero.nombre_cosechero,
               Cantidad: l.peso,
               Unidad_de_medida: l.rh_faena.tipo_medida.desc_tipo_med,
               Hora_lectura: moment(l.fecha_hora_lect).format('DD-MM-YYYY, HH:MM:ss'),
               Equipo: 'equipo',
               usuario: 'usuario',
               idServ: 'is serv',
               idLocal: 'is local'
            }
         })

         console.log('data: ', data)
         setExcelData(data)
      }
      else {
         console.log('error export excel data')
      }
   }

   const getSheets = async (data) => {
      const resp = await fetchToken('fichas', data, 'POST')
      const body = await resp.json()
      toggleLoading()
      // console.log('fichas: ', body)
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
         getSheets(filters)
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
         getSheets(filters)
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
      // console.log('se lanzo el efecto')
      const token = window.localStorage.getItem('token-picoltue')
      if (token) {
         validateSeesion()
         getHarvest()
         // getSheets()
         getFilters()
      }
   }, [])

   return (
      <AppContext.Provider value={{
         login, logout, user, cosechas, inscripciones, insertSheet, updateSheet, filtros, getSheets, excelData
      }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider
