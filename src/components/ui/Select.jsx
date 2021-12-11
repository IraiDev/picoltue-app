import React from 'react'

const Select = ({
   options = [],
   onChange,
   value,
   name,
   className = 'border rounded-md w-full bg-gray-50 border-gray-300 p-1 text-xs'
}) => {

   return (
      <select
         className={className}
         value={value}
         name={name}
         onChange={onChange}
      >
         <option value=''>Todos</option>
         {options.length > 0 &&
            options.map(option => {
               return <option key={option.value} value={option.value}>{option.label}</option>
            })
         }
      </select>
   )
}

export default Select
