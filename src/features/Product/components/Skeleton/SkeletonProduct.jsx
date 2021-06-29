import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

SkeletonProduct.propTypes = {
   length: PropTypes.number,
}

SkeletonProduct.defaultProps = {
   length: 3,
}

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   text: {
      marginBottom: '10px'
   },
   rect: {
      minHeight: '260px'
   },
   item: {

   },
   paper: {
      marginBottom: '10px',
      minHeight: '362px',
   },
}));

export default function SkeletonProduct({ length }) {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Grid container spacing={1}>
            {
               Array.from(new Array(length)).map((x, index) => (
                  <Grid className={classes.item} key={index} item xs={12} sm={6} md={4} lg={4}>
                     <Paper className={classes.paper}>
                        <Skeleton variant="rect" width={'100%'} className={classes.rect} />
                        <Skeleton variant="text" height={30} width={'80%'} />
                        <Skeleton variant="text" height={20} width={'30%'} />
                     </Paper>
                  </Grid>
               ))
            }
         </Grid>
      </div>
   );
}