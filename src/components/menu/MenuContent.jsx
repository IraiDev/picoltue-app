import React from 'react'

const MenuContent = ({ children }) => {
  return (
    <div className={`relative top-1 -left-2 rounded-md shadow-2xl border min-w-max bg-white`}>
      {children}
    </div>
  )
}

export default MenuContent
