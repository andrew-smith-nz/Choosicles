export const TOGGLE_DISPLAY_CHOICE_COUNTERS = "TOGGLE_DISPLAY_CHOICE_COUNTERS";
export const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";

export function toggleDisplayChoiceCounters()
{
    return {
            type: TOGGLE_DISPLAY_CHOICE_COUNTERS
        };
}

export function setDisplayMode(mode)
{
    return {
            type: SET_DISPLAY_MODE,
            mode
        };
}