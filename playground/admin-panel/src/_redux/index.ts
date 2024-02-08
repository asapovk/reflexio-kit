import { createStore, applyMiddleware, compose, Middleware, combineReducers } from 'redux';
import { appSlice } from '../app/app.config';


const rootReducer = combineReducers({
  ...appSlice.reducer,

});


function configureStore() {
  const middlewares: Middleware[] = [
    appSlice.middleware,
  ];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
const store = configureStore();

export const dispatch = store.dispatch;
export default store;
