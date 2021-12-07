import React from 'react'

const Td = ({ borderLeft = true, children }) => {
   return (
      <td className="py-1.5">
         <div className={`${borderLeft && 'border-l'} px-2 w-full text-center border-gray-300`}>
            {children}
         </div>
      </td>
   )
}

export default Td
