import React from 'react'

const Select = ({
   options = [],
   onChange,
   value,
   name,
   className = 'border rounded-md truncate bg-gray-50 border-gray-300 text-xs',
   showAllOption = false,
   title,
   width = 'w-full p-1'
}) => {

   return (
      <select
         className={className + ' ' + width}
         title={title}
         value={value}
         name={name}
         onChange={onChange}
      >
         <option disabled={showAllOption} value=''>Todos</option>
         {options.length > 0 &&
            options.map(option => (
               <option
                  className='w-max'
                  key={option.value}
                  value={option.value}>
                  {option.label}
               </option>
            ))
         }
      </select>
   )
}

export default Select
