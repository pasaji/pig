import configureStore from './store/configureStore'
import { addMarket } from './modules/markets'

const store = configureStore()

store.dispatch( addMarket({ exchange: 'poloniex', market: 'ETH/USDT' } ))

export default store
