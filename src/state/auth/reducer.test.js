// @flow

import { testReducer } from '../../utilities/testUtils';
import * as actions from './actions';
import initialState from './initialState';
import reducer from './reducer';

testReducer({
	testName: 'Reducer::Auth',
	moduleMocks: [],
	getReducer: () => reducer,
	getState: () => initialState,
	expectedActions: {
		[actions.LOGOUT_USER]: {
			payload: {},
			expectedStateDiff: {
				authentication: {
					errors: '',
					inProgress: true,
				},
			},
		},
		[actions.CLEAR_AUTH]: {
			payload: {},
			expectedStateDiff: {
				...initialState(),
			},
		},
		[actions.LOGOUT_USER_FAIL]: {
			payload: { error: 'Logout failed' },
			expectedStateDiff: {
				authentication: {
					inProgress: false,
					errors: { error: 'Logout failed' },
				},
			},
		},
		[actions.LOGIN_USER]: {
			payload: {},
			expectedStateDiff: {
				authentication: {
					errors: '',
					inProgress: true,
				},
			},
		},
		[actions.LOGIN_USER_SUCCESS]: {
			payload: {
				jwt:
					'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaXNzIjoicmVhbG1hcmtldC5pbyIsImlhdCI6MTU1MDc0OTU2NCwidXNlcm5hbWUiOiJBbmdlbGluYSJ9.BXTgu3XAkq0wAexllEPIQBxSKbOmBEZAGSS3R3C3omolFh4tX3CuRXycKMmLW1j-zgPgnb8eP3uaKe6NZCsVdA',
				username: 'Angelina',
				role: 'ROLE_INDIVIDUAL_INVESTOR',
				sub: 2,
			},
			expectedStateDiff: {
				authentication: {
					userId: 2,
					username: 'Angelina',
					role: 'ROLE_INDIVIDUAL_INVESTOR',
					inProgress: false,
					errors: '',
					isAuthenticated: true,
					isAuthorized: true,
				},
			},
		},
		[actions.LOGIN_USER_FAIL]: {
			payload: { error: 'Login failed' },
			expectedStateDiff: {
				authentication: {
					...initialState().authentication,
					errors: { error: 'Login failed' },
				},
			},
		},
		[actions.FORGOT_PASSWORD]: {
			payload: {},
			expectedStateDiff: {
				forgotPassword: { inProgress: true },
			},
		},
		[actions.FORGOT_PASSWORD_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				forgotPassword: { inProgress: false, success: true },
			},
		},
		[actions.FORGOT_PASSWORD_FAIL]: {
			payload: { error: 'Forget password failed' },
			expectedStateDiff: {
				forgotPassword: {
					inProgress: false,
					success: false,
					errors: { error: 'Forget password failed' },
				},
			},
		},
		[actions.FORGOT_USERNAME]: {
			payload: {},
			expectedStateDiff: {
				forgotUsername: { inProgress: true },
			},
		},
		[actions.FORGOT_USERNAME_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				forgotUsername: { inProgress: false, success: true },
			},
		},
		[actions.FORGOT_USERNAME_FAIL]: {
			payload: { error: 'Forget username failed' },
			expectedStateDiff: {
				forgotUsername: {
					inProgress: false,
					success: false,
					errors: { error: 'Forget username failed' },
				},
			},
		},
		[actions.CHANGE_PASSWORD]: {
			payload: {},
			expectedStateDiff: {
				changePassword: { inProgress: true },
			},
		},
		[actions.CHANGE_PASSWORD_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				changePassword: { inProgress: false, success: true },
			},
		},
		[actions.CHANGE_PASSWORD_FAIL]: {
			payload: { error: 'Change password failed' },
			expectedStateDiff: {
				changePassword: {
					inProgress: false,
					success: false,
					errors: { error: 'Change password failed' },
				},
			},
		},
		[actions.REGISTER_USER]: {
			payload: {},
			expectedStateDiff: {
				registerUser: { inProgress: true },
			},
		},
		[actions.REGISTER_USER_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				registerUser: { inProgress: false, success: true },
			},
		},
		[actions.REGISTER_USER_FAIL]: {
			payload: { error: 'Register user failed' },
			expectedStateDiff: {
				registerUser: {
					inProgress: false,
					success: false,
					errors: { error: 'Register user failed' },
				},
			},
		},
		[actions.CHECK_USERNAME]: {
			payload: {},
			expectedStateDiff: {
				checkUsername: { inProgress: true },
			},
		},
		[actions.CHECK_USERNAME_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				checkUsername: { inProgress: false, success: true },
			},
		},
		[actions.CHECK_USERNAME_FAIL]: {
			payload: {},
			expectedStateDiff: {
				checkUsername: { inProgress: false, success: false },
			},
		},
	},
});
