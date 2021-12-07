import React, { useContext } from 'react'
import { UiContext } from '../../context/Ui'
import Button from './Button'

const Container = ({ children, title = 'Titulo', user = 'user' }) => {
   const { toggleSidebar } = useContext(UiContext)

   return (
      <div className="h-screen w-full bg-white p-6">
         <header className="bg-gray-200 py-1.5 px-5 rounded-md flex items-center justify-between border shadow-md">
            <Button
               className="rounded-lg hover:bg-gray-200"
               type="icon"
               onClick={toggleSidebar} />
            <h1 className="text-xl font-semibold text-center">{title}</h1>
            <h1 className="text-base font-semibold text-center capitalize">{user}</h1>
         </header>
         {children}
      </div >
   )
}

export default Container
