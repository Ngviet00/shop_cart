import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { totalCart } from 'features/Cart/selector';
import { formatCurrency } from 'ultils';
import { removeAllCart } from 'features/Cart/cartSlice'


const useStyles = makeStyles((theme) => ({
   root: {
      margin: '2em auto',
      display: 'block',
      width: '1170px',
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   form: {
      textAlign: 'left',
   },
   textField: {
      display: 'block',

      '& input': {
         width: '100%'
      }
   },
   item: {
      padding: '10px'
   },
   notProduct: {
      padding: '20px 30px',
      textAlign: 'center'
   },
   nameProduct: {
      width: '190px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
   total: {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '18px',
      marginTop: '1.5em'
   }

}));

function CheckOut() {
   const dispatch = useDispatch();
   const classes = useStyles();
   const history = useHistory();
   const listCart = useSelector(state => state.cart.cartItem);
   const goHome = () => {
      history.push(`product`);
   }
   const [info, setInfo] = useState({
      name: '',
      phone: '',
      address: '',
      email: '',
   })

   const totalMoney = useSelector(totalCart);

   const handleSubmit = (e) => {
      e.preventDefault();
   }

   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInfo(oldValue => ({
         ...oldValue,
         [name]: value,
      }));
   }

   const handleBuy = () => {
      let a = Object.assign({}, ...listCart);
      console.log('thong tin khach hang', info)
      console.log('thong tin don hang', a);
      alert('Đặt hàng thành công,cảm ơn quý khách đã mua hàng.')
      dispatch(removeAllCart());
      setInfo({
         name: '',
         phone: '',
         address: '',
         email: '',
      })
   }

   return (
      <div>
         {
            listCart.length > 0 ? (<div className={classes.root}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                     <Paper className={classes.paper}>
                        <h2>Thông tin khách hàng</h2>
                        <form className={classes.form} autoComplete="off" method="post" onSubmit={handleSubmit}>
                           <TextField
                              name='name'
                              placeholder='Họ và tên'
                              size="medium"
                              margin="normal"
                              fullWidth={true}
                              className={classes.textField}
                              value={info.name}
                              onChange={handleOnChange}
                              variant="outlined" />
                           <TextField
                              name='phone'
                              placeholder='Số điện thoại'
                              size="medium"
                              margin="normal"
                              fullWidth={true}
                              className={classes.textField}
                              value={info.phone}
                              onChange={handleOnChange}
                              variant="outlined" />
                           <TextField
                              name='address'
                              placeholder='Địa chỉ'
                              size="medium"
                              margin="normal"
                              fullWidth={true}
                              className={classes.textField}
                              variant="outlined"
                              value={info.address}
                              onChange={handleOnChange} />
                           <TextField
                              name='email'
                              placeholder='Email'
                              size="medium"
                              margin="normal"
                              fullWidth={true}
                              className={classes.textField}
                              variant="outlined"
                              value={info.email}
                              onChange={handleOnChange} />
                           <div>
                              <Typography variant="h6" color="primary">Phương thức thanh toán</Typography>
                              <FormControlLabel
                                 control={<Checkbox checked={true} name="checkbox" />}
                                 label="Thanh toán khi nhận hàng"
                              />
                           </div>
                           <Button style={{ marginLeft: 'auto', display: 'block' }} variant="contained" color="primary" onClick={handleBuy}>
                              Xác nhận
                           </Button>

                        </form>
                     </Paper>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                     <Paper className={classes.paper}>
                        <h2>Danh sách đơn hàng</h2>
                        <List className={classes.listItem}>
                           {listCart.map((value) => {
                              return (
                                 <ListItem key={value} role={undefined} dense className={classes.item}>
                                    <span className={classes.nameProduct}>{value.name}</span>
                                    <span className={classes.qty}> x {value.quantity}</span>
                                    <ListItemSecondaryAction>
                                       {formatCurrency(value.quantity * value.salePrice)}
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              );
                           })}
                           <Typography className={classes.total}>Tổng tiền: {formatCurrency(totalMoney)}</Typography>
                        </List>
                     </Paper>
                  </Grid>
               </Grid>
            </div>) : (<h3 className={classes.notProduct}>
               <p style={{ marginBottom: '10px' }}>Không có sản phẩm nào trong giỏ hàng</p>
               <p style={{ textAlign: 'center' }}>
                  <Button variant="contained" color="secondary" size="small" onClick={goHome}>
                     Mua ngay
                  </Button>
               </p>
            </h3>)
         }
      </div >
   )
}

export default CheckOut
