// @flow

import decode from 'jwt-decode';
import { all, takeLatest, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { NotificationManager } from 'react-notifications';
import * as actions from './actions';
import {
	registerAPI,
	loginUserAPI,
	logoutUserAPI,
	forgotPasswordAPI,
	forgotUsernameAPI,
	changePasswordAPI,
	confirmRegistrationAPI,
	checkUsernameAPI,
	rememberMeAPI,
	submitFundraisingProposalAPI,
	submitFundraisingProposalDocAPI,
	uploadFileAPI,
	registerEntrepreneurAPI,
	checkRegistrationTokenAPI,
	registerCompanyInvestorAPI,
	registerIndividualInvestorAPI,
	getPlatformSettingsAPI,
} from '../../services/api';

import {
	USER,
	LOGIN,
	LINK_EXPIRED,
	REGISTER,
	TWO_FACTOR_AUTHENTICATION,
	SUCCESS_SCREEN,
	FAILURE_SCREEN,
} from '../../constants/routes';
import type { LoginDataT } from '../../components/auth/views/Login';
import type { ForgotPasswordT } from '../../components/auth/views/ForgotPassword';
import type { ForgotUsernameT } from '../../components/auth/views/ForgotUsername';
import type { ChangePasswordT } from '../../components/auth/views/ChangePassword';
import type { RegisterDataT } from '../../components/auth/views/Register';
import { errorNotification } from '../../utilities/errorHelpers';
import { open2FADialog, verifyUserLogin, twoFAInit } from '../2FA/actions';
import { VALIDATE, INITIALIZE, REMEMBER_ME } from '../../constants/2FAStatus';
import { disconnectWebSocket } from '../websockets/actions';

export function* redirectToLogin$(): Generator<*, *, *> {
	yield put(actions.clearAuth());
	yield put(push(LOGIN));
}

export function* logoutUser$(): Generator<*, *, *> {
	try {
		const response = yield logoutUserAPI();
		if (response) {
			yield put(actions.clearAuth());
			yield put(disconnectWebSocket());
		}
	} catch (error) {
		yield put(actions.logoutUserFail(errorNotification(error, false)));
	}
}

export function* loginUser$({ payload }: { payload: LoginDataT }): Generator<*, *, *> {
	try {
		const response = yield loginUserAPI(payload);
		const { jwt, token, twoFAStatus } = response.data;
		switch (twoFAStatus) {
			case INITIALIZE: {
				yield put(twoFAInit({ token, twoFAStatus }));
				yield put(push(TWO_FACTOR_AUTHENTICATION));
				break;
			}
			case REMEMBER_ME: {
				const response = yield rememberMeAPI({ token });
				const { jwt } = response.data;
				const { sub, username, role } = decode(jwt);
				yield put(actions.loginUserSuccess({ jwt, sub, username, role }));
				yield put(push(USER));
				break;
			}
			case VALIDATE:
				yield put(open2FADialog({ action: verifyUserLogin, token, remember: true }));
				break;
			default:
				yield put(actions.loginUserSuccess(jwt));
				yield put(push(USER));
				break;
		}
	} catch (error) {
		yield put(actions.loginUserFail(errorNotification(error, true)));
	}
}

export function* forgotPassword$({ payload }: { payload: ForgotPasswordT }): Generator<*, *, *> {
	try {
		const response = yield forgotPasswordAPI(payload);
		yield put(actions.forgotPasswordSuccess(response.data));
	} catch (error) {
		yield put(actions.forgotPasswordFail(errorNotification(error, true)));
	}
}

export function* changePassword$({ payload }: { payload: ChangePasswordT }): Generator<*, *, *> {
	try {
		const response = yield changePasswordAPI(payload);
		yield put(actions.changePasswordSuccess(response));
	} catch (error) {
		yield put(actions.changePasswordFail(errorNotification(error, true)));
	}
}

export function* forgotUsername$({ payload }: { payload: ForgotUsernameT }): Generator<*, *, *> {
	try {
		const response = yield forgotUsernameAPI(payload);
		yield put(actions.forgotUsernameSuccess(response));
	} catch (error) {
		yield put(actions.forgotUsernameFail(errorNotification(error, true)));
	}
}

export function* registerUser$({ payload }: { payload: RegisterDataT }): Generator<*, *, *> {
	try {
		const response = yield registerAPI(payload);
		yield put(actions.registerUserSuccess(response));
	} catch (error) {
		yield put(actions.registerUserFail(errorNotification(error, true)));
	}
}

export function* registerEntrepreneur$({ payload }: { payload: RegisterDataT }): Generator<*, *, *> {
	try {
		const response = yield registerEntrepreneurAPI(payload);
		yield put(actions.registerEntrepreneurSuccess(response));
	} catch (error) {
		yield put(actions.registerEntrepreneurFail(errorNotification(error, true)));
	}
}

export function* registerCompanyInvestor$({ payload }: { payload: RegisterDataT }): Generator<*, *, *> {
	try {
		const response = yield registerCompanyInvestorAPI(payload);
		yield put(actions.registerCompanyInvestorSuccess(response));
	} catch (error) {
		yield put(actions.registerCompanyInvestorFail(errorNotification(error, true)));
	}
}

export function* registerIndividualInvestor$({ payload }: { payload: RegisterDataT }): Generator<*, *, *> {
	try {
		const response = yield registerIndividualInvestorAPI(payload);
		yield put(actions.registerIndividualInvestorSuccess(response));
	} catch (error) {
		yield put(actions.registerIndividualInvestorFail(errorNotification(error, true)));
	}
}
export function* checkUsername$({ payload }: { payload: string }): Generator<*, *, *> {
	try {
		const response = yield checkUsernameAPI(payload);
		yield put(actions.checkUsernameFail(errorNotification(response, false)));
	} catch (error) {
		yield put(actions.checkUsernameSuccess(error));
	}
}

export function* confirmRegistration$({ payload }: any): Generator<*, *, *> {
	try {
		yield confirmRegistrationAPI(payload);
		yield put(actions.confirmRegistrationSuccess());
		yield put(push(LOGIN));
		NotificationManager.success('Email successfully confirmed! You can log in now!');
	} catch (error) {
		yield put(actions.confirmRegistrationFail());
		yield put(push(LINK_EXPIRED, { path: REGISTER }));
	}
}

export function* submitFundraisingProposal$({ payload }: any): Generator<*, *, *> {
	try {
		const { data, docData } = payload;
		const response = yield submitFundraisingProposalAPI(data);
		yield put(actions.submitFundraisingProposalSuccess());
		yield all(
			docData.map(doc =>
				put(
					actions.submitFundraisingProposalDoc({
						proposalId: response.data.id,
						docData: doc,
					}),
				),
			),
		);
	} catch (error) {
		yield put(actions.submitFundraisingProposalFail(error));
	}
}

export function* submitFundraisingProposalDoc$({ payload }: any): Generator<*, *, *> {
	try {
		const { proposalId, docData } = payload;
		yield submitFundraisingProposalDocAPI(proposalId, docData);
		yield put(actions.submitFundraisingProposalDocSuccess());
		yield put(
			push({
				pathname: SUCCESS_SCREEN,
				state: { success: true, info: 'INFO_SUCCESS_SCREEN' },
			}),
		);
	} catch (error) {
		yield put(actions.submitFundraisingProposalDocFail(error));
		yield put(
			push({
				pathname: FAILURE_SCREEN,
				state: { success: false, info: 'INFO_FAILURE_SCREEN' },
			}),
		);
		NotificationManager.error('Submit fundraising proposal failed', '', 3000);
	}
}

export function* uploadFundraisingProposalDocument$({ payload }: any): Generator<*, *, *> {
	const { docType, data } = payload;
	try {
		const response = yield uploadFileAPI(data);
		yield put(
			actions.uploadFundraisingProposalDocSuccess({
				docType,
				url: response.data,
			}),
		);
	} catch (error) {
		yield put(actions.uploadFundraisingProposalDocFail({ error, docType }));
	}
}

export function* checkRegistrationToken$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield checkRegistrationTokenAPI(payload);
		yield put(actions.checkRegistrationTokenSuccess(response.data));
	} catch (error) {
		yield put(actions.checkRegistrationTokenFail(error));
	}
}

export function* getPlatformSettings$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getPlatformSettingsAPI(payload);
		const { data } = response;
		yield put(actions.getPlatformSettingsSuccess(data));
	} catch (error) {
		yield put(actions.getPlatformSettingsFail(errorNotification(error, false)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.logoutUser, logoutUser$),
		takeLatest(actions.redirectToLogin, redirectToLogin$),
		takeLatest(actions.loginUser, loginUser$),
		takeLatest(actions.forgotPassword, forgotPassword$),
		takeLatest(actions.changePassword, changePassword$),
		takeLatest(actions.forgotUsername, forgotUsername$),
		takeLatest(actions.registerUser, registerUser$),
		takeLatest(actions.checkUsername, checkUsername$),
		takeLatest(actions.confirmRegistration, confirmRegistration$),
		takeLatest(actions.submitFundraisingProposal, submitFundraisingProposal$),
		takeEvery(actions.submitFundraisingProposalDoc, submitFundraisingProposalDoc$),
		takeLatest(actions.uploadFundraisingProposalDoc, uploadFundraisingProposalDocument$),
		takeLatest(actions.registerEntrepreneur, registerEntrepreneur$),
		takeLatest(actions.checkRegistrationToken, checkRegistrationToken$),
		takeLatest(actions.registerCompanyInvestor, registerCompanyInvestor$),
		takeLatest(actions.registerIndividualInvestor, registerIndividualInvestor$),
		takeLatest(actions.getPlatformSettings, getPlatformSettings$),
	]);
}
