import { SET_OWNED_PRODUCTS, ADD_OWNED_PRODUCT, ADD_BOOKS_BY_ID, SET_ACTIVE_PURCHASE } from '../actions/store.js'
import Reactotron from 'reactotron-react-native';

const bookData = require('../../books.json');

export function products(state = { ownedBooks: [], activePurchase: null }, action)
{
    switch (action.type)
    {
        case SET_OWNED_PRODUCTS:
        {
            var ownedBooks = state.ownedBooks.slice();
            for (i = 0; i < action.productIds.length; i++)
            {
                var book = bookData.books.filter(b => b.androidIAPCode === action.productIds[i])[0];
                if (book && ownedBooks.filter(b => b === book.id).length == 0)
                    ownedBooks.push(book.id);
            }
            return { ...state, ownedBooks: ownedBooks }
        }
        case ADD_OWNED_PRODUCT:
        {
            var ownedBooks = state.ownedBooks.slice();
            var splitIds = action.productId.split("_");
            var wasMultiCode = false;
            for (var i = 0; i < splitIds.length; i++)
            {
                var index = parseInt(splitIds[i]);
                if (isNaN(index)) continue;
                Reactotron.log("purchasing " + bookData.books[splitIds[i] - 1].id)
                ownedBooks.push(bookData.books[splitIds[i] - 1].id);
                wasMultiCode = true;
            }
            Reactotron.log('passed loop');
            if (!wasMultiCode)
            {
                var book = bookData.books.filter(b => b.androidIAPCode === action.productId || b.iosIAPCode == action.productId)[0];
                if (book && !ownedBooks.filter(b => b === book.id)[0])
                {
                    ownedBooks.push(book.id);
                }
            }
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
        case SET_ACTIVE_PURCHASE:
        {
            var bookId;
            for (i = 0; i < bookData.books.length; i++)
            {
                if (bookData.books[i].pages)
                {
                    for (j = 0; j < bookData.books[i].pages.length; j++)
                    {
                        if (bookData.books[i].pages[j].id === action.pageId)
                        {
                            bookId = bookData.books[i].id;
                            return { ...state, activePurchase: bookId }
                        }
                    }
                }
            }
            return { ...state, activePurchase: null }
        }
        default: return state;
    }
}
