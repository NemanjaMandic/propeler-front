// @flow

import { all, takeLatest, put, delay } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import { saveKeysAPI, getPublicKeyAPI, getMyKeysAPI } from '../../services/api';
import {
	registerKey,
	registerKeySuccess,
	registerKeyFail,
	getPublicKey,
	getPublicKeySuccess,
	getPublicKeyFail,
	getRegisteredKey,
	getRegisteredKeySuccess,
	getRegisteredKeyFail,
	signDocument,
	signDocumentSuccess,
	signDocumentFail,
	getContracts,
	getContractsFail,
	getContractsSuccess,
} from './actions';
import { sign } from '../../signature/RMDS';

import { errorNotification } from '../../utilities/errorHelpers';

export function* registerKey$({ payload }: any): Generator<*, *, *> {
	try {
		yield saveKeysAPI(payload);
		const { publicKey } = payload;
		yield put(registerKeySuccess({ publicKey }));
	} catch (error) {
		yield put(registerKeyFail(errorNotification(error, true)));
	}
}

export function* getPublicKey$({ payload }: any): Generator<*, *, *> {
	const { authId } = payload;
	try {
		const result = yield getPublicKeyAPI(authId);
		const { publicKey } = result.data;
		yield put(getPublicKeySuccess({ authId, publicKey }));
	} catch (error) {
		yield put(getPublicKeyFail());
	}
}

export function* getRegisteredKey$({ payload }: any): Generator<*, *, *> {
	const { authId } = payload;
	try {
		const result = yield getPublicKeyAPI(authId);
		const { publicKey } = result.data;
		yield put(getRegisteredKeySuccess({ authId, publicKey }));
	} catch (error) {
		yield put(getRegisteredKeyFail());
	}
}

export function* signDocument$({ payload }: any): Generator<*, *, *> {
	try {
		const result = yield getMyKeysAPI();

		const signedDocument = yield sign(payload.document, payload.passphrase, result.data);
		console.log(JSON.stringify(signedDocument, null, 4));
		yield put(signDocumentSuccess(signedDocument));
		//
		yield put(getContracts(true));
	} catch (error) {
		yield put(signDocumentFail(errorNotification(error, false)));
	}
}

export function* getContracts$({ payload }: any): Generator<*, *, *> {
	try {
		const result = {
			data: [
				{
					id: 0,
					title: 'Fundraising-contract.pdf',
					type: 'Fundraising contract',
					uploadDate: '2019-08-27T14:10:24.089Z',
					url: 'string',
					signed: payload,
				},
				{
					id: 1,
					title: 'Legal-document.pdf',
					type: 'Fundraising contract',
					uploadDate: '2019-08-27T14:10:24.089Z',
					url: 'string',
					signed: true,
				},
			],
		};

		yield put(getContractsSuccess(result.data));
	} catch (error) {
		yield put(getContractsFail(errorNotification(error, false)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(registerKey, registerKey$),
		takeLatest(getPublicKey, getPublicKey$),
		takeLatest(getRegisteredKey, getRegisteredKey$),
		takeLatest(signDocument, signDocument$),
		takeLatest(getContracts, getContracts$),
	]);
}
