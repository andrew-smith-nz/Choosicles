export const CHANGE_PAGE = "CHANGE_PAGE";
export const BACKTRACK = "BACKTRACK";
export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const CHANGE_NAME = "CHANGE_NAME";
export const INCREMENT_PAGE_COUNTER = "INCREMENT_PAGE_COUNTER";
export const RESET_PAGE_COUNTERS = "RESET_PAGE_COUNTERS";
export const SET_ACTIVE_BOOK = "SET_ACTIVE_BOOK";


export function changePage(pageId) { return { type:CHANGE_PAGE, pageId }; }

export function backtrack()
{
    return {
        type:BACKTRACK
    };
}

export function clearHistory()
{
    return {
        type:CLEAR_HISTORY
    };
}


export function changeName(name)
{
    return {
        type: CHANGE_NAME,
        name
    };
}

export function incrementPageCounter(pageId)
{
    return {
        type: INCREMENT_PAGE_COUNTER,
        pageId
    }
}

export function resetPageCounters(pages)
{
    return {
        type: RESET_PAGE_COUNTERS,
        pages
    }
}

export function setActiveBook(book)
{
    return {
        type: SET_ACTIVE_BOOK,
        book
    }
}