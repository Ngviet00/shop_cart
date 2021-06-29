import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { formatCurrency } from 'ultils';
import { removeAllCart, addQuantityCart, subQuantityCart, removeCart } from 'features/Cart/cartSlice';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
   root: {
      height: '85vh',
      maxWidth: '1170px',
      margin: '0px auto',
   },
   container: {
      padding: '0px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   table: {
      minWidth: 650,
   },
   tableContainer: {
      marginTop: '2em',
      maxWidth: '1170px',
   },
   nameProduct: {
      '&:hover': {
         cursor: 'pointer'
      },
   },
   btnDelete: {
      color: '#c72413',
      fontWeight: 'bold',
      '&:hover': {
         cursor: 'pointer',
         textDecoration: 'underline'
      }
   },
   image: {
      width: '50px',
      height: '50px',
      '&:hover': {
         cursor: 'pointer'
      }
   },
   totalMoney: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'right',
      padding: '20px'
   },
   removeAll: {
      textDecoration: 'underline',
      '&:hover': {
         cursor: 'pointer'
      }
   },
   payment: {
      display: 'flex',
      alignItems: 'center',
   },
   btnBuy: {
      padding: '10px',
      outline: 'none',
      border: 'none',
      borderRadius: '3px',
      backgroundColor: '#dd2323',
      color: 'white',
      marginLeft: '1em',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   notProduct: {
      padding: '20px 30px',
      textAlign: 'center'
   },
   quantity: {
      display: 'flex',
      justifyContent: 'center',
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
});

const Cart = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const [cart, setCart] = useState([]);

   useEffect(() => {
      const localData = localStorage.getItem('cart');
      setCart(localData && localData.length > 0 ? JSON.parse(localData) : []);
   }, []);

   useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
   }, [cart]);

   const handleOnClick = (item) => {
      let { id, size } = item;
      let index = cart.findIndex(x => x.id === id && x.size === size);
      cart.splice(index, 1);
      setCart(cart => [...cart]);
      dispatch(removeCart(item));
   }
   const setSubQuantity = (item) => {
      let { id, size } = item;
      let index = cart.findIndex(x => x.id === id && x.size === size);
      if (index >= 0) {
         cart[index].quantity -= 1;
      }
      setCart(cart => [...cart]);
      dispatch(subQuantityCart(item));
   }
   const setAddQuantity = (item) => {
      let { id, size } = item;
      let index = cart.findIndex(x => x.id === id && x.size === size);
      if (index >= 0) {
         cart[index].quantity += 1;
      }
      setCart(cart => [...cart]);
      dispatch(addQuantityCart(item));
   }
   const handleRemoveAllCart = () => {
      setCart([]);
      dispatch(removeAllCart());
   }

   let totalMoney = () => {
      return cart.reduce((total, item) => {
         return total + (item.quantity * item.salePrice)
      }, 0)
   }

   const handleClickToProduct = (id) => {
      history.push(`product/${id}`)
   }
   const goHome = () => {
      history.push(`product`);
   }

   const handleBuy = () => {
      history.push(`checkout`);
   }
   const handleQuantityChange = () => {
   }

   return (
      <div className={classes.root}>
         {
            cart.length > 0 ? <TableContainer component={Paper} className={classes.tableContainer}>
               <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell align="center">Hình ảnh</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Kích cỡ</TableCell>
                        <TableCell align="center">Giá</TableCell>
                        <TableCell align="center">Thành tiền</TableCell>
                        <TableCell align="center">Tác vụ</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        cart.map((item, index) => (
                           <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                 <h4 className={classes.nameProduct} onClick={() => handleClickToProduct(item.id)}>{item.name}</h4>
                              </TableCell>
                              <TableCell align="center">
                                 <img className={classes.image} onClick={() => handleClickToProduct(item.id)} src={item.image[0]} alt="" />
                              </TableCell>
                              <TableCell align="center">
                                 <div className={classes.quantity}>
                                    <button disabled={item.quantity <= 1 ? 'disabled' : ''} className={classes.btnHandleSub} onClick={() => setSubQuantity(item)}>
                                       <RemoveIcon />
                                    </button>
                                    <input
                                       value={item.quantity || ''}
                                       pattern="^[0-9]*$"
                                       className={classes.input}
                                       onChange={handleQuantityChange}
                                    />
                                    <button className={classes.btnHandlePlus} onClick={() => setAddQuantity(item)}>
                                       <AddIcon />
                                    </button>
                                 </div>
                              </TableCell>
                              <TableCell align="center">{item.size}</TableCell>
                              <TableCell align="center">{formatCurrency(item.salePrice)}</TableCell>
                              <TableCell width="200px" align="center">{formatCurrency(item.salePrice * item.quantity)}</TableCell>
                              <TableCell className={classes.btnDelete} align="center" onClick={() => handleOnClick(item)}>Xóa</TableCell>
                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
               <h4 className={classes.totalMoney}>
                  <div onClick={handleRemoveAllCart}>
                     <p className={classes.removeAll}>Xóa tất cả</p>
                  </div>

                  <div className={classes.payment}>
                     <p>Tổng tiền:{formatCurrency(totalMoney())}</p>
                     <p>
                        <button className={classes.btnBuy} onClick={handleBuy}>
                           Mua hàng
                        </button>
                     </p>
                  </div>

               </h4>
            </TableContainer>
               : <h3 className={classes.notProduct}>
                  <p style={{ marginBottom: '10px' }}>Không có sản phẩm nào trong giỏ hàng</p>
                  <p style={{ textAlign: 'center' }}>
                     <Button variant="contained" color="secondary" size="small" onClick={goHome}>
                        Mua ngay
                     </Button>
                  </p>
               </h3>
         }
      </div>
   );
};

export default Cart;