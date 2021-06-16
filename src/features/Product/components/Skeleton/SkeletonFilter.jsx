import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   long: {
      width: '75%',
      height: '35px',
   },
   short: {
      width: '60%',
      height: '25px',
   }
}));

const SkeletonFilter = () => {
   const classes = useStyles();
   return (
      <div className="skeleton">
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
         <Skeleton variant="text" className={classes.long} />
         <Skeleton variant="text" className={classes.short} />
      </div>
   )
}

export default SkeletonFilter;

