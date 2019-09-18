// @flow

import { NotificationManager } from 'react-notifications';
import { history } from '../store/configureStore';
import { LOGIN } from '../constants/routes';
import { store } from '../index';
import { clearAuth } from '../state/auth/actions';

type ErrorT = {
	response?: {
		status: number,
		data: {
			message: string,
		},
	},
};

export class I18Map {
	static errors = {};
}

// TODO : remove
export const errorNotification = ({ response }: ErrorT, showNotification?: boolean) => {
	let error;
	if (response) {
		error = response.data.message;
		if (response.status === 401) {
			store.dispatch(clearAuth());
			history.push(LOGIN);
		}
	} else {
		error = I18Map.errors.DEFAULT_NETWORK_ERROR;
	}
	showNotification && error && NotificationManager.error(error);
	return error;
};

const localizedError = (error: any) => {
	if (error.response && error.response.status === 401) {
		store.dispatch(clearAuth());
		history.push(LOGIN);
	}
	return error
		? {
				...error,
				response: {
					data: {
						message: I18Map.errors[error.response.data.message] || I18Map.errors.DEFAULT_NETWORK_ERROR,
					},
				},
		  }
		: error;
};

export default localizedError;
