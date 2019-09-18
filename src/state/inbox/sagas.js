// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import * as actions from './actions';
import {
	getNumberOfUnseenNotificationsAPI,
	getAllUserNotificationsAPI,
	changeNotificationStatusAPI,
	deleteNotificationAPI,
} from '../../services/api';

export function* getNumberOfUnseenNotifications$(): Generator<*, *, *> {
	try {
		const { data } = yield getNumberOfUnseenNotificationsAPI();
		yield put(actions.getNumberOfUnseenNotificationsSuccess(data));
	} catch (error) {
		yield put(actions.getNumberOfUnseenNotificationsFail(error));
	}
}

export function* getAllNotifications$({ payload }: any): Generator<*, *, *> {
	try {
		const { pageNumber, filter, size } = payload;
		const response = yield getAllUserNotificationsAPI({
			page: pageNumber,
			filter,
			size,
		});
		yield put(actions.getAllNotificationsSuccess(response.data));
	} catch (error) {
		yield put(actions.getAllNotificationsFail(error));
	}
}

export function* markNotificationAsRead$({ payload }: any): Generator<*, *, *> {
	try {
		yield changeNotificationStatusAPI(payload);
		yield put(actions.markNotificationAsReadSuccess(payload));
	} catch (error) {
		yield put(actions.markNotificationAsReadFail(error));
	}
}

export function* markNotificationAsUnRead$({ payload }: any): Generator<*, *, *> {
	try {
		yield changeNotificationStatusAPI(payload);
		yield put(actions.markNotificationAsUnReadSuccess(payload));
	} catch (error) {
		yield put(actions.markNotificationAsUnReadFail(error));
	}
}

export function* deleteNotification$({ payload }: any): Generator<*, *, *> {
	try {
		const { pageNumber, filter, size, id } = payload;
		yield deleteNotificationAPI(id);
		yield put(actions.deleteNotificationSuccess());
		yield put(actions.getAllNotifications({ pageNumber, filter, size }));
	} catch (error) {
		yield put(actions.deleteNotificationFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.getNumberOfUnseenNotifications, getNumberOfUnseenNotifications$),
		takeLatest(actions.getAllNotifications, getAllNotifications$),
		takeLatest(actions.markNotificationAsRead, markNotificationAsRead$),
		takeLatest(actions.markNotificationAsUnRead, markNotificationAsUnRead$),
		takeLatest(actions.deleteNotification, deleteNotification$),
	]);
}
