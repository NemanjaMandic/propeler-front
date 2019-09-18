// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import decode from 'jwt-decode';
import {
	verifyLoginAPI,
	verifyPasswordChangeAPI,
	verifyChangeEmailProfileAPI,
	generateNewSecretAPI,
	verifyNewSecretAPI,
	initiateNewSecretAPI,
	createSecretAPI,
	verifySecretAPI,
	deleteCampaignAPI,
} from '../../services/api';
import { ADMIN, INVESTOR, USER } from '../../constants/routes';
import { errorNotification } from '../../utilities/errorHelpers';
import * as actions2FA from './actions';
import { clearAuth, loginUserFail, loginUserSuccess } from '../auth/actions';
import {
	changePasswordProfileFail,
	changePasswordProfileSuccess,
	changeEmailProfileSuccess,
	changeEmailProfileFail,
} from '../user/profile/actions';
import { deleteCampaignSuccess, deleteCampaignFail } from '../campaign/actions';
import { ROLE_CORPORATE_INVESTOR, ROLE_ENTREPRENEUR, ROLE_INDIVIDUAL_INVESTOR } from '../../constants/roles';

export function* verifyUserLogin$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield verifyLoginAPI(payload);
		const { jwt } = response.data;
		const { sub, username, role } = decode(jwt);
		yield put(loginUserSuccess({ jwt, sub, username, role }));
		yield put(actions2FA.close2FADialog());
		switch (role) {
			case ROLE_ENTREPRENEUR:
				yield put(push(USER));
				break;
			case ROLE_CORPORATE_INVESTOR:
			case ROLE_INDIVIDUAL_INVESTOR:
				yield put(push(INVESTOR));
				break;
			default:
				yield put(push(ADMIN));
		}
	} catch (error) {
		yield put(loginUserFail(errorNotification(error, true)));
	}
}

export function* verifyChangeEmailProfile$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, ...data } = payload;
		yield verifyChangeEmailProfileAPI(userId, data);
		yield put(changeEmailProfileSuccess());
		NotificationManager.success(
			"In a moment, you'll get an email with instructions on how to confirm your new email.",
			'',
			8000,
		);
		yield put(actions2FA.close2FADialog());
	} catch (error) {
		yield put(changeEmailProfileFail(errorNotification(error, true)));
	}
}

export function* verifyPasswordChange$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, token, ...data } = payload;
		yield verifyPasswordChangeAPI(userId, data);
		yield put(changePasswordProfileSuccess());
		NotificationManager.success('Password successfully changed', '', 3000);
		yield put(actions2FA.close2FADialog());
		yield put(clearAuth());
	} catch (error) {
		yield put(changePasswordProfileFail(errorNotification(error, true)));
	}
}

export function* createSecret$({ payload }: { payload: any }): Generator<*, *, *> {
	try {
		const response = yield createSecretAPI(payload);
		yield put(actions2FA.createSecretSuccess(response.data));
	} catch (error) {
		yield put(actions2FA.createSecretFail(errorNotification(error, true)));
	}
}

export function* verifySecret$({ payload }: { payload: any }): Generator<*, *, *> {
	try {
		const response = yield verifySecretAPI(payload);
		yield put(actions2FA.verifySecretSuccess(response.data));
	} catch (error) {
		yield put(actions2FA.verifySecretFail(errorNotification(error, true)));
	}
}

export function* initiateNewSecret$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, ...data } = payload;
		const response = yield initiateNewSecretAPI(userId, data);
		const { token } = response.data;
		yield put(actions2FA.initiateNewSecretSuccess());
		yield put(actions2FA.open2FADialog({ action: actions2FA.generateNewSecret, token }));
	} catch (error) {
		yield put(actions2FA.initiateNewSecretFail(errorNotification(error, true)));
	}
}

export function* generateNewSecret$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, ...data } = payload;
		const response = yield generateNewSecretAPI(userId, data);
		const { secret } = response.data;
		yield put(actions2FA.generateNewSecretSuccess(secret));
		yield put(actions2FA.close2FADialog());
	} catch (error) {
		yield put(actions2FA.generateNewSecretFail(errorNotification(error, true)));
	}
}

export function* verifyNewSecret$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, ...data } = payload;
		yield verifyNewSecretAPI(userId, data);
		yield put(actions2FA.verifyNewSecretSuccess());
		NotificationManager.success('Secret successfully changed', '', 3000);
	} catch (error) {
		yield put(actions2FA.verifyNewSecretFail(errorNotification(error, true)));
	}
}

export function* verifyCampaignDeletion$({ payload }: any): Generator<*, *, *> {
	try {
		const { token, ...data } = payload;
		yield deleteCampaignAPI(token, data);
		yield put(deleteCampaignSuccess());
		yield put(actions2FA.close2FADialog());
		yield put(push(USER));
	} catch (error) {
		yield put(deleteCampaignFail(errorNotification(error, true)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions2FA.verifyUserLogin, verifyUserLogin$),
		takeLatest(actions2FA.verifyChangeEmailProfile, verifyChangeEmailProfile$),
		takeLatest(actions2FA.verifyPasswordChange, verifyPasswordChange$),
		takeLatest(actions2FA.generateNewSecret, generateNewSecret$),
		takeLatest(actions2FA.verifyNewSecret, verifyNewSecret$),
		takeLatest(actions2FA.initiateNewSecret, initiateNewSecret$),
		takeLatest(actions2FA.createSecret, createSecret$),
		takeLatest(actions2FA.verifySecret, verifySecret$),
		takeLatest(actions2FA.verifyCampaignDeletion, verifyCampaignDeletion$),
	]);
}
