import { useEffect, useState } from 'react'


export const useDependSelect = (dependencies, array) => {
   const [state, setState] = useState([])

   useEffect(() => {

      dependencies === '' ?
         setState(array)
         : setState(array.filter(c => c.id_comuna === Number(dependencies)))

      // eslint-disable-next-line
   }, [dependencies])

   return state
}