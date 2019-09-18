// @flow

import { all } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import userSaga from './user/sagas';
import twoFASaga from './2FA/sagas';
import companySaga from './company/sagas';
import campaignSaga from './campaign/sagas';
import investorSaga from './investor/sagas';
import adminSaga from './admin/sagas';
import documentSaga from './documents/sagas';
import webSocketSaga from './websockets/sagas';
import inboxSaga from './inbox/sagas';
import signatureSaga from './signature/sagas';
import paymentSaga from './payment/sagas';

export default function*(): Generator<*, *, *> {
	yield all([
		authSaga(),
		userSaga(),
		twoFASaga(),
		companySaga(),
		campaignSaga(),
		investorSaga(),
		adminSaga(),
		documentSaga(),
		webSocketSaga(),
		inboxSaga(),
		signatureSaga(),
		paymentSaga(),
	]);
}
