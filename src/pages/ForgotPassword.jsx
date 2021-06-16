import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

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
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   errors: {
      color: 'red',
      fontSize: '14px'
   },
   link: {
      '&:hover': {
         cursor: 'pointer'
      }
   }
}));

const schema = yup.object().shape({
   Email: yup.string().required().email(),
});

export default function Login() {
   const classes = useStyles();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      alert(JSON.stringify(data));
      console.log(data);
   }

   let history = useHistory();

   return (
      <Container component="main" maxWidth="xs">
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Forgot Password
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  {...register("Email")}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
               />
               {errors.Email && <p className={classes.errors}>{errors.Email.message}</p>}
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Submit
               </Button>

               <Grid container>
                  <Grid item className={classes.link}>
                     <Link onClick={() => { history.push('/signIn') }} variant="body2">
                        {"Sign In"}
                     </Link>
                  </Grid>
               </Grid>

            </form>
         </div>
      </Container>
   );
}