import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      alignItems: 'flex-end',
      borderBottom: '1px solid #0000001c',
      paddingBottom: '15px',
      marginBottom: '1em'
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
   title: {
      fontWeight: 'bold',
      marginRight: '1em',
      alignContent: 'flex-end',
      paddingBottom: '5px'
   }
}));

SortPrice.propTypes = {
   currentSort: PropTypes.string,
   onChange: PropTypes.func,
};

export default function SortPrice({ currentSort, onChange }) {
   const classes = useStyles();

   const handleSortChange = (e, newValue) => {
      if (onChange) onChange(newValue);
   };
   return (
      <div className={classes.root}>
         <h3 className={classes.title}>Sort by : </h3>
         <FormControl className={classes.formControl}>
            <Select
               value={currentSort}
               onChange={handleSortChange}
               displayEmpty
               className={classes.selectEmpty}
            >
               <MenuItem value={'asc'}>Low to High</MenuItem>
               <MenuItem value={'desc'}>High to Low</MenuItem>
            </Select>
         </FormControl>
      </div >
   );
}
