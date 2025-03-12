import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers/rootReducer';
import { rootSaga } from '../sagas/rootSaga';

const middlewareSaga = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middlewareSaga)),
);
middlewareSaga.run(rootSaga);

export default store;
