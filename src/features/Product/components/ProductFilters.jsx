import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByStar from './Filters/FilterByStar';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
import FilterByBrand from './Filters/FilterByBrand';

ProductFilters.propTypes = {
   filters: PropTypes.object.isRequired,
   onChange: PropTypes.func,
};

function ProductFilters({ brands, categories, filters, onChange }) {

   const handleCategoryChange = (newCategoryId) => {
      if (!onChange) return;
      const newFilters = {
         ...filters,
         categoryId: newCategoryId
      };
      onChange(newFilters);
   }

   const handleStarChange = (starId) => {
      if (!onChange) return;
      const newFilters = {
         ...filters,
         star: starId
      }
      onChange(newFilters);
   }

   const handlePriceChange = (value) => {
      onChange(value);
   }

   const handleServiceChange = (value) => {
      onChange(value);
   }
   const handleBrandChange = (value) => {
      onChange(value);
      if (!onChange) return;
      const oldFilters = {
         ...filters,
         brandId: value
      }
      onChange(oldFilters);
   }

   return (
      <div>
         <FilterByCategory categories={categories} onChange={handleCategoryChange} />
         <FilterByBrand brands={brands} onChange={handleBrandChange} />
         <FilterByStar onChange={handleStarChange} />
         <FilterByPrice filters={filters} onChange={handlePriceChange} />
         <FilterByService filters={filters} onChange={handleServiceChange} />
      </div>
   );
}

export default ProductFilters;