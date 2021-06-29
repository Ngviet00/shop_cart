import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
   root: {
      height: '60px',
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: '15px',
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
   },
}));

SortPrice.propTypes = {
   currentSort: PropTypes.string,
   onChange: PropTypes.func,
   filters: PropTypes.object

};

SortPrice.defaultProps = {
   onChange: null,
   currentSort: '',
};

export default function SortPrice({ filters, onChange }) {
   const classes = useStyles();
   const [_sort, setSort] = React.useState('');
   const handleChange = (event) => {
      const value = event.target.value;
      setSort(value);
      if (value === '') {
         const newFilters = { ...filters };
         delete newFilters._sort;
         delete newFilters._order;
         onChange(newFilters);
      } else {
         const newFilters = { ...filters };
         newFilters._sort = "salePrice"
         newFilters._order = value
         onChange(newFilters);
      }
   };
   return (
      <div className={classes.root}>
         <h3 className={classes.title}>Sắp xếp : </h3>
         <FormControl className={classes.formControl}>
            <NativeSelect
               className={classes.select}
               value={_sort}
               onChange={handleChange}
               name="_sort"
            >
               <option value="">Mặc định</option>
               <option value='asc'>Từ thấp tới cao</option>
               <option value='desc'>Từ cao xuống thấp</option>
            </NativeSelect>
         </FormControl>
      </div >
   );
}
