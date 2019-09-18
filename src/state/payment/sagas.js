// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import * as actions from './actions';
import { fileDownload } from '../../utilities/downloader';
import {
	getAllPaymentsAPI,
	sendPaymentConfirmationAPI,
	getBankTransferAPI,
	getCardPaymentAPI,
	getFileAPI,
	getPaymentMethodsAPI,
	getPaymentInvoiceAPI,
	captureTransactionAPI,
	approveInvestmentAsAuditorAPI,
} from '../../services/api';

export function* getAllPayments$({ payload }: any): Generator<*, *, *> {
	const { pageNumber, size, filter } = payload;
	try {
		if (filter === 'ALL') {
			const response = yield getAllPaymentsAPI({
				page: pageNumber,
				size,
			});
			yield put(actions.getAllPaymentsSuccess(response.data));
		} else {
			const response = yield getAllPaymentsAPI({
				page: pageNumber,
				size,
				filter,
			});
			yield put(actions.getAllPaymentsSuccess(response.data));
		}
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getAllPaymentsFail(error));
	}
}

export function* getPaymentMethods$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getPaymentMethodsAPI(payload);

		yield put(actions.getPaymentMethodsSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getPaymentMethodsFail(error));
	}
}

export function* getBankTransfer$({ payload }: any): Generator<*, *, *> {
	const { id, invoice } = payload;
	try {
		const response = yield getBankTransferAPI(id);
		yield put(actions.getBankTransferSuccess(response.data));
		if (invoice && response.data.proformaInvoiceUrl) {
			yield put(actions.getProformaInvoice(response.data.proformaInvoiceUrl));
		}
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getBankTransferFail(error));
	}
}

export function* getCardPayment$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getCardPaymentAPI(payload);
		yield put(actions.getCardPaymentSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getCardPaymentFail(error));
	}
}

export function* getProformaInvoice$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getFileAPI(payload);
		yield put(actions.getProformaInvoiceSuccess(response.data));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getProformaInvoiceFail(error));
	}
}

export function* getPaymentInvoiceAPI$({ payload }: any): Generator<*, *, *> {
	try {
		const response = yield getPaymentInvoiceAPI(payload);
		const responseFile = yield getFileAPI(response.data);
		yield put(actions.getPaymentInvoiceSuccess(responseFile.data));
		fileDownload(responseFile.data, 'Payment_Invoice.pdf');
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.getPaymentInvoiceFail(error));
	}
}

export function* sendPaymentConfirmation$({ payload }: any): Generator<*, *, *> {
	const { investmentId, data, pageNumber, size, state } = payload;
	try {
		yield sendPaymentConfirmationAPI(investmentId, data);
		yield put(actions.sendPaymentConfirmationSuccess(investmentId));
		yield approveInvestmentAsAuditorAPI(investmentId);
		NotificationManager.success('Payment confirmation sent', '', 3000);
		yield put(actions.getAllPayments({ page: pageNumber, size: 5, state }));
	} catch (error) {
		NotificationManager.error(error.response.data.message, '', 3000);
		yield put(actions.sendPaymentConfirmationFail(error));
	}
}

export function* captureTransaction$({ payload }: any): Generator<*, *, *> {
	const { investmentId, orderID } = payload;
	try {
		yield captureTransactionAPI(investmentId, orderID);
		yield put(actions.captureTransactionSuccess());
	} catch (error) {
		yield put(actions.captureTransactionFail(error));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.getAllPayments, getAllPayments$),
		takeLatest(actions.sendPaymentConfirmation, sendPaymentConfirmation$),
		takeLatest(actions.getPaymentMethods, getPaymentMethods$),
		takeLatest(actions.getBankTransfer, getBankTransfer$),
		takeLatest(actions.getCardPayment, getCardPayment$),
		takeLatest(actions.getProformaInvoice, getProformaInvoice$),
		takeLatest(actions.getPaymentInvoice, getPaymentInvoiceAPI$),
		takeLatest(actions.captureTransaction, captureTransaction$),
	]);
}
