import React from 'react'

const Td = ({ borderLeft = true, children, align = 'text-center', className }) => {
   return (
      <td className="py-2.5">
         <div className={`${borderLeft && 'border-l'} ${align} ${className} px-2 border-gray-300 animate__animated animate__slideInLeft animate__faster z-10`}>
            {children}
         </div>
      </td>
   )
}

export default Td
