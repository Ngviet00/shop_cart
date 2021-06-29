import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { totalQuantityCart } from 'features/Cart/selector';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(1),
         width: 'auto',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: '25ch',
      },
   },
}));

const WrapperHeader = styled.section`
   width: 100%;
   background-color: #0C2738;

   .container{
      height: 80px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      color:white;

      .header__logo{
         color:#fffff6;

         img{
            width: 150px;
            height: auto;
         }
      }

      .header__formSearch{
         .search{

         }
      }

      .header__right{
         display:flex;
         align-items:center;
         justify-content:space-between;

         nav ul li{
            display:inline-block;

            a{
               color: white;
               padding: 5px 10px;
               text-transform: uppercase;
               margin-right: 5px;
               border-radius: 3px;
               transition: all 0.5s;
               &:hover{
                  background: #fffcfc30;
               }
            }
         }

         .header__iconRight{
            color:white;
         }
         .header__toggleMenu{
            display:none;
         }
      }
   }
`

function Header() {
   const classes = useStyles();

   const countQuantityCart = useSelector(totalQuantityCart);

   return (
      <WrapperHeader>
         <div className='container'>
            <Box component="div" m={1}>
               <Link className='header__logo' to='/product'>
                  <img src="/logo.png" alt="logo" />
               </Link>
            </Box>
            <Box component="div" m={1} className='header__formSearch'>
               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcon />
                  </div>
                  <InputBase
                     placeholder="Search…"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </div>
            </Box>
            <Box className='header__right' component="div" m={1}>
               <nav>
                  <ul>
                     <li>
                        <Link to='/home'>trang chủ</Link>
                     </li>
                     <li>
                        <Link to='/product'>sản phẩm</Link>
                     </li>
                     <li>
                        <Link to='/blog'>tin tức</Link>
                     </li>
                     <li>
                        <Link to='/contact'>liên hệ</Link>
                     </li>
                  </ul>
               </nav>
               <Link to='/cart'>
                  <IconButton color="inherit" className="header__iconRight" >
                     <Badge badgeContent={countQuantityCart} color="secondary">
                        <ShoppingCartIcon />
                     </Badge>
                  </IconButton>
               </Link>
               <Link to='/signIn'>
                  <IconButton className="header__iconRight">
                     <AccountCircle />
                  </IconButton>
               </Link>
               <Button className="header__iconRight header__toggleMenu">
                  <MenuIcon />
               </Button>
            </Box>
         </div>
      </WrapperHeader>
   );
}
export default Header;