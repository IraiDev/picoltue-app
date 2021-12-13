import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'


const Pager = ({ onPageChange, limit, totals, page }) => {

   const [state, setstate] = useState(0)

   useEffect(() => {
      const count = Math.ceil(Number(totals) / Number(limit))
      !isNaN(count) && setstate(count)
   }, [limit, totals])

   return (
      <Stack spacing={2}>
         <Pagination color='primary' size='small' count={state} page={page} onChange={onPageChange} />
      </Stack>
   )
}

export default Pager
