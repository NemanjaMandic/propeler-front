// @flow

import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import * as actions from './actions';
import { getShareHoldersMine } from '../company/actions';
import { getUserCampaignDocumentsPageable } from '../user/dashboard/actions';
import { open2FADialog, verifyCampaignDeletion } from '../2FA/actions';
import {
	createCampaignAPI,
	checkCampaignNameAPI,
	getCampaignBasicInfoAPI,
	updateCampaignBasicInfoAPI,
	uploadCampaignMarketImageAPI,
	deleteCampaignMarketImageAPI,
	getCampaignMarketImageAPI,
	getCurrentCampaignAPI,
	createCampaignTopicAPI,
	updateCampaignTopicAPI,
	getCampaignTopicAPI,
	addTeamMemberAPI,
	getTeamMembersAPI,
	reorderTeamMembersAPI,
	updateTeamMemberAPI,
	deleteTeamMemberAPI,
	getMemberPhotoAPI,
	deleteMemberPhotoAPI,
	uploadMemberPhotoAPI,
	uploadFileAPI,
	submitCampaignDocumentAPI,
	deleteCampaignDocumentAPI,
	getCampaignDocumentsAPI,
	getPlatformSettingsAPI,
	getFileAPI,
	updateCampaignDocumentAPI,
	campaignSubmitForReviewAPI,
	getPublicCampaignsAPI,
	getCompanyLogoAPI,
	getAllCampaignUpdatesPageableAPI,
	createCampaignUpdateAPI,
	updateCampaignUpdateAPI,
	deleteCampaignUpdateAPI,
	getCampaignUpdate,
	submitRequestForDocumentsAPI,
	getRequestStatusAPI,
} from '../../services/api';
import { errorNotification } from '../../utilities/errorHelpers';
import { steps } from '../../components/campaign/management/constants/steps';
import { CAMPAIGN } from '../../constants/routes';
import { states } from '../../constants/campaignStates';

export function* createCampaign$({ payload }: any): Generator<*, *, *> {
	try {
		yield createCampaignAPI(payload);
		yield put(actions.createCampaignSuccess(payload));
		NotificationManager.success('Campaign basic info successfully created', '', 3000);
	} catch (error) {
		yield put(actions.createCampaignFail(errorNotification(error, true)));
	}
}

export function* checkCampaignName$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield checkCampaignNameAPI(payload);
		yield put(actions.checkCampaignNameFail(errorNotification(response.data, false)));
	} catch (error) {
		yield put(actions.checkCampaignNameSuccess(error));
	}
}

export function* getCampaignInfo$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCampaignBasicInfoAPI(payload);
		const { urlFriendlyName, ...campaignData } = response.data;
		yield put(actions.getCampaignInfoSuccess({ urlFriendlyName, campaignData }));
	} catch (error) {
		yield put(actions.getCampaignInfoFail(errorNotification(error, false)));
	}
}

export function* updateCampaignInfo$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield updateCampaignBasicInfoAPI(payload.urlFriendlyName, payload);
		const { urlFriendlyName, ...campaignData } = response.data;
		campaignData.topicStatus = payload.topicStatus;
		yield put(actions.updateCampaignInfoSuccess({ urlFriendlyName, campaignData }));
		NotificationManager.success('Campaign basic info successfully updated', '', 3000);
	} catch (error) {
		yield put(actions.updateCampaignInfoFail(errorNotification(error, true)));
	}
}

export function* getCampaignMarketImage$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCampaignMarketImageAPI(payload);
		yield put(actions.getCampaignMarketImageSuccess(response.data));
	} catch (error) {
		yield put(actions.getCampaignMarketImageFail(errorNotification(error, false)));
	}
}

export function* uploadCampaignMarketImage$({ payload }: any): Generator<*, *, *> {
	try {
		const {
			name,
			files: { base64, ...data },
		} = payload;
		yield uploadCampaignMarketImageAPI(name, data);
		yield put(actions.uploadCampaignMarketImageSuccess(base64));
		yield put(actions.getCurrentCampaign());
		NotificationManager.success('Market image successfully uploaded', '', 3000);
	} catch (error) {
		yield put(actions.uploadCampaignMarketImageFail(errorNotification(error, true)));
	}
}

export function* deleteCampaignMarketImage$({ payload }: any): Generator<*, *, *> {
	try {
		yield deleteCampaignMarketImageAPI(payload);
		yield put(actions.deleteCampaignMarketImageSuccess());
	} catch (error) {
		yield put(actions.deleteCampaignMarketImageFail(errorNotification(error, true)));
	}
}

export function* getCurrentCampaign$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCurrentCampaignAPI();
		const { urlFriendlyName, ...campaignData } = response.data;
		yield put(actions.getCurrentCampaignSuccess({ urlFriendlyName, campaignData }));
		yield put(actions.getTeamMembers({ campaignName: urlFriendlyName }));
		yield put(getShareHoldersMine());

		yield put(actions.getCampaignDocuments(urlFriendlyName));
		yield put(getUserCampaignDocumentsPageable({ userId: payload, pageNumber: 0 }));
		const topics = Object.keys(campaignData.topicStatus).filter(key => campaignData.topicStatus[key]);

		yield all(
			topics.map(topicType =>
				put(
					actions.getCampaignTopic({
						campaignName: urlFriendlyName,
						topicType,
					}),
				),
			),
		);
	} catch (error) {
		yield put(actions.getCurrentCampaignFail(error));
	}
}

export function* createCampaignTopic$({ payload }: any): Generator<*, *, *> {
	try {
		yield createCampaignTopicAPI(payload.campaignName, payload.topicType, payload.campaignTopicData);
		yield put(
			actions.createCampaignTopicSuccess({
				topic: payload.topicType,
				response: payload.campaignTopicData,
			}),
		);
	} catch (error) {
		yield put(actions.createCampaignTopicFail(errorNotification(error, true)));
	}
}

export function* updateCampaignTopic$({ payload }: any): Generator<*, *, *> {
	try {
		yield updateCampaignTopicAPI(payload.campaignName, payload.topicType, payload.campaignTopicData);
		yield put(
			actions.updateCampaignTopicSuccess({
				topic: payload.topicType,
				response: payload.campaignTopicData,
			}),
		);
	} catch (error) {
		yield put(actions.updateCampaignTopicFail(errorNotification(error, true)));
	}
}

export function* getCampaignTopic$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCampaignTopicAPI(payload.campaignName, payload.topicType);
		yield put(
			actions.getCampaignTopicSuccess({
				topic: payload.topicType,
				response: response.data,
			}),
		);
	} catch (error) {
		yield put(actions.getCampaignTopicFail({ topic: payload.topicType }));
	}
}

export function* addTeamMember$({ payload }: any): Generator<*, *, *> {
	try {
		const { campaignName, data } = payload;
		const response = yield addTeamMemberAPI(campaignName, data);
		yield put(actions.addTeamMemberSuccess({ ...data, ...response.data }));
	} catch (error) {
		yield put(actions.addTeamMemberFail(errorNotification(error, true)));
	}
}

export function* getTeamMembers$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getTeamMembersAPI(payload.campaignName);
		yield put(actions.getTeamMembersSuccess(response.data));
	} catch (error) {
		yield put(actions.getTeamMembersFail(errorNotification(error, true)));
	}
}

export function* deleteTeamMember$({ payload }: any): Generator<*, *, *> {
	try {
		const { campaignName, memberId } = payload;
		yield deleteTeamMemberAPI(campaignName, memberId);
		yield put(actions.deleteTeamMemberSuccess(memberId));
	} catch (error) {
		yield put(actions.deleteTeamMemberFail(errorNotification(error, true)));
	}
}

export function* updateTeamMember$({ payload }: any): Generator<*, *, *> {
	try {
		const { campaignName, memberId, data } = payload;
		const response = yield updateTeamMemberAPI(campaignName, memberId, data);
		yield put(actions.updateTeamMemberSuccess({ memberId, data: response.data }));
	} catch (error) {
		yield put(actions.updateTeamMemberFail(errorNotification(error, true)));
	}
}

export function* reorderTeamMembers$({ payload }: any): Generator<*, *, *> {
	try {
		const { campaignName, data } = payload;
		yield reorderTeamMembersAPI(campaignName, data);
		yield put(actions.reorderTeamMembersSuccess());
	} catch (error) {
		yield put(actions.reorderTeamMembersFail(errorNotification(error, true)));
	}
}

export function* uploadMemberPhoto$({ payload }: any): Generator<*, *, *> {
	const {
		campaignName,
		id,
		data: { base64, ...data },
	} = payload;

	try {
		const response = yield uploadMemberPhotoAPI(campaignName, id, data);
		yield put(actions.uploadMemberPhotoSuccess({ id, base64, url: response.data }));
	} catch (error) {
		yield put(actions.uploadMemberPhotoFail({ id, error: errorNotification(error) }));
	}
}

export function* getMemberPhoto$({ payload }: any): Generator<*, *, *> {
	const { campaignName, id } = payload;
	try {
		const { data } = yield getMemberPhotoAPI(campaignName, id);
		yield put(actions.getMemberPhotoSuccess({ id, data }));
	} catch (error) {
		yield put(actions.getMemberPhotoFail({ id, error: errorNotification(error) }));
	}
}

export function* deleteMemberPhoto$({ payload }: any): Generator<*, *, *> {
	const { campaignName, id } = payload;
	try {
		const { data } = yield deleteMemberPhotoAPI(campaignName, id);
		yield put(actions.deleteMemberPhotoSuccess({ id, data }));
	} catch (error) {
		yield put(actions.deleteMemberPhotoFail({ id, error: errorNotification(error) }));
	}
}

export function* setStep$({ payload }: any): Generator<*, *, *> {
	const route = steps.get(payload) ? steps.get(payload).hash : '';
	yield put(push(`${CAMPAIGN}${route}`));
}

export function* uploadDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { name } = payload.data;
		const result = yield uploadFileAPI(payload.data);
		yield put(actions.uploadDocumentSuccess({ docName: result.data, name }));
	} catch (error) {
		yield put(actions.uploadDocumentFail(errorNotification(error, true)));
	}
}

export function* submitCampaignDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield submitCampaignDocumentAPI(payload.name, payload.data);
		yield put(actions.submitCampaignDocumentSuccess(result.data));
		yield put(actions.getCampaignDocuments(payload.name));
		yield put(
			getUserCampaignDocumentsPageable({
				userId: payload.userId,
				pageNumber: 0,
			}),
		);
	} catch (error) {
		yield put(actions.submitCampaignDocumentFail(errorNotification(error, true)));
	}
}

export function* deleteCampaignDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { name, id, userId } = payload;
		yield deleteCampaignDocumentAPI(id);
		yield put(actions.deleteCampaignDocumentSuccess());
		yield put(actions.getCampaignDocuments(name));
		yield put(getUserCampaignDocumentsPageable({ userId, pageNumber: 0 }));
	} catch (error) {
		yield put(actions.deleteCampaignDocumentFail(errorNotification(error, true)));
	}
}

export function* getCampaignDocuments$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield getCampaignDocumentsAPI(payload);
		yield put(actions.getCampaignDocumentsSuccess(result.data));
	} catch (error) {
		yield put(actions.getCampaignDocumentsFail(errorNotification(error, false)));
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

export function* deleteCampaign$({ payload }: any): Generator<*, *, *> {
	yield put(open2FADialog({ action: verifyCampaignDeletion, token: payload }));
}

export function* campaignSubmitForReview$({ payload }: any): Generator<*, *, *> {
	try {
		yield campaignSubmitForReviewAPI(payload);
		yield put(actions.campaignSubmitForReviewSuccess());
		NotificationManager.success('Campaign is in review', '', 3000);
	} catch (error) {
		yield put(actions.campaignSubmitForReviewFail(errorNotification(error, true)));
	}
}

export function* getDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield getFileAPI(payload);

		yield put(actions.getDocumentSuccess(result.data));
	} catch (error) {
		NotificationManager.error(error, '', 3000);
		yield put(actions.getDocumentFail(error));
	}
}

export function* updateCampaignDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { campaignName, documentId, data, userId } = payload;
		const result = yield updateCampaignDocumentAPI(documentId, data);
		yield put(actions.updateCampaignDocumentSuccess(result.data));
		yield put(actions.getCampaignDocuments(campaignName));
		yield put(getUserCampaignDocumentsPageable({ userId, pageNumber: 0 }));
	} catch (error) {
		yield put(actions.updateCampaignDocumentFail(errorNotification(error, true)));
	}
}

export function* getAllCampaigns$({ payload }: any): Generator<*, *, *> {
	try {
		const { pageNumber, ...data } = payload;
		const result = yield getPublicCampaignsAPI({ ...data, page: pageNumber });

		yield put(actions.getAllCampaignsSuccess(result.data));

		yield all(result.data.content.map(campaign => put(actions.getCampaignCardCover(campaign.urlFriendlyName))));

		yield all(result.data.content.map(campaign => put(actions.getCampaignCardLogo(campaign.companyId))));
	} catch (error) {
		yield put(actions.getAllCampaignsFail(errorNotification(error, true)));
	}
}

export function* getCompletedCampaigns$({ payload }: any): Generator<*, *, *> {
	try {
		const { pageNumber, ...data } = payload;
		const result = yield getPublicCampaignsAPI({
			...data,
			page: pageNumber,
			filter: states.COMPLETED,
		});
		yield all(result.data.content.map(campaign => put(actions.getCampaignCardCover(campaign.urlFriendlyName))));

		yield all(result.data.content.map(campaign => put(actions.getCampaignCardLogo(campaign.companyId))));
		yield put(actions.getCompletedCampaignsSuccess(result.data));
	} catch (error) {
		yield put(actions.getCompletedCampaignsFail(errorNotification(error, false)));
	}
}

export function* getCampaignCardCover$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCampaignMarketImageAPI(payload);
		yield put(
			actions.getCampaignCardCoverSuccess({
				...response.data,
				urlFriendlyName: payload,
			}),
		);
	} catch (error) {
		yield put(actions.getCampaignCardCoverFail(errorNotification(error, false)));
	}
}

export function* getCampaignCardLogo$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCompanyLogoAPI(payload);
		yield put(
			actions.getCampaignCardLogoSuccess({
				...response.data,
				companyId: payload,
			}),
		);
	} catch (error) {
		yield put(actions.getCampaignCardLogoFail(errorNotification(error, false)));
	}
}

export function* getAllCampaignUpdatesPageable$({ payload }: any): Generator<*, *, *> {
	const { campaignName, pageNumber, pageSize } = payload;
	try {
		const result = yield getAllCampaignUpdatesPageableAPI(campaignName, pageNumber, pageSize);
		yield put(actions.getAllCampaignUpdatesPageableSuccess(result.data));
	} catch (error) {
		yield put(actions.getAllCampaignUpdatesPageableFail(errorNotification(error, false)));
	}
}

export function* createCampaignUpdate$({ payload }: any): Generator<*, *, *> {
	const { campaignName, pageNumber, pageSize, data } = payload;
	try {
		const result = yield createCampaignUpdateAPI(campaignName, data);
		yield put(actions.createCampaignUpdateSuccess(result.data));
		yield put(
			actions.getAllCampaignUpdatesPageable({
				campaignName,
				pageNumber,
				pageSize,
			}),
		);
	} catch (error) {
		yield put(actions.createCampaignUpdateFail(errorNotification(error, false)));
	}
}

export function* updateCampaignUpdate$({ payload }: any): Generator<*, *, *> {
	const { campaignName, pageNumber, pageSize, data, updateId } = payload;
	try {
		const result = yield updateCampaignUpdateAPI(updateId, data);
		yield put(actions.updateCampaignUpdateSuccess(result.data));
		yield put(
			actions.getAllCampaignUpdatesPageable({
				campaignName,
				pageNumber,
				pageSize,
			}),
		);
	} catch (error) {
		yield put(actions.updateCampaignUpdateFail(errorNotification(error, false)));
	}
}

export function* deleteCampaignUpdate$({ payload }: any): Generator<*, *, *> {
	const { campaignName, pageNumber, pageSize, updateId } = payload;
	try {
		const result = yield deleteCampaignUpdateAPI(updateId);
		yield put(actions.deleteCampaignUpdateSuccess(result.data));
		yield put(
			actions.getAllCampaignUpdatesPageable({
				campaignName,
				pageNumber,
				pageSize,
			}),
		);
	} catch (error) {
		yield put(actions.deleteCampaignUpdateFail(errorNotification(error, false)));
	}
}

export function* getCampaignUpdate$({ payload }: any): Generator<*, *, *> {
	const { updateId } = payload;
	try {
		const result = yield getCampaignUpdate(updateId);
		yield put(actions.getCampaignUpdateSuccess(result.data));
	} catch (error) {
		yield put(actions.getCampaignUpdateFail(errorNotification(error, false)));
	}
}

export function* submitRequestForDocuments$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield submitRequestForDocumentsAPI(payload);
		yield put(actions.submitRequestForDocumentsSuccess(result.data));
	} catch (error) {
		yield put(actions.submitRequestForDocumentsFail(errorNotification(error, true)));
	}
}

export function* getDocumentsRequestStatus$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield getRequestStatusAPI(payload);
		yield put(actions.getDocumentsRequestStatusSuccess(result.data));
	} catch (error) {
		yield put(actions.getDocumentsRequestStatusFail(errorNotification(error, false)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.createCampaign, createCampaign$),
		takeLatest(actions.checkCampaignName, checkCampaignName$),
		takeLatest(actions.getCampaignInfo, getCampaignInfo$),
		takeLatest(actions.updateCampaignInfo, updateCampaignInfo$),
		takeEvery(actions.getCampaignMarketImage, getCampaignMarketImage$),
		takeLatest(actions.uploadCampaignMarketImage, uploadCampaignMarketImage$),
		takeLatest(actions.deleteCampaignMarketImage, deleteCampaignMarketImage$),
		takeLatest(actions.getCurrentCampaign, getCurrentCampaign$),
		takeLatest(actions.createCampaignTopic, createCampaignTopic$),
		takeEvery(actions.getCampaignTopic, getCampaignTopic$),
		takeLatest(actions.updateCampaignTopic, updateCampaignTopic$),
		takeLatest(actions.addTeamMember, addTeamMember$),
		takeLatest(actions.getTeamMembers, getTeamMembers$),
		takeLatest(actions.deleteTeamMember, deleteTeamMember$),
		takeLatest(actions.updateTeamMember, updateTeamMember$),
		takeLatest(actions.reorderTeamMembers, reorderTeamMembers$),
		takeLatest(actions.uploadMemberPhoto, uploadMemberPhoto$),
		takeEvery(actions.getMemberPhoto, getMemberPhoto$),
		takeLatest(actions.deleteMemberPhoto, deleteMemberPhoto$),
		takeLatest(actions.setStep, setStep$),
		takeLatest(actions.uploadDocument, uploadDocument$),
		takeLatest(actions.submitCampaignDocument, submitCampaignDocument$),
		takeLatest(actions.deleteCampaignDocument, deleteCampaignDocument$),
		takeLatest(actions.getCampaignDocuments, getCampaignDocuments$),
		takeLatest(actions.getPlatformSettings, getPlatformSettings$),
		takeLatest(actions.deleteCampaign, deleteCampaign$),
		takeLatest(actions.campaignSubmitForReview, campaignSubmitForReview$),
		takeLatest(actions.getDocument, getDocument$),
		takeLatest(actions.updateCampaignDocument, updateCampaignDocument$),
		takeLatest(actions.getAllCampaigns, getAllCampaigns$),
		takeLatest(actions.getCompletedCampaigns, getCompletedCampaigns$),
		takeEvery(actions.getCampaignCardCover, getCampaignCardCover$),
		takeEvery(actions.getCampaignCardLogo, getCampaignCardLogo$),
		takeLatest(actions.getAllCampaignUpdatesPageable, getAllCampaignUpdatesPageable$),
		takeLatest(actions.createCampaignUpdate, createCampaignUpdate$),
		takeLatest(actions.deleteCampaignUpdate, deleteCampaignUpdate$),
		takeLatest(actions.updateCampaignUpdate, updateCampaignUpdate$),
		takeLatest(actions.getCampaignUpdate, getCampaignUpdate$),
		takeLatest(actions.submitRequestForDocuments, submitRequestForDocuments$),
		takeLatest(actions.getDocumentsRequestStatus, getDocumentsRequestStatus$),
	]);
}
