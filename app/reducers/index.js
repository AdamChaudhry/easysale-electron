import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import products from './products';
import categories from './category';
import manufacturers from './manufacturer';
import saleHistory from './saleHistory';
import auth from './auth';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    products,
    categories,
    manufacturers,
    saleHistory,
    auth
  });
}
