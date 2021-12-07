import React, { useContext } from 'react'
import { UiContext } from '../../context/Ui'
import Button from './Button'

const Container = ({ children }) => {
   const { toggleSidebar } = useContext(UiContext)

   return (
      <div className="h-screen w-full bg-white p-6">
         <div className="shadow-2xl border rounded-md h-full w-full">
            <header className="bg-white py-1.5 px-5 rounded-t-md flex items-center justify-between border-b">
               <Button name="menus" onClick={toggleSidebar} />
               <h1 className="text-2xl font-bold text-center">Harvest</h1>
            </header>
            {children}
         </div>
      </div>
   )
}

export default Container
