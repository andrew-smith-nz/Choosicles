import { TOGGLE_DISPLAY_CHOICE_COUNTERS, SET_DISPLAY_MODE, SET_ENABLE_SOUND_EFFECTS, SET_ENABLE_READ_ALOUD, SET_AUTOPLAY_AUDIO, SET_NO_TEXT } from '../actions/settings.js'

export function changeSettings(state = { showChoiceCounters: true, displayMode: 'tablet', enableSoundEffects: true, enableReadAloud: true, enableAutoplayAudio: false, enableNoText: false }, action)
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
            return { ...state, enableSoundEffects: action.enabled };
        }
        case SET_ENABLE_READ_ALOUD:
        {
            return { ...state, enableReadAloud: action.enabled };
        }
        case SET_AUTOPLAY_AUDIO:
        {
            return { ...state, enableAutoplayAudio: action.enabled };
        }
        case SET_NO_TEXT:
        {
            return { ...state, enableNoText: action.enabled, enableAutoplayAudio: action.enabled || state.enableAutoplayAudio };
        }
        default: 
        {
            return state;
        }
    }
}