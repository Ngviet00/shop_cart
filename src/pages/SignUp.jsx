import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   link: {
      '&:hover': {
         cursor: 'pointer'
      }
   },
   errors: {
      color: 'red',
      fontSize: '14px'
   },
}));

const schema = yup.object().shape({
   Firstname: yup.string().required(),
   Lastname: yup.string().required(),
   Email: yup.string().required().email(),
   Password: yup.string().required().min(8),
});

export default function SignUp() {
   const classes = useStyles();
   let history = useHistory();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      alert(JSON.stringify(data));
   }

   return (
      <Container component="main" maxWidth="xs">
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        {...register("Firstname")}
                        autoComplete="fname"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                     />
                     {errors.Firstname && <p className={classes.errors}>{errors.Firstname.message}</p>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        {...register("Lastname")}
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="lname"
                     />
                     {errors.Lastname && <p className={classes.errors}>{errors.Lastname.message}</p>}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        {...register("Email")}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                     />
                     {errors.Email && <p className={classes.errors}>{errors.Email.message}</p>}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        {...register("Password")}
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     {errors.Password && <p className={classes.errors}>{errors.Password.message}</p>}
                  </Grid>
                  <Grid item xs={12}>
                     <FormControlLabel
                        control={<Checkbox checked="checked" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                     />
                     {errors.Agree && <p className={classes.errors}>{errors.Agree.message}</p>}
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Sign Up
               </Button>
               <Grid container justify="flex-end">
                  <Grid item className={classes.link}>
                     <Link onClick={() => { history.push('/signIn') }} variant="body2">
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}