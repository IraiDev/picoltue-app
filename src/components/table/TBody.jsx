import React from 'react'

const TBody = ({ children, className = 'bg-white' }) => {
   return (
      <tbody className={className}>
         {children}
      </tbody>
   )
}

export default TBody
