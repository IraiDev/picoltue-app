import React from 'react'

const Th = ({ children, highlight = false, title, width }) => {
   return (
      <th
         className={`py-2 px-3 ${highlight && 'text-red-400'}`}
         title={title}
      >
         {children}
      </th>
   )
}

export default Th
