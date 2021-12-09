import React from 'react'
import Button from './Button'

const Pager = () => {
   return (
      <footer className="flex justify-center items-center w-max bg-gray-200 p-1.5 rounded-full shadow-lg mx-auto my-8">
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"><i className="fas fa-chevron-left"></i></Button>
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">1</Button>
         -
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">2</Button>
         -
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">3</Button>
         ...
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">10</Button>
         <Button type="pager" className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"><i className="fas fa-chevron-right"></i></Button>
      </footer>
   )
}

export default Pager
