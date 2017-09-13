export const TOGGLE_DISPLAY_CHOICE_COUNTERS = "TOGGLE_DISPLAY_CHOICE_COUNTERS";
export const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";
export const SET_ENABLE_SOUND_EFFECTS = "SET_ENABLE_SOUND_EFFECTS";
export const SET_ENABLE_READ_ALOUD = "SET_ENABLE_READ_ALOUD";

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

export function setEnableSoundEffects(enabled)
{
    return {
            type: SET_ENABLE_SOUND_EFFECTS,
            enabled
        };
}

export function setEnableReadAloud(enabled)
{
    return {
            type: SET_ENABLE_READ_ALOUD,
            enabled
        };
}