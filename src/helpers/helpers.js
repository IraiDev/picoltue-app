export const checkForms = (value) => {
   const noPermitidos = ['#', '$', '%', '^', '&', '"', "'", '<', '>', ';', '{', '}', '[', ']', '*']
   const obj = {
      state: false,
      char: '',
      list: noPermitidos
   }
   noPermitidos.forEach((item, index) => {
      if (value.includes(item)) {
         return (
            obj.state = true,
            obj.char = noPermitidos[index],
            obj.list = noPermitidos
         )
      }
   })
   return obj
}

export const numberFormat = ({ num, decimals = 2, region = 'cl-CL' }) => {
   const options = { minimumFractionDigits: decimals }
   const formatter = new Intl.NumberFormat(region, options)
   return formatter.format(num)
}