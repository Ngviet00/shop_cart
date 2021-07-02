import { createSelector } from 'reselect'

const cartItem = state => state.cart.cartItem;

export const totalQuantityCart = createSelector(
   cartItem,
   items => items.reduce((total, item) => total + parseInt(item.quantity), 0)
);


export const totalCart = createSelector(
   cartItem,
   items => items.reduce((total, item) => total + (item.quantity * item.salePrice), 0)
);
