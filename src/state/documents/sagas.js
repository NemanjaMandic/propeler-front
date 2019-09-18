// @flow

import { all, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import * as actions from './actions';
import { getDocumentTypesAPI, uploadFileAPI } from '../../services/api';
import { getDocument, getDocumentSuccess, getDocumentFail } from '../campaign/actions';
import dummyContract from '../../constants/dummyContract';

export function* getDocumentTypes$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getDocumentTypesAPI(payload);
		yield put(actions.getDocumentTypesSuccess({ entity: payload, data: response.data }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(
			actions.getDocumentTypesFail({
				entity: payload,
				error: error.response.data.message,
			}),
		);
	}
}

export function* uploadDynamicDocument$({ payload }: any): Generator<*, *, *> {
	const { docType, data, entity } = payload;
	try {
		const response = yield uploadFileAPI(data);
		yield put(
			actions.uploadDynamicDocumentSuccess({
				docType,
				url: response.data,
				entity,
				name: data.name,
			}),
		);
	} catch (error) {
		yield put(actions.uploadDynamicDocumentFail({ error, docType, entity }));
	}
}

export function* generateEntrepreneurContract$(): Generator<*, *, *> {
	try {
		// const response = yield generateEntrepreneurContractAPI();
		// const { signed, url } = response.data;
		// if(!signed) yield put(getDocument(url));
		const response = { data: { signed: false, url: '' } };
		yield put(actions.generateEntrepreneurContractSuccess(response.data));
		yield put(getDocumentSuccess({ type: 'pdf', file: dummyContract })); // remove later
	} catch (error) {
		NotificationManager.error(error, '', 3000);
		yield put(getDocumentFail(error)); // replace with line below
		// yield put(actions.generateEntrepreneurContractFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeEvery(actions.getDocumentTypes, getDocumentTypes$),
		takeLatest(actions.uploadDynamicDocument, uploadDynamicDocument$),
		takeLatest(actions.generateEntrepreneurContract, generateEntrepreneurContract$),
	]);
}
