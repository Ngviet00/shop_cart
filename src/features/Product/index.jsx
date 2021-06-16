import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import ListProduct from './pages/ListProduct';
import ProductDetail from './pages/ProductDetail/index';

function Product() {
   const match = useRouteMatch();
   return (
      <div>
         <Switch>
            <Route path={match.path} component={ListProduct} exact />
            <Route path={`${match.path}/:productId`} component={ProductDetail} exact />
         </Switch>
      </div>
   )
}

export default Product;
