import { CHANGE_PAGE, BACKTRACK, CLEAR_HISTORY, CHANGE_NAME, INCREMENT_PAGE_COUNTER, RESET_PAGE_COUNTERS, SET_ACTIVE_BOOK } from '../actions/book.js'

const bookData = require('../../books.json');

export function pageCounters(state = { pageCounters: [] }, action)
{
    switch (action.type)
    {
        case INCREMENT_PAGE_COUNTER:
        {
            var pageCounters = [];
            var found = false;
            for (i = 0; i < state.pageCounters.length; i++)
            {
                if (state.pageCounters[i].pageId === action.pageId)
                {
                    state.pageCounters[i].count++;
                    found = true;
                }
                pageCounters.push(state.pageCounters[i]);
            }
            if (!found)
                pageCounters.push({ pageId: action.pageId, count: 1 });
            return { pageCounters: pageCounters };
        }
        case RESET_PAGE_COUNTERS:
        {
            var pageCounters = [];
            for (i = 0; i < state.length; i++)
            {
                if (action.pages.filter(p => p.id === state[i].pageId).length === 0)
                pageCounters.push(state[i]);
            }
            return { pageCounters: pageCounters };
        }
        default: return state;
    }
}

export function changeName(state = { name: "" }, action)
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

export function changePage(state = { activeBookId: null, pageData: null, pageHistory:[], direction: 'forward' }, action)
{
    switch(action.type)
    {
        case SET_ACTIVE_BOOK:
        {
            return { ...state, activeBook: action.book }
        }
        case CHANGE_PAGE: 
        {
            //let pageData = getPageData(action.pageId);
            let pageData = getPageByNumber(20);
            if (pageData)
            {
                let history = [];
                if (state.pageHistory)
                    history = state.pageHistory.slice();
                history.push(pageData);
                return { ...state, pageData: pageData, pageHistory: history, direction: 'forward' };  
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
                return { ...state, pageData: history[history.length - 1], pageHistory: history, direction: 'backward' };  
            }
            else
            {
                //this.props.navigation.navigate("MainMenu");
                return { ...state, pageData: null, pageHistory: [], direction: 'backward' };
            }            
        }
        case CLEAR_HISTORY:
        {
            return {...state, pageData: state.pageData, pageHistory: [], direction: 'forward'};
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

function getPageByNumber(pageNumber)
{
    for (i = 0; i < bookData.books.length; i++)
    {
        for (j = 0; j < bookData.books[i].pages.length; j++)
        {
            if (bookData.books[i].pages[j].pageNumber === pageNumber)
            {
                return bookData.books[i].pages[j];
            }
        }
    }
    return null;
}