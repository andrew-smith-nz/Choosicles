import { CHANGE_PAGE, BACKTRACK, CLEAR_HISTORY, CHANGE_NAME, INCREMENT_PAGE_COUNTER, RESET_PAGE_COUNTERS, SET_ACTIVE_BOOK, CHANGE_TEXT } from '../actions/book.js'

import Reactotron from 'reactotron-react-native';

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

export function changePage(state = { activeBookId: null, pageData: null, pageHistory:[], direction: 'forward', currentText: 0, isOwned:false }, action)
{
    switch(action.type)
    {
        case SET_ACTIVE_BOOK:
        {
            var owned = false;
            for (i = 0; i < bookData.books.length; i++)
            {
                if (bookData.books[i].id === action.book.id)
                {
                    owned = bookData.books[i].owned;
                }
            }
            return { ...state, activeBook: action.book, isOwned: owned }
        }
        case CHANGE_PAGE: 
        {
            let pageData = getPageData(action.pageId);
            //let pageData = getPageByNumber(31);
            if (pageData)
            {
                let history = [];
                if (state.pageHistory)
                    history = state.pageHistory.slice();
                if (history.length === 0 || history[history.length - 1].id != action.pageId)
                    history.push(pageData);
                return { ...state, pageData: pageData, pageHistory: history, direction: 'forward', currentText: 0 };  
            }
            else
            {
                return state;
            }
        }
        case CHANGE_TEXT:
        {
            return {...state, currentText:state.currentText + action.increment};   
        }
        case BACKTRACK: 
        {
            let history = state.pageHistory.slice();
            if (history.length > 0)
            {
                history.pop();
                var currentText = history[history.length - 1].texts.length - 1;
                return { ...state, pageData: history[history.length - 1], pageHistory: history, direction: 'backward', currentText: history[history.length - 1].texts.length - 1 };  
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
    for (i = 1; i < bookData.books.length; i++)
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