import React from 'react'
import ReactPaginate from 'react-paginate'

const Pager = ({ onPageChange, pageCount, pageRangeDisplayed }) => {
   return (
      <ReactPaginate
         breakLabel='...'
         nextLabel={<i className='fas fa-arrow-right'></i>}
         onPageChange={onPageChange}
         pageRangeDisplayed={pageRangeDisplayed}
         pageCount={pageCount}
         previousLabel={<i className='fas fa-arrow-left'></i>}
         renderOnZeroPageCount={null}
         marginPagesDisplayed={2}
         containerClassName='flex item-center gap-2 w-max mx-auto'
         pageLinkClassName='hover:bg-purple-500 hover:text-white h-6 w-6 inline-flex items-center justify-center rounded-full text-center transition duration-500'
         activeClassName='text-purple-500 rounded-full font-semibold'
         previousClassName='hover:text-purple-500 transition duration-500 inline-flex items-center justify-center h-6 w-6'
         nextClassName='hover:text-purple-500 transition duration-500 inline-flex items-center justify-center h-6 w-6'
         breakClassName='inline-flex items-center'
      />
   )
}

export default Pager
