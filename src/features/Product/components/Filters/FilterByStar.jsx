import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

FilterByStar.propTypes = {
   onChange: PropTypes.func
};

FilterByStar.defaultProps = {
   onChange: null,
}

const useStyles = makeStyles({
   title: {
      marginTop: '10px',
      marginBottom: '5px',

   },
   star: {
      display: 'flex',
      alignItems: 'center',

      '&:hover': {
         cursor: 'pointer'
      }
   },
   text: {
      fontSize: '14px',
      marginLeft: '10px'
   }
})


function FilterByStar({ onChange }) {
   const numberStar = [5, 4, 3];

   const classes = useStyles();

   const handleStarClick = (x) => {
      if (!onChange) return;
      onChange(x);
   }

   return (
      <Box component="div">
         <h3 className={classes.title}>Review/đánh giá</h3>
         <ul>
            {
               numberStar.map((x, idx) => (
                  <li key={idx} className={classes.star} onClick={() => { handleStarClick(x) }}>
                     <p>
                        <Rating
                           name="large"
                           defaultValue={x}
                           readOnly />
                     </p>
                     <p className={classes.text}> từ {x} sao</p>
                  </li>
               ))
            }
         </ul>
      </Box>
   );
}

export default FilterByStar;