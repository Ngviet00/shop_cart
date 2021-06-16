import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByStar from './Filters/FilterByStar';

ProductFilters.propTypes = {
   filters: PropTypes.object.isRequired,
   onChange: PropTypes.func
};

function ProductFilters({ filters, onChange }) {

   const handleCategoryChange = (newCategoryId) => {
      if (onChange) {
         const newFilters = {
            ...filters,
            categoryId: newCategoryId
         }
         onChange(newFilters);
      }
   }
   return (
      <div>
         <FilterByCategory onChange={handleCategoryChange} />
         <FilterByStar />
      </div>
   );
}

export default ProductFilters;