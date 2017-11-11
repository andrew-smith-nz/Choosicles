export const TOGGLE_DISPLAY_CHOICE_COUNTERS = "TOGGLE_DISPLAY_CHOICE_COUNTERS";
export const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";
export const SET_ENABLE_SOUND_EFFECTS = "SET_ENABLE_SOUND_EFFECTS";
export const SET_ENABLE_READ_ALOUD = "SET_ENABLE_READ_ALOUD";
export const SET_AUTOPLAY_AUDIO = "SET_AUTOPLAY_AUDIO";
export const SET_SHOW_TEXT = "SET_SHOW_TEXT";
export const SET_SILENT_MODE = "SET_SILENT_MODE";
export const RESET_TO_DEFAULTS = "RESET_TO_DEFAULTS";

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

export function setAutoplayAudio(enabled)
{
    return {
            type: SET_AUTOPLAY_AUDIO,
            enabled
        };
}

export function setShowText(enabled)
{
    return {
            type: SET_SHOW_TEXT,
            enabled
        };
}

export function setSilentMode(enabled)
{
    return {
            type: SET_SILENT_MODE,
            enabled
        };
}

export function resetToDefaults()
{
    return {
            type: RESET_TO_DEFAULTS
        };
}