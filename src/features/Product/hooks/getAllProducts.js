import productApi from "api/productApi";
import { useState, useEffect } from "react";

export default function ListProducts(filters) {
   const [loadingProducts, setLoadingProducts] = useState(false);
   const [products, setProducts] = useState([]);
   const [pgn, setPgn] = useState({
      _page: 1,
      _limit: 3,
      _totalRows: 10,
   });
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            setLoadingProducts(true);
            const { data, pagination } = await productApi.getAll(filters);
            setProducts(data);
            setPgn(pagination);
         } catch (e) {
            console.log('Failed to fetch products api', e);
         }
         setLoadingProducts(false)
      }
      fetchProducts();
   }, [filters]);
   return { loadingProducts, products, pgn };
}