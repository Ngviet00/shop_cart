import React, { useState, useEffect } from 'react';
import './style.scss';
import productApi from 'api/productApi';
import ProductItem from 'features/Product/components/ProductItem.jsx';
import SkeletonProduct from 'features/Product/components/Skeleton/SkeletonProduct.jsx';
import SortPrice from 'features/Product/components/SortPrice';
import ProductFilters from 'features/Product/components/ProductFilters';

function ListProduct(props) {
   const [products, setProducts] = useState([]);
   const [loadingProduct, setLoadingProduct] = useState(true);

   const [filters, setFilter] = useState({
      page: 1,
      limit: 10,
      sortby: 'price',
      order: 'asc'
   });

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const { data } = await productApi.getAll(filters);
            setProducts(data);
         } catch (e) {
            console.log('Failed to fetch products api', e);
         }
         setLoadingProduct(false);
      }
      fetchProducts();
   }, [filters]);

   const handleOnChange = (newValue) => {
      const newSortValue = newValue.props.value;
      setFilter((oldFilter) => ({
         ...oldFilter,
         order: newSortValue,
      }));
   }

   const handleFilterChange = (newFilter) => {
      setFilter((oldFilter) => ({
         ...oldFilter,
         ...newFilter
      }));
   }
   return (
      <div className='list__product container'>
         <div className='sidebar'>
            <h2>List Category</h2>
            <ProductFilters onChange={handleFilterChange} filters={filters} />
         </div>
         <div className='content'>
            <SortPrice currentSort={filters.order} onChange={handleOnChange} />
            {
               loadingProduct ? <SkeletonProduct /> : <ProductItem products={products} />
            }
         </div>
      </div>
   );
}



export default ListProduct;