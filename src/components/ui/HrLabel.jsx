import React from 'react'

const HrLabel = ({ name }) => {
   return (
      <div className="relative border-t my-4 border-gray-400">
         <label
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 block capitalize bg-white px-2">
            {name}
         </label>
      </div>
   )
}

export default HrLabel
