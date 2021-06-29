import categoryApi from "api/categoryApi";
import brandApi from "api/brandApi";
import { useState, useEffect } from "react";

export default function ListCategories() {
   const [loadingSideBar, setLoadingSideBar] = useState(false);
   const [categories, setCategories] = useState([]);
   const [brands, setBrands] = useState([]);

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            setLoadingSideBar(true);
            const dataCategory = await categoryApi.getAll();
            const dataBrand = await brandApi.getAll();
            setCategories(dataCategory);
            setBrands(dataBrand);
         } catch (e) {
            console.log('Failed to fetch categories api', e);
         }
         setLoadingSideBar(false);
      };
      fetchCategories();
   }, []);
   return { loadingSideBar, categories, brands }
}