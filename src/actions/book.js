export const CHANGE_PAGE = "CHANGE_PAGE";
export const BACKTRACK = "BACKTRACK";
export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const CHANGE_NAME = "CHANGE_NAME";

export function changePage(pageId)
{
    return {
            type:CHANGE_PAGE,
            pageId
        };
}

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
