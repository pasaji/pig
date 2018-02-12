import configureStore from './store/configureStore'
import { addMarket } from './modules/markets'

const POLONIEX_USDT_ETH = 'POLONIEX_USDT_ETH'
const POLONIEX_USDT_BTC = 'POLONIEX_USDT_BTC'

const store = configureStore()

store.dispatch(addMarket({ id: POLONIEX_USDT_ETH, exchange: 'poloniex', market: 'ETH/USDT' }))
// store.dispatch(addMarket({ id: POLONIEX_USDT_BTC, exchange: 'poloniex', market: 'BTC/USDT' }))

export default store
