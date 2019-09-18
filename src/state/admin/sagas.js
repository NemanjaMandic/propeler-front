// @flow

import { all, takeLatest, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { reset } from 'redux-form';
import * as actions from './actions';
import { offPlatformInvestment, offPlatformInvestmentSuccess, offPlatformInvestmentFail } from '../modals/actions';
import {
	auditCampaignAPI,
	getCampaignsByStateAPI,
	acceptCampaignAPI,
	rejectCampaignAPI,
	getFundrisingProposals,
	getAllFundrisingProposalsAPI,
	getFundrisingProposalsDocuments,
	acceptFundrisingApplication,
	rejectFundrisingApplication,
	launchCampaignAPI,
	offPlatformInvestmentAPI,
	uploadFileAPI,
	assignAuditorToUserKYC,
	getKYCRequest,
	acceptUserKYCInternalReview,
	rejectUserKYCInternalReview,
	getKYCUser,
	getFileAPI,
	getCompanyLogoAPI,
} from '../../services/api';
import { errorNotification } from '../../utilities/errorHelpers';
import { states } from '../../constants/campaignStates';
import { getCampaignsWithInvestments } from '../user/dashboard/actions';
import { fileDownload } from '../../utilities/downloader';
// import { status } from "../../constants/statusKYC";
// import { userRole } from "../../constants/userKYC";

export function* auditCampaign$({ payload }: any): Generator<*, *, *> {
	const { data } = payload;
	try {
		const response = yield auditCampaignAPI(data);
		yield put(actions.auditCampaignSuccess(response.data));
		NotificationManager.success('You have successfully assigned yourself as the auditor of the campaign', '', 3000);
		yield put(
			actions.getCampaignsByState({
				page: 0,
				state: states.REVIEW_READY,
				size: 5,
			}),
		);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.auditCampaignFail({ error: error.response.data.message }));
	}
}

export function* auditKYC$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield assignAuditorToUserKYC(payload);
		yield put(actions.auditKYCSuccess(response.data));
		NotificationManager.success('You have successfully assigned yourself as the auditor of the kyc', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.auditKYCFail());
	}
}

export function* getCampaignsByState$({ payload }: any): Generator<*, *, *> {
	try {
		const { pageNumber, state, size, ...rest } = payload;

		if (state === 'ALL') {
			const response = yield getCampaignsByStateAPI({ page: pageNumber, size });
			yield put(actions.getCampaignsByStateSuccess(response.data));
			yield all(
				response.data.content
					.filter(t => t.companyLogoUrl)
					.map(campaign => put(actions.getCampaignImg(campaign.companyId))),
			);
		} else {
			const response = yield getCampaignsByStateAPI({
				...rest,
				page: pageNumber,
				state,
			});
			yield put(actions.getCampaignsByStateSuccess(response.data));
			yield all(
				response.data.content
					.filter(t => t.companyLogoUrl)
					.map(campaign => put(actions.getCampaignImg(campaign.companyId))),
			);
		}
	} catch (error) {
		yield put(
			actions.getCampaignsByStateFail({
				error: errorNotification(error, true),
			}),
		);
	}
}

export function* acceptCampaign$({ payload }: any): Generator<*, *, *> {
	const { auditId } = payload;
	try {
		const response = yield acceptCampaignAPI(auditId);
		yield put(actions.acceptCampaignSuccess(response.data));
		NotificationManager.success('Campaign successfully accepted', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.acceptCampaignFail({ error: error.response.data.message }));
	}
}

export function* rejectCampaign$({ payload }: any): Generator<*, *, *> {
	const { auditId, data } = payload;
	try {
		const response = yield rejectCampaignAPI(auditId, data);
		yield put(actions.rejectCampaignSuccess(response.data));
		NotificationManager.success('Campaign successfully rejected', '', 3000);
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.rejectCampaignFail({ error: error.response.data.message }));
	}
}

export function* getFundrisingApplications$({ payload }: any): Generator<*, *, *> {
	const { filter, size, pageNumber } = payload;
	try {
		if (filter === 'all') {
			const allResponse = yield getAllFundrisingProposalsAPI({ page: pageNumber, size });
			yield put(actions.getFundrisingApplicationsSuccess(allResponse.data));
		} else {
			const response = yield getAllFundrisingProposalsAPI({ page: pageNumber, size, filter });
			yield put(actions.getFundrisingApplicationsSuccess(response.data));
		}
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.getFundrisingApplicationsFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* getFundrisingApplicationsDocuments$({ payload }: any): Generator<*, *, *> {
	const { fundraisingProposalId } = payload;
	try {
		const response = yield getFundrisingProposalsDocuments(fundraisingProposalId);
		yield put(actions.getFundrisingApplicationsDocumentsSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.getFundrisingApplicationsDocumentsFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* downloadFundraisingAppDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { url, title } = payload;
		const result = yield getFileAPI(url);
		yield put(actions.downloadFundraisingAppDocumentSuccess(result.data));
		fileDownload(result.data, `${title}.${result.data.type}`);
	} catch (error) {
		NotificationManager.error(error, '', 3000);
		yield put(actions.downloadFundraisingAppDocumentFail(error));
	}
}

export function* acceptFundrisingApplication$({ payload }: any): Generator<*, *, *> {
	const { fundraisingProposalId } = payload;
	try {
		const response = yield acceptFundrisingApplication(fundraisingProposalId);
		yield put(actions.acceptFundrisingApplicationSuccess(response));
		// TODO: use choosen filter
		yield put(actions.getFundrisingApplications({ filter: 'all' }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.acceptFundrisingApplicationFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* rejectFundrisingApplication$({ payload }: any): Generator<*, *, *> {
	const { fundraisingProposalId, reason } = payload;
	try {
		const response = yield rejectFundrisingApplication(fundraisingProposalId, {
			content: reason,
		});
		yield put(actions.rejectFundrisingApplicationSuccess(response));
		// TODO: use choosen filter
		yield put(actions.getFundrisingApplications({ filter: 'all' }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.rejectFundrisingApplicationFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* acceptUserKYCInternalReview$({ payload }: any): Generator<*, *, *> {
	const { userKYCId, role, status, page } = payload;
	try {
		const response = yield acceptUserKYCInternalReview(userKYCId);
		yield put(actions.acceptKYCInternalReviewSuccess(response));
		yield put(actions.getKYCRequest({ page: page, size: 5, role, status }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.acceptUserKYCInternalReviewFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* rejectUserKYCInternalReview$({ payload }: any): Generator<*, *, *> {
	const { userKYCId, role, status, page, rejectionReason } = payload;
	try {
		const response = yield rejectUserKYCInternalReview(userKYCId, rejectionReason);
		yield put(actions.rejectKYCInternalReviewSuccess(response));
		yield put(actions.getKYCRequest({ page: page, size: 5, role, status }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.rejectKYCInternalReviewFail({
				error: error.response.data.message,
			}),
		);
	}
}

export function* launchCampaign$({ payload }: any): Generator<*, *, *> {
	const { campaignName } = payload;
	try {
		yield launchCampaignAPI(campaignName);
		yield put(actions.launchCampaignSuccess());
		NotificationManager.success('You have successfully launched campaign!', '', 3000);
		yield put(
			actions.getCampaignsByState({
				page: 0,
				state: states.LAUNCH_READY,
				size: 5,
			}),
		);
	} catch (error) {
		yield put(actions.launchCampaignFail(errorNotification(error, true)));
	}
}

export function* offPlatformInvestment$({ payload }: any): Generator<*, *, *> {
	const { campaignName, data } = payload;
	const { picture, ...form } = data;
	try {
		if (picture) {
			const imageResponse = yield uploadFileAPI(picture);
			yield offPlatformInvestmentAPI(campaignName, {
				...form,
				profilePictureUrl: imageResponse.data,
			});
		} else {
			yield offPlatformInvestmentAPI(campaignName, form);
		}
		yield put(getCampaignsWithInvestments({ state: states.ACTIVE }));
		yield put(offPlatformInvestmentSuccess());
		yield put(reset('OffPlatformInvestmentForm'));
		NotificationManager.success('You have successfully created an investment!', '', 3000);
	} catch (error) {
		yield put(offPlatformInvestmentFail(errorNotification(error, true)));
	}
}

export function* getKYCRequest$({ payload }: any): Generator<*, *, *> {
	const { pageNumber, size, role, state } = payload;
	try {
		const response = yield getKYCRequest({
			page: pageNumber,
			size,
			role,
			state,
		});
		yield put(actions.getKYCRequestSuccess(response.data));
	} catch (error) {
		yield put(actions.getKYCRequestFail({ error: errorNotification(error, true) }));
	}
}

export function* getKYCUser$({ payload }: any): Generator<*, *, *> {
	const { userKYCId } = payload;
	try {
		const response = yield getKYCUser(userKYCId);
		yield all(response.data.userDocuments.map(file => put(actions.getKYCDoc({ userKYCId, file }))));
		yield put(actions.getUserKYCSuccess(response.data));
	} catch (error) {
		yield put(actions.getUserKYCFail({ error: errorNotification(error, true) }));
	}
}

export function* getKYCDoc$({ payload }: any): Generator<*, *, *> {
	const {
		userKYCId,
		file: { url, type, title },
	} = payload;
	try {
		const { data } = yield getFileAPI(url);

		yield put(
			actions.getKYCDocSuccess({
				userKYCId,
				data: { ...data, url, type, title },
			}),
		);
	} catch (error) {
		yield put(actions.getKYCDocFail({ error: errorNotification(error, false) }));
	}
}

export function* getCampaignImg$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCompanyLogoAPI(payload);
		yield put(
			actions.getCampaignImgSuccess({
				...response.data,
				companyId: payload,
			}),
		);
	} catch (error) {
		yield put(actions.getCampaignImgFail({ error: errorNotification(error, false) }));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.auditCampaign, auditCampaign$),
		takeLatest(actions.getCampaignsByState, getCampaignsByState$),
		takeLatest(actions.acceptCampaign, acceptCampaign$),
		takeLatest(actions.rejectCampaign, rejectCampaign$),
		takeLatest(actions.getFundrisingApplications, getFundrisingApplications$),
		takeLatest(actions.getFundrisingApplicationsDocuments, getFundrisingApplicationsDocuments$),
		takeLatest(actions.acceptFundrisingApplication, acceptFundrisingApplication$),
		takeLatest(actions.rejectFundrisingApplication, rejectFundrisingApplication$),
		takeLatest(actions.launchCampaign, launchCampaign$),
		takeLatest(offPlatformInvestment, offPlatformInvestment$),
		takeLatest(actions.auditKYC, auditKYC$),
		takeLatest(actions.getKYCRequest, getKYCRequest$),
		takeLatest(actions.acceptKYCInternalReview, acceptUserKYCInternalReview$),
		takeLatest(actions.rejectKYCInternalReview, rejectUserKYCInternalReview$),
		takeLatest(actions.getUserKYC, getKYCUser$),
		takeEvery(actions.getKYCDoc, getKYCDoc$),
		takeEvery(actions.getCampaignImg, getCampaignImg$),
		takeLatest(actions.downloadFundraisingAppDocument, downloadFundraisingAppDocument$),
	]);
}
