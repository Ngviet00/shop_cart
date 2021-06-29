import React, { useState } from 'react';
import './style.scss';
import ProductItem from 'features/Product/components/ProductItem.jsx';
import SkeletonProduct from 'features/Product/components/Skeleton/SkeletonProduct.jsx';
import SortPrice from 'features/Product/components/SortPrice';
import ProductFilters from 'features/Product/components/ProductFilters';
import Pagination from '@material-ui/lab/Pagination';
import SkeletonFilter from 'features/Product/components/Skeleton/SkeletonFilter';
import FilterView from 'features/Product/components/FilterView';
import ListCategories from 'features/Product/hooks/getAllCategories';
import ListProducts from 'features/Product/hooks/getAllProducts';

function ListProduct(props) {
   const [filters, setFilter] = useState({
      _page: 1,
      _limit: 6,
   });

   const { loadingSideBar, categories, brands } = ListCategories();
   const { loadingProducts, products, pgn } = ListProducts(filters);

   const handleFilterChange = (newFilter) => {
      setFilter((oldFilter) => ({
         ...oldFilter,
         ...newFilter
      }));
   }

   const handleSortChange = (value) => {
      setFilter(value);
   }

   const handlePgnChange = (e, page) => {
      setFilter((oldFilter) => ({
         ...oldFilter,
         _page: page,
      }));
   }

   const handleNewFilterChange = (newFilter) => {
      setFilter(newFilter);
   }
   return (
      <div className='list__product container'>
         <div className='sidebar'>
            {
               loadingSideBar ? <SkeletonFilter /> : <ProductFilters brands={brands} categories={categories} onChange={handleFilterChange} filters={filters} />
            }
         </div>
         <div className='content'>
            <SortPrice filters={filters} onChange={handleSortChange} />
            <FilterView filters={filters} brands={brands} categories={categories} onChange={handleNewFilterChange} />
            {
               loadingProducts ? <SkeletonProduct /> : <ProductItem products={products} />
            }
            {
               products.length ? <Pagination className='pagination' onChange={handlePgnChange} count={Math.ceil(pgn._totalRows / pgn._limit)} page={pgn._page} color="primary" /> : ''
            }
         </div>
      </div>
   );
}
export default ListProduct;