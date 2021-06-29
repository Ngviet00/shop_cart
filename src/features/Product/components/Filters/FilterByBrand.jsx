import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   listBrands: {
      margin: '1em 0px'
   },
   categoryItem: {
      padding: '15px',
      paddingLeft: '0px',
      borderBottom: '1px solid #0000002b',

      '&:hover': {
         cursor: 'pointer',
         backgroundColor: '#979f272b',
      }
   },
   item: {
      height: '45px',
      lineHeight: '45px',
      borderBottom: '1px solid #0000001f',
      width: '80%',
      borderRadius: '3px',
      paddingLeft: '5px',

      '&:hover': {
         cursor: 'pointer',
         backgroundColor: '#d7cece45'
      }
   }
});


function FilterByBrand({ brands, onChange }) {
   const classes = useStyles();

   const handleBrandClick = (item) => {
      if (!onChange) return;
      onChange(item.id);
   }

   return (
      <div className='listBrands'>
         <ul className={classes.listBrand}>
            <h2>Thương hiệu</h2>
            {brands.map(item => (
               <li className={classes.item} key={item.id} onClick={() => handleBrandClick(item)}>
                  {item.name}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default FilterByBrand;