// import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
// import rootSaga  from '../sagas';

// const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const middlewares = compose(applyMiddleware(sagaMiddleware), composeEnhancers());

const store = createStore(
    rootReducer,
    composeEnhancers(),
);

// sagaMiddleware.run(rootSaga);

export default store;