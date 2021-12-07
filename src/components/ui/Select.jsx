import React from 'react'

const Select = ({
   options = [],
   onChange,
   value,
   className = 'border rounded-md w-full bg-gray-50 border-gray-300 p-1 text-xs'
}) => {

   return (
      <select
         className={className}
         value={value}
         onChange={onChange}>
         {options.length > 0 &&
            options.map(option => {
               return <option key={option.id} value={option.id}>{option.name}</option>
            })
         }
      </select>
   )
}

export default Select
