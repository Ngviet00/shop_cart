import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

FilterByPrice.propTypes = {
   onChange: PropTypes.func,
   filters: PropTypes.object
};

FilterByPrice.defaultProps = {
   onChange: null,
   filters: {}
}

const price = [
   {
      id: 1,
      label: 'Dưới 500.000',
      saleGte: 0,
      saleLte: 500000
   },
   {
      id: 2,
      label: '500.000 đến 1.000.000',
      saleGte: 500000,
      saleLte: 1000000
   },
   {
      id: 3,
      label: 'Trên 1.000.000',
      saleGte: 1000000,
      saleLte: 100000000
   },
];

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
   },
   wpInput: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '.5em 0px'
   },
   price: {
      flexBasis: '40%',
      fontSize: '15px',
   },
   itemPrice: {
      fontSize: '15px',
      margin: '5px 0px',
      width: 'fit - content',
      backgroundColor: '#e8e7e7',
      padding: '1px 10px',
      borderRadius: '5px',
      display: 'inline-block',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   title: {
      margin: '.2em 0px'
   }
}));

function FilterByPrice({ filters, onChange }) {
   const classes = useStyles();
   const [salePrice_gte, setSalePrice_gte] = useState(0);
   const [salePrice_lte, setSalePrice_lte] = useState(0);

   const handlePriceGteChange = async (e) => {
      await setSalePrice_gte(e.target.value);
   }

   const handlePriceLteChange = async (e) => {
      await setSalePrice_lte(e.target.value);
   }

   const handleClickPrice = () => {
      const newFilters = {
         ...filters,
         salePrice_gte: salePrice_gte,
         salePrice_lte: salePrice_lte
      };
      onChange(newFilters);
      setSalePrice_gte(0);
      setSalePrice_lte(0);
   }
   const handleClickItemPrice = (item) => {
      const newFilters = {
         ...filters,
         salePrice_gte: item.saleGte,
         salePrice_lte: item.saleLte
      };
      onChange(newFilters);
   }

   return (
      <div className="filterbyprice">

         <h3 className={classes.title}>Giá</h3>
         {
            price.map(item => (
               <p className={classes.itemPrice} key={item.id} onClick={() => handleClickItemPrice(item)}>
                  {item.label}
               </p>
            ))
         }
         <div className={classes.wpInput} style={{ display: 'flex' }}>
            <TextField
               className={classes.price}
               value={salePrice_gte}
               name="salePrice_gte"
               onChange={handlePriceGteChange}
               placeholder="From" />
            __
            <TextField
               className={classes.price}
               value={salePrice_lte}
               name="salePrice_lte"
               onChange={handlePriceLteChange}
               placeholder="To" />
         </div>
         <Button type="submit"
            onClick={handleClickPrice}
            color="primary"
            variant="outlined">Xác nhận</Button>
      </div >
   );
}
export default FilterByPrice;