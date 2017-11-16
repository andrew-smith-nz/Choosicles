import { SET_OWNED_PRODUCTS, ADD_OWNED_PRODUCT, TRY_SYNC_WITH_WEBSITE, SET_SYNC_COMPLETE } from '../actions/store.js'
import Reactotron from 'reactotron-react-native';

const bookData = require('../../books.json');

export function products(state = { ownedBooks: [] }, action)
{
    switch (action.type)
    {
        case SET_OWNED_PRODUCTS:
        {
            var ownedBooks = [];
            for (i = 0; i < action.productIds.length; i++)
            {
                var book = bookData.books.filter(b => b.androidIAPCode === action.productIds[i])[0];
                if (book)
                    ownedBooks.push(book.id);
            }
            return { ...state, ownedBooks: ownedBooks }
        }
        case ADD_OWNED_PRODUCT:
        {
            var ownedBooks = state.ownedBooks.slice();
            var book = bookData.books.filter(b => b.androidIAPCode === action.productId)[0];
            if (book)
                ownedBooks.push(book.id);
            return { ...state, ownedBooks: ownedBooks }
        }
        default: return state;
    }
}

export function sync(state = { syncResult: "", syncInProgress: false, syncComplete: false }, action)
{
    switch (action.type)
    {
        case TRY_SYNC_WITH_WEBSITE:
        {
            Reactotron.log("trysync " + action.email + ", " + action.password);
            return { ...state, syncComplete: true, syncResult: "Doneburgers" };
            
            // do some websitey stuff   
        }
        case SET_SYNC_COMPLETE:
        {
            return { ...state, syncComplete: action.complete };
        }
        default: return state;
    }
}