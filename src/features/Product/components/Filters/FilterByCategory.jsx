import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

FilterByCategory.propTypes = {
   onChange: PropTypes.func
};

FilterByCategory.defaultProps = {
   onChange: null
};

const useStyles = makeStyles({
   listCategories: {
      margin: '1em 0px'
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
   item: {
      height: '45px',
      lineHeight: '45px',
      borderBottom: '1px solid #0000001f',
      width: '80%',
      borderRadius: '3px',
      paddingLeft: '5px',

      '&:hover': {
         cursor: 'pointer',
         backgroundColor: '#d7cece45'
      }
   }
});

function FilterByCategory({ categories, onChange }) {
   const classes = useStyles();

   const handleCategoryClick = (item) => {
      if (!onChange) return;
      onChange(item.id);
   }
   return (
      <div className='listCategories'>
         <ul className={classes.listCategory}>
            <h2>Danh mục</h2>
            {categories.map(item => (
               <li className={classes.item} key={item.id} onClick={() => handleCategoryClick(item)}>
                  {item.name}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default FilterByCategory;