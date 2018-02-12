import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

// import reducers
import botReducer from '../modules/bot'
import marketsReducer from '../modules/markets'
import traderReducer from '../modules/trader'
import advisorReducer from '../modules/advisor'
import agentReducer from '../modules/agent'

// import exchangesReducer from '../modules/exchanges'
// import exchangeReducer from '../modules/exchange'

// import middlewares
import { createMiddleware as createTraderMiddleware } from '../middlewares/trader-middleware'
import { createMiddleware as createExchangeMiddleware } from '../middlewares/exchange-middleware'
import { createMiddleware as createIndicatorMiddleware } from '../middlewares/indicator-middleware'
import { createMiddleware as createAdvisorMiddleware } from '../middlewares/advisor-middleware'
import { createMiddleware as createLoggerMiddleware } from '../middlewares/logger-middleware'

export default function() {

  const reducer = combineReducers( {
    // exchanges: exchangesReducer,
    // exchange: exchangeReducer,
    bot: botReducer,
    markets: marketsReducer,
    trader: traderReducer,
    advisor: advisorReducer,
    agent: agentReducer
  } )

  const middlewares = applyMiddleware(
    // createMarketMiddleware(),
    createExchangeMiddleware(),
    createIndicatorMiddleware(),
    createAdvisorMiddleware(),
    createTraderMiddleware(),
    createLoggerMiddleware()
  )

  return createStore( reducer, middlewares )
}
