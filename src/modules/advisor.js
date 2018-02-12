import { createAction } from 'redux-actions'

// Constants
export const PREFIX = 'advisor/';
export const ANALYZE = PREFIX + 'ANALYZE'
export const ADVICE = PREFIX + 'ADVICE'
export const REVALIDATE_ADVICE = PREFIX + 'REVALIDATE_ADVICE' // check if advice was correct --> collect bad advices

// Action Creators
export const analyze = createAction(ANALYZE) // analyse market (at index)
export const advice = createAction(ADVICE) // advice trader

// Reducer
export const defaultState = {

};

export default function(state = defaultState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
