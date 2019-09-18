// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import * as actions from './actions';
import webSocketUtils from '../../services/webSocketUtils';

export function* connectWebSocket$({ payload }: any): Generator<*, *, *> {
	try {
		yield webSocketUtils.connect();
		yield put(actions.connectWebSocketSuccess());
		yield put(actions.listenForNotifications(payload));
	} catch (error) {
		yield put(actions.connectWebSocketFail(error));
	}
}

export function* disconnectWebSocket$(): Generator<*, *, *> {
	try {
		yield webSocketUtils.disconnect();
		yield put(actions.disconnectWebSocketSuccess());
	} catch (error) {
		yield put(actions.disconnectWebSocketFail(error));
	}
}

export function* listenForNotifications$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, callback } = payload;
		const response = yield webSocketUtils.subscribeToChannel(`/${userId}/notifications`, callback);
		yield put(actions.listenForNotificationsSuccess(response.id));
	} catch (error) {
		yield put(actions.listenForNotificationsFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.connectWebSocket, connectWebSocket$),
		takeLatest(actions.disconnectWebSocket, disconnectWebSocket$),
		takeLatest(actions.listenForNotifications, listenForNotifications$),
	]);
}
