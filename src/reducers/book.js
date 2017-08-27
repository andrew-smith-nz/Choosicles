import { CHANGE_PAGE, BACKTRACK, CLEAR_HISTORY, CHANGE_NAME } from '../actions/book.js'

const bookData = require('../../books.json');

export function changeName(state = { name: "fart" }, action)
{
    switch(action.type)
    {
        case CHANGE_NAME: 
        {
            return {name: action.name};
        }
        default: return state;
    }
}

export function changePage(state = { pageData: null, pageHistory:[], direction: 'forward' }, action)
{
    switch(action.type)
    {
        case CHANGE_PAGE: 
        {
            let pageData = getPageData(action.pageId);
            if (pageData)
            {
                let history = state.pageHistory.slice();
                history.push(pageData);
                return { pageData: pageData, pageHistory: history, direction: 'forward' };  
            }
            else
            {
                return state;
            }
        }
        case BACKTRACK: 
        {
            let history = state.pageHistory.slice();
            if (history.length > 0)
            {
                history.pop();
                return { pageData: history[history.length - 1], pageHistory: history, direction: 'backward' };  
            }
            else
            {
                //this.props.navigation.navigate("MainMenu");
                return { pageData: null, pageHistory: [], direction: 'backward' };
            }            
        }
        case CLEAR_HISTORY:
        {
            return {pageData: state.pageData, pageHistory: [], direction: 'forward'};
        }
        default:
            return state;
    }
}

function getPageData(pageId)
{
    for (i = 0; i < bookData.books.length; i++)
    {
        for (j = 0; j < bookData.books[i].pages.length; j++)
        {
            if (bookData.books[i].pages[j].id === pageId)
            {
                return bookData.books[i].pages[j];
            }
        }
    }
    return null;
}