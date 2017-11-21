import { SET_OWNED_PRODUCTS, ADD_OWNED_PRODUCT, ADD_BOOKS_BY_ID } from '../actions/store.js'
import Reactotron from 'reactotron-react-native';

const bookData = require('../../books.json');

export function products(state = { ownedBooks: [] }, action)
{
    switch (action.type)
    {
        case SET_OWNED_PRODUCTS:
        {
            var ownedBooks = state.ownedBooks.slice();
            for (i = 0; i < action.productIds.length; i++)
            {
                var book = bookData.books.filter(b => b.androidIAPCode === action.productIds[i])[0];
                if (book && ownedBooks.filter(b => b.id === book.id).length == 0)
                    ownedBooks.push(book.id);
            }
            return { ...state, ownedBooks: ownedBooks }
        }
        case ADD_OWNED_PRODUCT:
        {
            var ownedBooks = state.ownedBooks.slice();
            var book = bookData.books.filter(b => b.androidIAPCode === action.productId || b.iosIAPCode == action.productId)[0];
            if (book && ownedBooks.filter(b => b.id == book.id).Length == 0)
                ownedBooks.push(book.id);
            return { ...state, ownedBooks: ownedBooks }
        }
        case ADD_BOOKS_BY_ID:
        {
            var ownedBooks = state.ownedBooks.slice();
            for (i = 0; i < action.books.length; i++)
            {
                if (ownedBooks.filter(b => b.id === action.books[i].Id).length == 0)
                    ownedBooks.push(action.books[i].Id);
            }
            return {...state, ownedBooks};
        }
        default: return state;
    }
}
