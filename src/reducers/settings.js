import { TOGGLE_DISPLAY_CHOICE_COUNTERS, SET_DISPLAY_MODE } from '../actions/settings.js'

export function changeSettings(state = { showChoiceCounters: true, displayMode: 'tablet' }, action)
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
        default: 
        {
            return state;
        }
    }
}