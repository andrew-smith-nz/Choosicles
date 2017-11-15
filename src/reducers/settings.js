import { TOGGLE_DISPLAY_CHOICE_COUNTERS, SET_DISPLAY_MODE, SET_ENABLE_SOUND_EFFECTS, SET_ENABLE_READ_ALOUD, SET_AUTOPLAY_AUDIO, SET_SHOW_TEXT, SET_SILENT_MODE, RESET_TO_DEFAULTS } from '../actions/settings.js'

export function changeSettings(state = { showChoiceCounters: true, displayMode: 'tablet', enableSoundEffects: true, enableReadAloud: true, enableAutoplayAudio: true, enableShowText: true, enableSilentMode: false }, action)
{
    switch (action.type)
    {
        case TOGGLE_DISPLAY_CHOICE_COUNTERS:
        {
            return { ...state, showChoiceCounters: !state.showChoiceCounters };
        }
        case SET_DISPLAY_MODE:
        {
            return { ...state, displayMode: action.mode };
        }
        case SET_ENABLE_SOUND_EFFECTS:
        {
            return { ...state, enableSoundEffects: action.enabled, enableSilentMode: (state.enableSilentMode && !action.enabled)  };
        }
        case SET_ENABLE_READ_ALOUD:
        {
            return { ...state, enableReadAloud: action.enabled, enableAutoplayAudio: state.enableAutoplayAudio && action.enabled, enableSilentMode: (state.enableSilentMode && !action.enabled)  };
        }
        case SET_AUTOPLAY_AUDIO:
        {
            return { ...state, enableAutoplayAudio: action.enabled, enableReadAloud: true, enableSilentMode: (state.enableSilentMode && !action.enabled) };
        }
        case SET_SHOW_TEXT:
        {
            return { ...state, enableSilentMode: state.enableSilentMode && action.enabled, enableShowText: action.enabled, enableReadAloud: !action.enabled || state.enableReadAloud };
        }
        case SET_SILENT_MODE:
        {
            if (action.enabled)
                return { ...state, enableSilentMode: true, enableSoundEffects: false, enableReadAloud: false, enableAutoplayAudio: false, enableShowText: true}
            else
                return { ...state, enableSilentMode: false, enableSoundEffects: true, enableReadAloud: true}
        }
        case RESET_TO_DEFAULTS:
        {
            return { showChoiceCounters: true, displayMode: 'tablet', enableSoundEffects: true, enableReadAloud: true, enableAutoplayAudio: true, enableShowText: true, enableSilentMode: false };
        }
        default: 
        {
            return state;
        }
    }
}