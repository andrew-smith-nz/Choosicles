import { TOGGLE_DISPLAY_CHOICE_COUNTERS, RESET_CHOICE_COUNTERS } from '../actions/settings.js'

export function changeSettings(state = { showChoiceCounters: true }, action)
{
    switch (action.type)
    {
        case TOGGLE_DISPLAY_CHOICE_COUNTERS:
        {
            return { ...state, showChoiceCounters: !state.showChoiceCounters };
        }
        default: 
        {
            return state;
        }
    }
}