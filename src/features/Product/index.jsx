import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import ListProduct from './pages/ListProduct';
import ProductDetail from 'features/Product/pages/ProductDetail';

function Product() {
   const { path } = useRouteMatch();
   return (
      <div>
         <Switch>
            <Route path={path} component={ListProduct} exact />
            <Route path={`${path}/:productId`} component={ProductDetail} exact />
         </Switch>
      </div>
   )
}

export default Product;
