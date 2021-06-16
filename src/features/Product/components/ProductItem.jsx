import React from 'react';
// import './style.scss';
import StarIcon from '@material-ui/icons/Star';
import { formatCurrency } from 'ultils';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

ProductItem.propTypes = {
   products: PropTypes.array
}

const useStyles = makeStyles({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
   },
   product__item: {
      flexBasis: 'calc((100% - 30px) / 3)',
      marginBottom: '20px',
      marginRight: '10px',
      borderRadius: '3px',
      transition: '0.15s',

      '&:hover': {
         cursor: 'pointer',
         boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }
   },
   product__image: {
      backgroundColor: '#cfc9c970',
      display: 'inline-block',
      minHeight: '200px',
      width: '100%',
   },
   img: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
   },
   product__info: {
      padding: '10px'
   },
   title: {
      margin: '5px 0px',
      fontSize: '17px',
      fontWeight: 'bold',

      '&:hover': {
         textDecoration: 'underline'
      }
   },
   product__price: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '5px 0px',
   },
   newPrice: {
      color: '#ba1717',
      fontWeight: 'bold',
      fontSize: '17px',
   },
   oldPrice: {
      textDecoration: 'line-through',
      fontSize: '16px',
   },
   star: {
      marginLeft: '-5px'
   },
   MuiSvgIconRoot: {
      color: '#f38e00'
   }
});

function ProductItem({ products }) {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         {
            products.map(item => (
               <div key={item.id} className={classes.product__item}>
                  <div className={classes.product__image}>
                     <img className={classes.img} src={item.image} alt={item.name} />
                  </div>
                  <div className={classes.product__info}>
                     <h4 className={classes.title}>{item.name}</h4>
                     <div className={classes.product__price}>
                        <p className={classes.newPrice}>{formatCurrency(item.price)}</p>
                        <p className={classes.oldPrice}>{formatCurrency(item.price)}</p>
                     </div>
                     <div className={classes.star}>
                        <StarIcon className={classes.MuiSvgIconRoot} />
                        <StarIcon className={classes.MuiSvgIconRoot} />
                        <StarIcon className={classes.MuiSvgIconRoot} />
                        <StarIcon className={classes.MuiSvgIconRoot} />
                        <StarIcon className={classes.MuiSvgIconRoot} />
                     </div>
                  </div>
               </div>
            ))
         }
      </div>
   )
}
export default ProductItem


