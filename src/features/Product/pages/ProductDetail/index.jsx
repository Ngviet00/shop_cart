import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToCart } from 'features/Cart/cartSlice';
import { formatCurrency } from 'ultils';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GetProductById from 'features/Product/hooks/GetProductById';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
   container: {
      maxWidth: '1170px',
      height: '100vh',
      marginTop: '1.5em'
   },
   root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column'
   },
   thumbNail: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
   },
   img: {
      margin: '0px auto',
      display: 'block',
      maxWidth: '80%',
      height: 'auto',
      transition: 'all 300ms ease-in-out',
   },
   name: {
      fontSize: '25px',
   },
   salePrice: {
      fontSize: '18px',
      margin: '0.5em 0px',
      color: '#989494',
   },
   select: {
      width: '35%',
      height: '35px',
      lineHeight: '35px',
      position: 'relative',
      outline: 'none',
      border: '1px solid #00000040',
      borderRadius: '2px',
   },
   option: {
      textAlign: 'center',
   },
   quantity: {
      margin: '1em 0px',
      display: 'flex',
      alignItems: 'center',
   },
   btnHandlePlus: {
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #decfcf',
      outline: 'none',
      padding: '5px',
      borderLeft: 'none',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   btnHandleSub: {
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #decfcf',
      outline: 'none',
      padding: '5px',
      borderRight: 'none',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   input: {
      fontSize: '16px',
      outline: 'none',
      width: '50px',
      height: '36px',
      lineHeight: '36px',
      textAlign: 'center',
      border: '1px solid #decfcf',
   },
   btnAddCart: {
      border: 'none',
      outline: 'none',
      padding: '10px',
      color: 'white',
      backgroundColor: '#ad1d1d',
      borderRadius: '3px',
      marginTop: '1em',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   intro: {
      color: '#3f373a',
      fontSize: '15px'
   },
   feature: {
      margin: '1em 0px',
      fontSize: '17px',
      color: '#3f373a',
   },
   listFeature: {
      '& li': {
         fontSize: '15px',
         color: '#3f373a',
         listStyleType: 'disc',
         margin: '5px 0px',
         marginLeft: '2em'
      }
   },
   active: {
      position: 'fixed',
      right: '30px',
      width: '300px',
      minHeight: '130px',
      backgroundColor: 'white',
      transitions: 'left 0.3s',
      boxShadow: 'rgba(0, 0, 0, 0.4)'
   },
   btnClose: {
      textAlign: 'right',
      '&:hover': {
         cursor: 'pointer'
      }
   },
   alert: {
      fontSize: '15px',
      margin: '.4em 0px',
      display: 'block',
      paddingLeft: '1.2em'
   },
   buttonCart: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '1em'
   },
   boxShadow: {
      right: '30px',
      position: 'fixed',
   },
   listThumb: {
      display: 'block',
      marginTop: '.5em',
      '& li': {
         width: '80px',
         height: '80px',
         backgroundColor: '#E3E3E3',
         display: 'inline-block',
         margin: '0px 10px',

         '& img': {
            display: 'block',
            maxWidth: '100%',
            height: 'auto',

            '&:hover': {
               cursor: 'pointer'
            }
         }
      }
   }
})
function ProductDetail() {
   const classes = useStyles();
   const { id } = useParams();
   const history = useHistory();
   const { loading, productItem } = GetProductById(id);

   const [idxImage, setIdxImage] = useState(0);

   const dispatch = useDispatch();

   const [quantity, setQuantity] = useState(1);
   const [size, setSize] = useState('M');

   const handleQuantityChange = (e) => {
      if (!e.target.validity.patternMismatch) {
         setQuantity(e.target.value);
      }
   }
   const handleSizeChange = (e) => {
      const value = e.target.value;
      setSize(value);
   }

   const [active, setActive] = useState(false);
   const addCart = (item) => {
      item.quantity = quantity;
      item.size = size;
      let product = [];
      if (localStorage.getItem('cart')) {
         product = JSON.parse(localStorage.getItem('cart'));
         const index = product.findIndex(x => x.id === item.id && x.size === item.size);
         if (index >= 0) {
            product[index].quantity += item.quantity
         } else {
            product.push(item);
         }
         localStorage.setItem('cart', JSON.stringify(product));
      } else {
         product.push(item);
         localStorage.setItem('cart', JSON.stringify(product));
      }
      dispatch(addToCart(item));
      setActive(true);
   }

   const handleClickCart = () => {
      history.push('/cart');
   }
   const handleCheckOut = () => {
      history.push('/checkout');
   }

   const handleChangeImage = (idx) => {
      setIdxImage(idx);
   }

   return (
      <Container className={classes.container}>
         {
            active ? (
               <Box
                  className={classes.boxShadow}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                  style={{ width: '20rem', height: '7rem' }}
               >
                  <p className={classes.btnClose} onClick={() => setActive(false)}>X</p>
                  <span className={classes.alert}>Thêm thành công</span>
                  <div className={classes.buttonCart}>
                     <Button size="small" variant="outlined" onClick={handleClickCart}>
                        Xem giỏ hàng
                     </Button>
                     <Button size="small" variant="outlined" color="primary" onClick={handleCheckOut}>
                        Thanh Toán
                     </Button>
                  </div>
               </Box>
            ) : null
         }
         {
            loading ? (<Grid container spacing={3}>
               <Grid item xs={6} className={classes.thumbNail}>
                  <Skeleton variant="rect" width={440} height={440} />
               </Grid>
               <Grid item xs={6} className={classes.info}>
                  <Skeleton variant="text" height={30} width={'80%'} />
                  <Skeleton variant="text" height={30} width={'40%'} />
                  <Skeleton variant="text" height={30} width={'60%'} />
                  <Skeleton variant="text" height={30} width={'80%'} />
                  <Skeleton variant="text" height={30} width={'40%'} />
                  <Skeleton variant="text" height={30} width={'60%'} />
               </Grid>
            </Grid>) : (productItem.map(item => (
               <Grid container spacing={3} key={item.id}>
                  <Grid item xs={6} className={classes.thumbNail}>
                     <div style={{ minHeight: '440px' }}>
                        <img className={classes.img} src={item.image[idxImage]} alt="" />
                     </div>
                     <ul className={classes.listThumb}>
                        {
                           item.image.map((img, index) => (
                              <li key={index} onClick={() => handleChangeImage(index)}>
                                 <img src={img} alt="" />
                              </li>
                           ))
                        }
                     </ul>
                  </Grid>
                  <Grid item xs={6} className={classes.info}>
                     <div>
                        <p className={classes.name}>{item.name}</p>
                        <p className={classes.salePrice}>{formatCurrency(item.salePrice)}</p>
                        <div className='size'>
                           <p style={{ marginBottom: '10px' }}>Size:</p>
                           <select name="size" className={classes.select} onChange={handleSizeChange}>
                              <option className={classes.option} value="M">M</option>
                              <option className={classes.option} value="L">L</option>
                              <option className={classes.option} value="XL">XL</option>
                              <option className={classes.option} value="XXL">XXl</option>
                           </select>
                        </div>
                        <div className={classes.quantity}>
                           <button disabled={quantity <= 1 ? 'disabled' : ''} className={classes.btnHandleSub} onClick={() => setQuantity(e => e - 1)}>
                              <RemoveIcon />
                           </button>
                           <input
                              value={quantity || ''}
                              pattern="^[0-9]*$"
                              className={classes.input}
                              onChange={handleQuantityChange}
                           />
                           <button className={classes.btnHandlePlus} onClick={() => setQuantity(e => e + 1)}>
                              <AddIcon />
                           </button>
                        </div>

                        <div className={classes.desc}>
                           <p className={classes.intro}>
                              You'll be swooning over this crew neck as soon as you
                              feel how soft it is.
                           </p>
                           <p className={classes.feature}>Feature</p>
                           <ul className={classes.listFeature}>
                              <li>40% preshrunk ring-spun cotton, 60% polyester terry fleece. </li>
                              <li>Available in dark heather charcoal with the white
                                 Google logo screen printed across center chest.</li>
                              <li>96% cotton, 4% spandex.</li>
                              <li>Self-fabric hood.</li>
                              <li>Dyed-to-match zipper.</li>
                           </ul>
                        </div>

                        <div >
                           <button onClick={() => addCart(item)} className={classes.btnAddCart}>Add To Cart</button>
                        </div>
                     </div>
                  </Grid>
               </Grid>)
            ))
         }
      </Container >
   )
}
export default ProductDetail;
