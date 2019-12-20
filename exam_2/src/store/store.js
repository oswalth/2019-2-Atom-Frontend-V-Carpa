import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers/reducers'

const middleWare = applyMiddleware(thunk);

const store = createStore(reducers, middleWare)
export default store;
