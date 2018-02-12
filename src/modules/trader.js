import { createAction } from 'redux-actions'

import { CREATE_ORDER } from './agent'
// Constants
const PREFIX = 'trader/';

// export const constants = { };

// Action Creators

// export const actions = { };

// Reducer

// TODO: balances ovat exhange kohtaisia joten ne pitäisi olla siellä
// traderilla voisi olla kokonaiskooste
export const defaultState = {
  balances: {
    USDT: 1000,
    ETH: 0
  }
}

function updateBalances(state, payload) {
  const { USDT, ETH } = state
  const { type, amount, price } = payload
  const FEE = 0.0015

  if (type === 'buy') {
    return {
      USDT: USDT - amount * price - amount * price * FEE,
      ETH: ETH + amount
    }
  }
  if (type === 'sell') {
    return{
      USDT: USDT + amount * price - FEE * amount * price,
      ETH: ETH - amount
    }
  }
  return state
}

export default function(state = defaultState, action) {
  const { type, payload } = action
  switch ( type ) {
    case CREATE_ORDER:
      return {
        ...state,
        balances: updateBalances(state.balances, payload)
      }
    default:
      return state;
  }
}
