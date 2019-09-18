import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import RedBox from 'redbox-react';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import configureStore, { history } from './store/configureStore';
import i18n from './i18n';

export const store = configureStore();
const persistor = persistStore(store);
const rootEl = document.getElementById('root');

let render = () => {
	ReactDOM.render(
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ConnectedRouter history={history} store={store}>
						<App history={history} />
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		</I18nextProvider>,
		rootEl,
	);
};

if (module.hot) {
	const renderApp = render;
	const renderError = error => {
		ReactDOM.render(<RedBox error={error} />, rootEl);
	};

	render = () => {
		try {
			renderApp();
		} catch (error) {
			renderError(error);
		}
	};

	module.hot.accept('./App', () => {
		setTimeout(render);
	});
}

render();
