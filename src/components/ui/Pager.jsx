import React from 'react'
import Button from './Button'

const Pager = ({ lastPage, nextPage, prevPage }) => {
   return (
      <footer className="flex justify-around items-center w-max p-1.5 mx-auto my-8 bg-gray-200 rounded-full shadow-md">
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={prevPage} >
            <i className="fas fa-chevron-left"></i>
         </Button>
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"
         >
            1
         </Button>
         -
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">
            2
         </Button>
         -
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110">
            3
         </Button>
         ...
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={lastPage} >
            10
         </Button>
         <Button
            type="pager"
            className="px-2 hover:text-purple-500 text-lg ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={nextPage} >
            <i className="fas fa-chevron-right"></i>
         </Button>
      </footer>
   )
}

export default Pager
