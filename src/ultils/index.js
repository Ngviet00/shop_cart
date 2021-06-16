export const formatCurrency = (x) => {
   const number = new Intl.NumberFormat('vn', { style: 'currency', currency: 'vnd' }).format(x);
   return number;
}