import React from 'react'

const Select = ({ options, onChange, value }) => {


   return (
      <select className="border rounded-md w-full bg-gray-50 border-gray-300 p-1 text-xs" value={value} onChange={onChange}>
         {
            options.map(option => {
               return <option key={option.id} value={option.id}>{option.name}</option>
            })
         }
      </select>
   )
}

export default Select
