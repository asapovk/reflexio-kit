import { createStore, applyMiddleware, compose, Middleware, combineReducers } from 'redux';
import { appSlice } from '../app/app.config';


appSlice.inject({
  loadUsers: () => new Promise((res, rej) => {
    setTimeout(()=>{
      res([{
          name: 'Invan',
          id: 1
        },
        {
          name: 'Vasya',
          id: 2
        }
    ])
    },1000)
  })
})


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
