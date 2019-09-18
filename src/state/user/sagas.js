// @flow

import { all } from 'redux-saga/effects';
import profileSagas from './profile/sagas';
import dashboardSagas from './dashboard/sagas';

export default function*(): Generator<*, *, *> {
	yield all([profileSagas(), dashboardSagas()]);
}
