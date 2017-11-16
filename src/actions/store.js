export const SET_OWNED_PRODUCTS = "SET_OWNED_PRODUCTS";
export const ADD_OWNED_PRODUCT = "ADD_OWNED_PRODUCT";

export function setOwnedProducts(productIds) { return { type:SET_OWNED_PRODUCTS, productIds }; }
export function addOwnedProduct(productId) { return { type:ADD_OWNED_PRODUCT, productId }; }