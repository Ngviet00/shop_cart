import productApi from 'api/productApi';
import { useEffect } from 'react';
import { useState } from 'react';

function GetProductById(id) {
   const [loading, setLoading] = useState(false);
   const [productItem, setProductItem] = useState([]);
   const temp = [];
   useEffect(() => {
      const getOneProduct = async () => {
         try {
            setLoading(true);
            const data = await productApi.get(id);
            temp.push(data);
            setProductItem(temp);
         } catch (err) {
            console.log(err);
         }
         setLoading(false);
      }
      getOneProduct();
   }, [id])
   return { loading, productItem }
}

export default GetProductById;
