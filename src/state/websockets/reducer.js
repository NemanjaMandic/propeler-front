// @flow

import * as actions from './actions';
import initialState from './initialState';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case actions.WEB_SOCKET_CONNECT:
		case actions.WEB_SOCKET_DISCONNECT:
			return {
				...state,
				inProgress: true,
			};
		case actions.WEB_SOCKET_CONNECT_SUCCESS:
			return {
				...state,
				inProgress: false,
				isConnected: true,
			};
		case actions.WEB_SOCKET_DISCONNECT_SUCCESS:
			return {
				...state,
				inProgress: false,
				isConnected: false,
			};
		case actions.WEB_SOCKET_CONNECT_FAIL:
		case actions.WEB_SOCKET_DISCONNECT_FAIL:
			return {
				...state,
				inProgress: false,
				errors: payload,
			};
		case actions.LISTEN_FOR_NOTIFICATIONS:
		case actions.LISTEN_FOR_NOTIFICATIONS_SUCCESS:
		case actions.LISTEN_FOR_NOTIFICATIONS_FAIL:
			return state;
		default:
			return state;
	}
};
