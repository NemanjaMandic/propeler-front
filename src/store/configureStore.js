// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import rootReducer from '../state/reducer';
import mySaga from '../state/sagas';

export const history = createBrowserHistory();

const logger = createLogger({});

export default function configureStore(initialState: any) {
	const sagaMiddleware = createSagaMiddleware();
	const reactRouterMiddleware = routerMiddleware(history);
	const middleware = [sagaMiddleware, reactRouterMiddleware];

	if (process.env.NODE_ENV === 'development') {
		middleware.push(logger);
	}

	const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
	sagaMiddleware.run(mySaga);

	return store;
}
