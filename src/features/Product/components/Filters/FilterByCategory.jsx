import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import categoryApi from 'api/categoryApi';
import Button from '@material-ui/core/Button';
FilterByCategory.propTypes = {
   onChange: PropTypes.func
};

const useStyles = makeStyles({
   listCategories: {
      marginTop: '1em'
   },
   categoryItem: {
      padding: '15px',
      paddingLeft: '0px',
      borderBottom: '1px solid #0000002b',

      '&:hover': {
         cursor: 'pointer',
         backgroundColor: '#979f272b',
      }
   },
   button: {
      width: '80%',
      textAlign: 'left',
      display: 'block',
      background: 'no-repeat',
      margin: '10px 0px',
      textTransform: 'capitalize'
   }
});

function FilterByCategory({ onChange }) {
   const classes = useStyles();

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const { data } = await categoryApi.getAll();
            setCategories(data);
         } catch (e) {
            console.log('Failed to fetch categories api', e);
         }
      };
      fetchCategories();
   }, []);

   const handleCategoryClick = (item) => {
      if (onChange) {
         onChange(item.id);
      }
   }

   return (
      <div className='listCategories'>
         <ul className={classes.listCategory}>
            {categories.map(item => (
               <Button className={classes.button} variant="contained" key={item.id} onClick={() => handleCategoryClick(item)}>
                  {item.name}
               </Button>
            ))}
         </ul>
      </div>
   );
}

export default FilterByCategory;