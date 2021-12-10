import React from 'react'

const Th = ({ children, highlight = false }) => {
   return (
      <th className={`py-2 px-3 ${highlight && 'text-red-400'}`}>
         {children}
      </th>
   )
}

export default Th
