// @flow

import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import * as actions from './actions';
import {
	getFeaturedImageAPI,
	uploadFeaturedImageAPI,
	deleteFeaturedImageAPI,
	getCompanyLogoAPI,
	uploadCompanyLogoAPI,
	deleteCompanyLogoAPI,
	createCompanyAPI,
	reviewCompanyAPI,
	updateCompanyExternalLinksAPI,
	getCompanyAPI,
	updateCompanyAPI,
	getUserCompanyAPI,
	getShareHoldersAPI,
	getShareHoldersMineAPI,
	getShareHolderPhotoAPI,
	reorderShareHoldersAPI,
	addShareHolderAPI,
	updateShareHolderAPI,
	deleteShareHolderAPI,
	uploadShareHolderPhotoAPI,
	deleteShareHolderPhotoAPI,
	getCompanyDocumentsAPI,
	submitCompanyDocumentAPI,
	updateCompanyDocumentAPI,
	deleteCompanyDocumentAPI,
	getAllCompanyDocumentsAPI,
} from '../../services/api';
import { errorNotification } from '../../utilities/errorHelpers';
import { COMPANY } from '../../constants/routes';
import { getQueryString } from '../../services/util';

export function* createCompany$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield createCompanyAPI(payload);
		yield put(actions.createCompanySuccess(response.data));
		NotificationManager.success('Company basic info successfully created', '', 3000);
	} catch (error) {
		yield put(actions.createCompanyFail(errorNotification(error, true)));
	}
}

export function* reviewCompany$({ payload }: any): Generator<*, *, *> {
	try {
		const { id } = payload;
		const response = yield reviewCompanyAPI(id, payload);
		yield put(actions.reviewCompanySuccess(response.data));
		NotificationManager.warning('Pending status message', '', 3000);
	} catch (error) {
		yield put(actions.reviewCompanyFail(errorNotification(error, true)));
	}
}

export function* updateExternalLinks$({ payload }: any): Generator<*, *, *> {
	try {
		const { id } = payload;
		const response = yield updateCompanyExternalLinksAPI(id, payload);
		yield put(actions.updateExternalLinksSuccess(response.data));
		NotificationManager.success('External links updated', '', 3000);
	} catch (error) {
		yield put(actions.updateExternalLinksFail(errorNotification(error, true)));
	}
}

export function* getCompany$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCompanyAPI(payload);
		yield put(actions.getCompanySuccess(response.data));
	} catch (error) {
		yield put(actions.getCompanyFail(errorNotification(error, false)));
	}
}

export function* getCompanyLogo$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCompanyLogoAPI(payload);
		yield put(actions.getCompanyLogoSuccess(response.data));
	} catch (error) {
		yield put(actions.getCompanyLogoFail(errorNotification(error, false)));
	}
}

export function* uploadCompanyLogo$({ payload }: any): Generator<*, *, *> {
	try {
		const {
			id,
			files: { base64, ...data },
		} = payload;
		yield uploadCompanyLogoAPI(id, data);
		yield put(actions.uploadCompanyLogoSuccess(base64));
		NotificationManager.success('Logo successfully uploaded', '', 3000);
	} catch (error) {
		yield put(actions.uploadCompanyLogoFail(errorNotification(error, true)));
	}
}

export function* deleteCompanyLogo$({ payload }: any): Generator<*, *, *> {
	try {
		yield deleteCompanyLogoAPI(payload);
		yield put(actions.deleteCompanyLogoSuccess());
	} catch (error) {
		yield put(actions.deleteCompanyLogoFail(errorNotification(error, true)));
	}
}

export function* getFeaturedImage$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getFeaturedImageAPI(payload);
		yield put(actions.getFeaturedImageSuccess(response.data));
	} catch (error) {
		yield put(actions.getFeaturedImageFail(errorNotification(error, true)));
	}
}

export function* uploadFeaturedImage$({ payload }: any): Generator<*, *, *> {
	try {
		const {
			id,
			files: { base64, ...data },
		} = payload;
		yield uploadFeaturedImageAPI(id, data);
		yield put(actions.uploadFeaturedImageSuccess(base64));
		NotificationManager.success('Featured image successfully uploaded', '', 3000);
	} catch (error) {
		yield put(actions.uploadFeaturedImageFail(errorNotification(error, true)));
	}
}

export function* deleteFeaturedImage$({ payload }: any): Generator<*, *, *> {
	try {
		yield deleteFeaturedImageAPI(payload);
		yield put(actions.deleteFeaturedImageSuccess());
	} catch (error) {
		yield put(actions.deleteFeaturedImageFail(errorNotification(error, true)));
	}
}

export function* updateCompany$({ payload }: any): Generator<*, *, *> {
	try {
		const { id, ...data } = payload;
		const response = yield updateCompanyAPI(id, data.companyDto);
		yield put(actions.updateCompanySuccess(response.data));
		NotificationManager.success('Company basic info successfully updated', '', 3000);
		yield put(push(`${COMPANY}?${getQueryString({ id: response.data.id })}`));
	} catch (error) {
		yield put(actions.updateCompanyFail(errorNotification(error, true)));
	}
}

export function* getUserCompany$(): Generator<*, *, *> {
	try {
		const response = yield getUserCompanyAPI();
		yield put(actions.getUserCompanySuccess(response.data));
		yield put(actions.getCompanyDocuments(response.data.ownerId));
		yield put(actions.getCompanyDocumentsOverview(response.data.id));
	} catch (error) {
		yield put(actions.getUserCompanyFail(error));
	}
}

export function* getShareHolders$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getShareHoldersAPI(payload.companyId);
		yield put(actions.getShareHoldersSuccess(response.data));
	} catch (error) {
		yield put(actions.getShareHoldersFail(errorNotification(error, true)));
	}
}

export function* getShareHoldersMine$(): Generator<*, *, *> {
	try {
		const response = yield getShareHoldersMineAPI();
		yield put(actions.getShareHoldersMineSuccess(response.data));
	} catch (error) {
		yield put(actions.getShareHoldersMineFail(errorNotification(error, true)));
	}
}

export function* getShareHolderPhoto$({ payload }: any): Generator<*, *, *> {
	const { companyId, id } = payload;
	try {
		const { data } = yield getShareHolderPhotoAPI(companyId, id);
		yield put(actions.getShareHolderPhotoSuccess({ id, data }));
	} catch (error) {
		yield put(actions.getShareHolderPhotoFail({ id, error: errorNotification(error) }));
	}
}

export function* reorderShareHolders$({ payload }: any): Generator<*, *, *> {
	try {
		const { data } = payload;
		yield reorderShareHoldersAPI(data);
		yield put(actions.reorderShareHoldersSuccess());
	} catch (error) {
		yield put(actions.reorderShareHoldersFail(errorNotification(error, true)));
	}
}

export function* addShareHolder$({ payload }: any): Generator<*, *, *> {
	try {
		const { data } = payload;
		const response = yield addShareHolderAPI(data);
		yield put(actions.addShareHolderSuccess({ ...data, ...response.data }));
	} catch (error) {
		yield put(actions.addShareHolderFail(errorNotification(error, true)));
	}
}

export function* updateShareHolder$({ payload }: any): Generator<*, *, *> {
	try {
		const { shareHolderId, data } = payload;
		const response = yield updateShareHolderAPI(shareHolderId, data);
		yield put(actions.updateShareHolderSuccess({ shareHolderId, data: response.data }));
	} catch (error) {
		yield put(actions.updateShareHolderFail(errorNotification(error, true)));
	}
}

export function* deleteShareHolder$({ payload }: any): Generator<*, *, *> {
	try {
		const { shareHolderId } = payload;
		yield deleteShareHolderAPI(shareHolderId);
		yield put(actions.deleteShareHolderSuccess(shareHolderId));
	} catch (error) {
		yield put(actions.deleteShareHolderFail(errorNotification(error, true)));
	}
}

export function* uploadShareHolderPhoto$({ payload }: any): Generator<*, *, *> {
	const {
		id,
		data: { base64, ...data },
	} = payload;

	try {
		const response = yield uploadShareHolderPhotoAPI(id, data);
		yield put(actions.uploadShareHolderPhotoSuccess({ id, base64, url: response.data }));
	} catch (error) {
		yield put(
			actions.uploadShareHolderPhotoFail({
				id,
				error: errorNotification(error),
			}),
		);
	}
}

export function* deleteShareHolderPhoto$({ payload }: any): Generator<*, *, *> {
	const { id } = payload;
	try {
		const { data } = yield deleteShareHolderPhotoAPI(id);
		yield put(actions.deleteShareHolderPhotoSuccess({ id, data }));
	} catch (error) {
		yield put(
			actions.deleteShareHolderPhotoFail({
				id,
				error: errorNotification(error),
			}),
		);
	}
}

export function* getCompanyDocuments$({ payload }: any): Generator<*, *, *> {
	try {
		const { data } = yield getCompanyDocumentsAPI(payload);
		yield put(actions.getCompanyDocumentsSuccess(data));
	} catch (error) {
		yield put(actions.getCompanyDocumentsFail(errorNotification(error, false)));
	}
}
export function* submitCompanyDocument$({ payload }: any): Generator<*, *, *> {
	const { companyId, data, userId } = payload;
	try {
		const result = yield submitCompanyDocumentAPI(companyId, data);
		yield put(actions.submitCompanyDocumentSuccess(result.data));
		yield put(actions.getCompanyDocuments(userId));
		yield put(actions.getCompanyDocumentsOverview(companyId));
	} catch (error) {
		yield put(actions.submitCompanyDocumentFail(errorNotification(error, true)));
	}
}

export function* deleteCompanyDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { documentId, userId, companyId } = payload;
		yield deleteCompanyDocumentAPI(documentId);
		yield put(actions.deleteCompanyDocumentSuccess());
		yield put(actions.getCompanyDocuments(userId));
		yield put(actions.getCompanyDocumentsOverview(companyId));
	} catch (error) {
		yield put(actions.deleteCompanyDocumentFail(errorNotification(error, true)));
	}
}

export function* updateCompanyDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const { documentId, data, userId } = payload;
		const result = yield updateCompanyDocumentAPI(documentId, data);
		yield put(actions.updateCompanyDocumentSuccess(result.data));
		yield put(actions.getCompanyDocuments(userId));
	} catch (error) {
		yield put(actions.updateCompanyDocumentFail(errorNotification(error, true)));
	}
}

export function* getCompanyDocumentsOverview$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield getAllCompanyDocumentsAPI(payload);
		yield put(actions.getCompanyDocumentsOverviewSuccess(result.data));
	} catch (error) {
		yield put(actions.getCompanyDocumentsOverviewFail(errorNotification(error, true)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.createCompany, createCompany$),
		takeLatest(actions.reviewCompany, reviewCompany$),
		takeLatest(actions.updateExternalLinks, updateExternalLinks$),
		takeLatest(actions.getCompany, getCompany$),
		takeLatest(actions.getCompanyLogo, getCompanyLogo$),
		takeLatest(actions.uploadCompanyLogo, uploadCompanyLogo$),
		takeLatest(actions.deleteCompanyLogo, deleteCompanyLogo$),
		takeLatest(actions.getFeaturedImage, getFeaturedImage$),
		takeLatest(actions.uploadFeaturedImage, uploadFeaturedImage$),
		takeLatest(actions.deleteFeaturedImage, deleteFeaturedImage$),
		takeLatest(actions.updateCompany, updateCompany$),
		takeLatest(actions.getUserCompany, getUserCompany$),
		takeLatest(actions.getShareHolders, getShareHolders$),
		takeLatest(actions.getShareHoldersMine, getShareHoldersMine$),
		takeEvery(actions.getShareHolderPhoto, getShareHolderPhoto$),
		takeLatest(actions.reorderShareHolders, reorderShareHolders$),
		takeLatest(actions.addShareHolder, addShareHolder$),
		takeLatest(actions.updateShareHolder, updateShareHolder$),
		takeLatest(actions.deleteShareHolder, deleteShareHolder$),
		takeLatest(actions.uploadShareHolderPhoto, uploadShareHolderPhoto$),
		takeLatest(actions.deleteShareHolderPhoto, deleteShareHolderPhoto$),
		takeLatest(actions.getCompanyDocuments, getCompanyDocuments$),
		takeLatest(actions.submitCompanyDocument, submitCompanyDocument$),
		takeLatest(actions.deleteCompanyDocument, deleteCompanyDocument$),
		takeLatest(actions.updateCompanyDocument, updateCompanyDocument$),
		takeLatest(actions.getCompanyDocumentsOverview, getCompanyDocumentsOverview$),
	]);
}
