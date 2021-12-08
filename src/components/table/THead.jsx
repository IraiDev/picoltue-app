import React from 'react'

const THead = ({ children, className = 'sticky top-0' }) => {
   return (
      <thead className={className}>
         {children}
      </thead>
   )
}

export default THead
