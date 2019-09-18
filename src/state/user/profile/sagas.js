// @flow

import { all, takeLatest, put, delay, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import {
	changePasswordProfile,
	changePasswordProfileFail,
	getUserInfo,
	getUserInfoSuccess,
	getUserInfoFail,
	changeUserProfile,
	changeUserProfileSuccess,
	changeUserProfileFail,
	uploadProfilePhoto,
	uploadProfilePhotoSuccess,
	uploadProfilePhotoFail,
	getProfilePhoto,
	getProfilePhotoSuccess,
	getProfilePhotoFail,
	deleteProfilePhoto,
	deleteProfilePhotoSuccess,
	deleteProfilePhotoFail,
	changeEmailProfile,
	changeEmailProfileFail,
	confirmEmailChange,
	confirmEmailChangeSuccess,
	confirmEmailChangeFail,
	recoveryCode,
	recoveryCodeSuccess,
	recoveryCodeFail,
	uploadKycFrontPhotoSuccess,
	uploadKycFrontPhotoFail,
	uploadKycFrontPhoto,
	uploadKycBackPhotoSuccess,
	uploadKycBackPhotoFail,
	uploadKycBackPhoto,
	submitKYCRequest,
	submitKYCRequestSuccess,
	submitKYCRequestFail,
	uploadKYCCompanyInvestorDocument,
	uploadKYCCompanyInvestorDocumentSuccess,
	uploadKYCCompanyInvestorDocumentFail,
	getKYCforCurrentUser,
	getKYCforCurrentUserSuccess,
	getKYCforCurrentUserFail,
	getKYCDocForCurrentUser,
	getKYCDocForCurrentUserSuccess,
	getKYCDocForCurrentUserFail,
} from './actions';

import {
	initializePasswordChangeAPI,
	getUserInfoAPI,
	changeUserProfileAPI,
	uploadProfilePhotoAPI,
	getProfilePhotoAPI,
	deleteProfilePhotoAPI,
	changeEmailProfileAPI,
	confirmEmailChangeAPI,
	recoveryCodeAPI,
	uploadFileAPI,
	submitPersonalDocumentsAPI,
	submitKYCRequestAPI,
	getKYCforCurrentUserAPI,
	getFileAPI,
} from '../../../services/api';
import { CHANGE_EMAIL_PROFILE, LINK_EXPIRED, USER } from '../../../constants/routes';
import {
	open2FADialog,
	verifyPasswordChange,
	verifyChangeEmailProfile,
	close2FADialog,
	openNewRecoveryCodeDialog,
} from '../../2FA/actions';

export function* changePassword$({ payload }: any): Generator<*, *, *> {
	try {
		yield initializePasswordChangeAPI(payload.userId, payload.submittedData);
		yield put(open2FADialog({ action: verifyPasswordChange }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(changePasswordProfileFail(error));
	}
}

export function* getUserInfo$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getUserInfoAPI(payload);
		if (response.data.profilePictureUrl) {
			yield put(getProfilePhoto(payload));
		}
		yield put(getUserInfoSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(getUserInfoFail(error));
	}
}

export function* changeUserProfile$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield changeUserProfileAPI(payload.userId, payload.submittedData);
		yield put(changeUserProfileSuccess(response.data));
		NotificationManager.success('User profile info successfully changed', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(changeUserProfileFail(error));
	}
}

export function* uploadProfilePhoto$({ payload }: any): Generator<*, *, *> {
	try {
		const {
			userId,
			files: { base64, ...data },
		} = payload;
		yield uploadProfilePhotoAPI(userId, data);
		yield put(uploadProfilePhotoSuccess(base64));
		NotificationManager.success('Profile photo successfully uploaded', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);

		yield put(uploadProfilePhotoFail(error));
	}
}

export function* getProfilePhoto$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getProfilePhotoAPI(payload);
		yield put(getProfilePhotoSuccess(response.data));
	} catch (error) {
		yield put(getProfilePhotoFail(error));
	}
}

export function* deleteProfilePhoto$({ payload }: any): Generator<*, *, *> {
	try {
		yield deleteProfilePhotoAPI(payload);
		yield put(deleteProfilePhotoSuccess());
		NotificationManager.success('Profile photo deleted', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(deleteProfilePhotoFail(error));
	}
}

export function* changeEmail$({ payload }: any): Generator<*, *, *> {
	try {
		yield changeEmailProfileAPI(payload.userId, payload.data);
		yield put(open2FADialog({ action: verifyChangeEmailProfile }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(changeEmailProfileFail(error));
	}
}

export function* confirmEmailChange$({ payload }: any): Generator<*, *, *> {
	try {
		yield confirmEmailChangeAPI(payload);
		yield put(confirmEmailChangeSuccess());
		yield put(push(USER));
		NotificationManager.success('Email successfully confirmed!');
	} catch (error) {
		yield put(confirmEmailChangeFail());
		yield put(push(LINK_EXPIRED, { path: CHANGE_EMAIL_PROFILE }));
	}
}

export function* recoveryCode$({ payload }: any): Generator<*, *, *> {
	try {
		const { userId, token, ...data } = payload;
		const response = yield recoveryCodeAPI(userId, data);
		yield put(recoveryCodeSuccess(response.data.wildcards));
		yield put(close2FADialog());
		yield put(openNewRecoveryCodeDialog());
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(recoveryCodeFail(error));
	}
}

export function* uploadKycFrontPhoto$({ payload }: any): Generator<*, *, *> {
	try {
		const { base64, ...data } = payload;
		const response = yield uploadFileAPI(data);
		yield put(uploadKycFrontPhotoSuccess({ file: base64, url: response.data }));
		NotificationManager.success('Front side photo successfully uploaded', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(uploadKycFrontPhotoFail(error));
	}
}

export function* uploadKycBackPhoto$({ payload }: any): Generator<*, *, *> {
	try {
		const { base64, ...data } = payload;
		const response = yield uploadFileAPI(data);
		yield put(uploadKycBackPhotoSuccess({ file: base64, url: response.data }));
		NotificationManager.success('Back side photo successfully uploaded', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(uploadKycBackPhotoFail(error));
	}
}

export function* submitKYCRequest$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield submitKYCRequestAPI(payload);
		yield put(submitKYCRequestSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(submitKYCRequestFail(error));
	}
}

export function* uploadKYCCompanyInvestorDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { data } = payload;
		const response = yield uploadFileAPI(data);
		yield put(
			uploadKYCCompanyInvestorDocumentSuccess({
				url: response.data,
				title: data.name,
			}),
		);
		NotificationManager.success('KYC company investor document uploaded', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(uploadKYCCompanyInvestorDocumentFail(error));
	}
}

export function* getKYCforCurrentUser$(): Generator<*, *, *> {
	try {
		const response = yield getKYCforCurrentUserAPI();
		console.log(response);
		yield all(response.data.userDocuments.map(file => put(getKYCDocForCurrentUser({ file }))));
		yield put(getKYCforCurrentUserSuccess(response.data));
	} catch (error) {
		//NotificationManager.error(error.response.data.message, "", 3000);
		yield put(getKYCforCurrentUserFail(error));
	}
}

export function* getKYCDocForCurrentUser$({ payload }: any): Generator<*, *, *> {
	const {
		file: { url, type, title },
	} = payload;
	try {
		const { data } = yield getFileAPI(url);
		yield put(
			getKYCDocForCurrentUserSuccess({
				data: { ...data, url, type, title },
			}),
		);
	} catch (error) {
		//NotificationManager.error(error.response.data.message, "", 3000);
		yield put(getKYCDocForCurrentUserFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(changePasswordProfile, changePassword$),
		takeLatest(getUserInfo, getUserInfo$),
		takeLatest(changeUserProfile, changeUserProfile$),
		takeLatest(uploadProfilePhoto, uploadProfilePhoto$),
		takeLatest(getProfilePhoto, getProfilePhoto$),
		takeLatest(deleteProfilePhoto, deleteProfilePhoto$),
		takeLatest(changeEmailProfile, changeEmail$),
		takeLatest(confirmEmailChange, confirmEmailChange$),
		takeLatest(recoveryCode, recoveryCode$),
		takeLatest(uploadKycFrontPhoto, uploadKycFrontPhoto$),
		takeLatest(uploadKycBackPhoto, uploadKycBackPhoto$),
		takeLatest(submitKYCRequest, submitKYCRequest$),
		takeLatest(uploadKYCCompanyInvestorDocument, uploadKYCCompanyInvestorDocument$),
		takeLatest(getKYCforCurrentUser, getKYCforCurrentUser$),
		takeEvery(getKYCDocForCurrentUser, getKYCDocForCurrentUser$),
	]);
}
