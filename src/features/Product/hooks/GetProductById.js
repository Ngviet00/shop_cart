import productApi from 'api/productApi';
import { useEffect } from 'react';
import { useState } from 'react';

function GetProductById(id) {
   const [loading, setLoading] = useState(false);
   const [productItem, setProductItem] = useState([]);
   useEffect(() => {
      const getOneProduct = async () => {
         try {
            setLoading(true);
            const data = await productApi.get(id);
            setProductItem(item => [...item, data]);
         } catch (err) {
            console.log(err);
         } finally {
            setLoading(false);
         }
      }
      getOneProduct();
   }, [id]);
   return { loading, productItem }
}

export default GetProductById;
