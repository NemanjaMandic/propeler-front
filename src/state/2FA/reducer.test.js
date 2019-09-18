// @flow

import { testReducer } from '../../utilities/testUtils';
import * as actions from './actions';
import initialState from './initialState';
import reducer from './reducer';

testReducer({
	testName: 'Reducer::2FA',
	moduleMocks: [],
	getReducer: () => reducer,
	getState: () => initialState,
	expectedActions: {
		[actions.OPEN_2FA_DIALOG]: {
			payload: { action: null, token: 'Token', remember: true },
			expectedStateDiff: {
				is2FAOpen: true,
				action: null,
				token: 'Token',
				showRememberMe: true,
			},
		},
		[actions.CLOSE_2FA_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				is2FAOpen: false,
				isRecoveryOpen: false,
				action: null,
				token: null,
			},
		},
		[actions.OPEN_NEW_RECOVERY_CODE_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				isNewRecoveryCodeOpen: true,
			},
		},
		[actions.CLOSE_NEW_RECOVERY_CODE_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				isNewRecoveryCodeOpen: false,
			},
		},
		[actions.OPEN_RECOVERY_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				is2FAOpen: false,
				isRecoveryOpen: true,
			},
		},
		[actions.OPEN_SECRET_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					open: true,
				},
			},
		},
		[actions.CLOSE_SECRET_DIALOG]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					open: false,
					success: false,
				},
			},
		},
		[actions.TWO_FA_INIT]: {
			payload: { token: 'token', twoFAStatus: 'status' },
			expectedStateDiff: {
				twoFAInit: {
					token: 'token',
					twoFAStatus: 'status',
					step: 1,
				},
			},
		},
		[actions.CREATE_SECRET]: {
			payload: {},
			expectedStateDiff: {
				createSecret: {
					inProgress: true,
				},
			},
		},
		[actions.CREATE_SECRET_SUCCESS]: {
			payload: { secret: 'secret', token: 'token' },
			expectedStateDiff: {
				twoFAInit: { step: 2 },
				createSecret: {
					inProgress: false,
					secret: 'secret',
					token: 'token',
				},
			},
		},
		[actions.CREATE_SECRET_FAIL]: {
			payload: 'Error',
			expectedStateDiff: {
				createSecret: {
					inProgress: false,
					errors: 'Error',
				},
			},
		},
		[actions.VERIFY_SECRET]: {
			payload: {},
			expectedStateDiff: {
				verifySecret: {
					inProgress: true,
				},
			},
		},
		[actions.VERIFY_SECRET_SUCCESS]: {
			payload: { wildcards: [] },
			expectedStateDiff: {
				twoFAInit: { step: 3 },
				verifySecret: {
					inProgress: false,
					wildcards: [],
				},
			},
		},
		[actions.VERIFY_SECRET_FAIL]: {
			payload: 'Error',
			expectedStateDiff: {
				verifySecret: {
					inProgress: false,
					errors: 'Error',
				},
			},
		},
		[actions.INITIATE_NEW_SECRET]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					initiateInProgress: true,
				},
			},
		},
		[actions.INITIATE_NEW_SECRET_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					initiateInProgress: false,
					open: false,
				},
			},
		},
		[actions.INITIATE_NEW_SECRET_FAIL]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					initiateInProgress: false,
				},
			},
		},
		[actions.GENERATE_NEW_SECRET]: {
			payload: {},
			expectedStateDiff: {},
		},
		[actions.GENERATE_NEW_SECRET_SUCCESS]: {
			payload: 'secret',
			expectedStateDiff: {
				newSecret: {
					open: true,
					success: true,
					secret: 'secret',
				},
			},
		},
		[actions.GENERATE_NEW_SECRET_FAIL]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					success: false,
				},
			},
		},
		[actions.VERIFY_NEW_SECRET]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					verifyInProgress: true,
				},
			},
		},
		[actions.VERIFY_NEW_SECRET_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					verifyInProgress: false,
					open: false,
					success: false,
				},
			},
		},
		[actions.VERIFY_NEW_SECRET_FAIL]: {
			payload: {},
			expectedStateDiff: {
				newSecret: {
					verifyInProgress: false,
				},
			},
		},
	},
});
