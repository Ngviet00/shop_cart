import React from 'react';
import { formatCurrency } from 'ultils';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import NoData from 'components/NoData';
import { useHistory } from "react-router-dom";
ProductItem.propTypes = {
   products: PropTypes.array
}
ProductItem.defaultProps = {
   products: []
}
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   paper: {
      marginBottom: '10px'
   },
   container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   item: {
      border: '1px solid white',
      '&:hover': {
         cursor: 'pointer',
      }
   },
   image: {
      minHeight: '271px',
      width: '100%',
      backgroundColor: '#F6F6F6',
   },
   img: {
      maxWidth: '100%',
      maxHeight: '271px',
      display: 'block',
      margin: '0px auto',
      opacity: '1',
      transition: 'opacity 0.5s ease 0s',
   },
   infoProduct: {
      padding: '5px 10px'
   },
   nameProduct: {
      fontWeight: 'bold',
      fontSize: '15.5px',
      width: '240px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
   price: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '.3em 0px'
   },
   salePrice: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#b62a2a',
   },
   oldPrice: {
      fontWeight: '600',
      fontSize: '15px',
      textDecoration: 'line-through',
   },
}));

function ProductItem({ products }) {
   const classes = useStyles();
   const history = useHistory();

   const handleProductClick = (id) => {
      history.push(`product/${id}`);
   }
   return (
      <div className={classes.root}>
         <Grid container spacing={1} className={classes.container}>
            {
               products.length > 0 ?
                  products.map(x => (
                     <Grid onClick={() => handleProductClick(x.id)} key={x.id} item xs={12} sm={6} md={4} lg={4} className={classes.item}>
                        <Paper className={classes.paper}>
                           <Box component="div" className={classes.image}>
                              <img className={classes.img}
                                 src={x.image[0]}
                                 alt={x.name} />
                           </Box>
                           <Box component="div" className={classes.infoProduct}>
                              <Typography className={classes.nameProduct}>{x.name}</Typography>
                              <Box className={classes.price} componen="div">
                                 <span className={classes.salePrice}>{formatCurrency(x.salePrice)}</span>
                                 <span className={classes.oldPrice}>{formatCurrency(x.oldPrice)}</span>
                              </Box>
                              <Box className={classes.star} component="div">
                                 <Rating name="size-medium" readOnly defaultValue={x.star} />
                              </Box>
                           </Box>
                        </Paper>
                     </Grid>
                  )) : <NoData />
            }
         </Grid>
      </div>
   )
}
export default ProductItem


