// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import * as actions from './actions';
import {
	getUserCampaignsAPI,
	getCampaignDocumentsPageableAPI,
	getCampaignsWithInvestmentsAPI,
	approveInvestmentAsOwner,
	rejectInvestmentAsOwner,
	getDocumentRequestsAPI,
	acceptDocumentRequestAPI,
	rejectDocumentRequestAPI,
	getProfilePhotoAPI,
} from '../../../services/api';
import { errorNotification } from '../../../utilities/errorHelpers';
import { getCompanyLogo } from '../../company/actions';
import { getUserPreviewPhoto, getUserPreviewPhotoSuccess, getUserPreviewPhotoFail } from '../../modals/actions';

export function* getUserCampaigns$(): Generator<*, *, *> {
	try {
		const response = yield getUserCampaignsAPI();
		if (response.data.length > 0) {
			yield put(getCompanyLogo(response.data[0].companyId));
		}
		yield put(actions.getUserCampaignsSuccess(response.data));
	} catch (error) {
		yield put(actions.getUserCampaignsFail(errorNotification(error, false)));
	}
}

export function* getCampaignDocumentsPageable$({ payload }: any): Generator<*, *, *> {
	const { userId, pageNumber } = payload;
	try {
		const response = yield getCampaignDocumentsPageableAPI(userId, pageNumber, 5);
		yield put(actions.getUserCampaignDocumentsPageableSuccess(response.data));
	} catch (error) {
		yield put(actions.getUserCampaignDocumentsPageableFail(errorNotification(error, false)));
	}
}

export function* getCampaignsWithInvestments$({ payload }: any): Generator<*, *, *> {
	const { state } = payload;
	try {
		const response = yield getCampaignsWithInvestmentsAPI(state);
		yield put(actions.getCampaignsWithInvestmentsSuccess(response.data));
	} catch (error) {
		yield put(actions.getCampaignsWithInvestmentsFail(errorNotification(error, false)));
	}
}

export function* approveInvestmentAsOwner$({ payload }: any): Generator<*, *, *> {
	try {
		const { investmentId, campaignId } = payload;
		yield approveInvestmentAsOwner(investmentId);
		yield put(actions.approveInvestmentAsOwnerSuccess({ campaignId, investmentId }));
	} catch (error) {
		yield put(actions.approveInvestmentAsOwnerFail(errorNotification(error, false)));
	}
}

export function* rejectInvestmentAsOwner$({ payload }: any): Generator<*, *, *> {
	try {
		const { investmentId, campaignId } = payload;
		yield rejectInvestmentAsOwner(investmentId);
		yield put(actions.rejectInvestmentAsOwnerSuccess({ campaignId, investmentId }));
	} catch (error) {
		yield put(actions.rejectInvestmentAsOwnerFail(errorNotification(error, false)));
	}
}

export function* getDocumentRequests$(): Generator<*, *, *> {
	try {
		const response = yield getDocumentRequestsAPI();
		yield put(actions.getDocumentRequestsSuccess(response.data));
	} catch (error) {
		yield put(actions.getDocumentRequestsFail(errorNotification(error, false)));
	}
}

export function* acceptDocumentRequest$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield acceptDocumentRequestAPI(payload);
		yield put(actions.acceptDocumentRequestSuccess(response.data));
	} catch (error) {
		yield put(actions.acceptDocumentRequestFail(errorNotification(error, false)));
	}
}

export function* rejectDocumentRequest$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield rejectDocumentRequestAPI(payload);
		yield put(actions.rejectDocumentRequestSuccess(response.data));
	} catch (error) {
		yield put(actions.rejectDocumentRequestFail(errorNotification(error, false)));
	}
}

export function* getUserPreviewPhoto$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getProfilePhotoAPI(payload);
		yield put(getUserPreviewPhotoSuccess(response.data));
	} catch (error) {
		yield put(getUserPreviewPhotoFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.getUserCampaigns, getUserCampaigns$),
		takeLatest(actions.getUserCampaignDocumentsPageable, getCampaignDocumentsPageable$),
		takeLatest(actions.getCampaignsWithInvestments, getCampaignsWithInvestments$),
		takeLatest(actions.approveInvestmentAsOwner, approveInvestmentAsOwner$),
		takeLatest(actions.rejectInvestmentAsOwner, rejectInvestmentAsOwner$),
		takeLatest(actions.getDocumentRequests, getDocumentRequests$),
		takeLatest(actions.acceptDocumentRequest, acceptDocumentRequest$),
		takeLatest(actions.rejectDocumentRequest, rejectDocumentRequest$),
		takeLatest(getUserPreviewPhoto, getUserPreviewPhoto$),
	]);
}
