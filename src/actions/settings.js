export const TOGGLE_DISPLAY_CHOICE_COUNTERS = "TOGGLE_DISPLAY_CHOICE_COUNTERS";
export const RESET_CHOICE_COUNTERS = "RESET_CHOICE_COUNTERS";

export function toggleDisplayChoiceCounters()
{
    return {
            type: TOGGLE_DISPLAY_CHOICE_COUNTERS
        };
}

export function resetChoiceCounters()
{
    return {
            type: RESET_CHOICE_COUNTERS
        };
}
