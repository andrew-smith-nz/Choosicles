export const SET_OWNED_PRODUCTS = "SET_OWNED_PRODUCTS";
export const ADD_OWNED_PRODUCT = "ADD_OWNED_PRODUCT";
export const TRY_SYNC_WITH_WEBSITE = "TRY_SYNC_WITH_WEBSITE";
export const SET_SYNC_COMPLETE = "SET_SYNC_COMPLETE";

export function setOwnedProducts(productIds) { return { type:SET_OWNED_PRODUCTS, productIds }; }
export function addOwnedProduct(productId) { return { type:ADD_OWNED_PRODUCT, productId }; }
export function trySyncWithWebsite(email, password) { return { type:TRY_SYNC_WITH_WEBSITE, email, password }; }
export function setSyncComplete(complete) { return { type: SET_SYNC_COMPLETE, complete }; }