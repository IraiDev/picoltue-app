import React from 'react'

const Td = ({ borderLeft = true, children, align = 'text-center' }) => {
   return (
      <td className="py-1.5">
         <div className={`${borderLeft && 'border-l'} ${align} px-2 border-gray-300 animate__animated animate__slideInLeft animate__faster z-10`}>
            {children}
         </div>
      </td>
   )
}

export default Td
