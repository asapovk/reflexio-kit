import { createStore, applyMiddleware, compose, Middleware, combineReducers } from 'redux';
import { appSlice } from '../app/app.config';
import { loadUsers } from '../_utils/loadUsers.dev';
import { usersSlice } from '../users/users.config';
import { eventManagerSlice } from '../app/event-manager.comfig';

usersSlice.inject({
  loadUsers: loadUsers
})


const rootReducer = combineReducers({
  ...appSlice.reducer,
  ...usersSlice.reducer
});


function configureStore() {
  const middlewares: Middleware[] = [
    eventManagerSlice.middleware,
    appSlice.middleware,
    usersSlice.middleware
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
