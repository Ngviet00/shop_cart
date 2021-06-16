import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';

SkeletonProduct.propTypes = {
   length: PropTypes.number,
}

SkeletonProduct.defaultProps = {
   length: 6,
}

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   text: {
      marginBottom: '10px'
   },
   rect: {
      minHeight: '200px'
   }
}));

export default function SkeletonProduct({ length }) {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Grid container spacing={3}>
            {
               Array.from(new Array(length)).map((x, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                     <Skeleton variant="rect" width={'100%'} className={classes.rect} />
                     <Skeleton variant="text" height={30} width={'80%'} />
                     <Skeleton variant="text" height={20} width={'30%'} />
                  </Grid>
               ))
            }
         </Grid>
      </div>
   );
}