// @flow

import { testReducer } from '../../../utilities/testUtils';
import * as actions from './actions';
import initialState from './initialState';
import reducer from './reducer';

testReducer({
	testName: 'Reducer::Profile',
	moduleMocks: [],
	getReducer: () => reducer,
	getState: () => initialState,
	expectedActions: {
		[actions.CHANGE_PASSWORD_PROFILE]: {
			payload: {},
			expectedStateDiff: {
				changePassword: {
					inProgress: true,
				},
			},
		},
		[actions.CHANGE_PASSWORD_PROFILE_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				changePassword: {
					inProgress: false,
				},
			},
		},
		[actions.CHANGE_PASSWORD_PROFILE_FAIL]: {
			payload: { error: 'Change password failed' },
			expectedStateDiff: {
				changePassword: {
					inProgress: false,
				},
				errors: { error: 'Change password failed' },
			},
		},
		[actions.CHANGE_EMAIL_PROFILE]: {
			payload: {},
			expectedStateDiff: {
				changeEmail: {
					errors: '',
					inProgress: true,
				},
			},
		},
		[actions.CHANGE_EMAIL_PROFILE_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				changeEmail: {
					inProgress: false,
				},
			},
		},
		[actions.CHANGE_EMAIL_PROFILE_FAIL]: {
			payload: { error: 'Change email failed' },
			expectedStateDiff: {
				changeEmail: {
					errors: { error: 'Change email failed' },
					inProgress: false,
				},
			},
		},
		[actions.RECOVERY_CODES]: {
			payload: {},
			expectedStateDiff: {
				recoveryCode: {
					inProgress: true,
				},
			},
		},
		[actions.RECOVERY_CODES_SUCCESS]: {
			payload: { wildcards: [] },
			expectedStateDiff: {
				recoveryCode: {
					inProgress: false,
					wildcards: [],
				},
			},
		},
		[actions.RECOVERY_CODES_FAIL]: {
			payload: { error: 'Get new recovery codes failed' },
			expectedStateDiff: {
				recoveryCode: {
					errors: { error: 'Get new recovery codes failed' },
					inProgress: false,
				},
			},
		},
		[actions.GET_USER_INFO]: {
			payload: {},
			expectedStateDiff: {
				inProgress: true,
			},
		},
		[actions.GET_USER_INFO_SUCCESS]: {
			payload: {
				address: '',
				city: '',
				countryOfResidence: '',
				countryForTaxation: '',
				email: '',
				firstName: '',
				id: 0,
				lastName: '',
				phoneNumber: '',
				profilePictureUrl: '',
			},
			expectedStateDiff: {
				inProgress: false,
				info: {
					address: '',
					city: '',
					countryOfResidence: '',
					countryForTaxation: '',
					email: '',
					firstName: '',
					id: 0,
					lastName: '',
					phoneNumber: '',
					profilePictureUrl: '',
				},
			},
		},
		[actions.GET_USER_INFO_FAIL]: {
			payload: { error: 'Get user info failed' },
			expectedStateDiff: {
				errors: { error: 'Get user info failed' },
				inProgress: false,
			},
		},
		[actions.CHANGE_USER_PROFILE]: {
			payload: {},
			expectedStateDiff: {
				changeUserProfile: {
					inProgress: true,
				},
			},
		},
		[actions.CHANGE_USER_PROFILE_SUCCESS]: {
			payload: {
				address: '',
				city: '',
				countryOfResidence: '',
				countryForTaxation: '',
				email: '',
				firstName: '',
				id: 0,
				lastName: '',
				phoneNumber: '',
				profilePictureUrl: '',
			},
			expectedStateDiff: {
				changeUserProfile: {
					inProgress: false,
				},
				info: {
					address: '',
					city: '',
					countryOfResidence: '',
					countryForTaxation: '',
					email: '',
					firstName: '',
					id: 0,
					lastName: '',
					phoneNumber: '',
					profilePictureUrl: '',
				},
			},
		},
		[actions.CHANGE_USER_PROFILE_FAIL]: {
			payload: { error: 'Change user info failed' },
			expectedStateDiff: {
				errors: { error: 'Change user info failed' },
				changeUserProfile: {
					inProgress: false,
				},
			},
		},
		[actions.UPLOAD_PROFILE_PHOTO]: {
			payload: {},
			expectedStateDiff: {
				upload: {
					inProgress: true,
				},
			},
		},
		[actions.UPLOAD_PROFILE_PHOTO_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				upload: {
					inProgress: false,
				},
			},
		},
		[actions.UPLOAD_PROFILE_PHOTO_FAIL]: {
			payload: { error: 'Upload user profile photo failed' },
			expectedStateDiff: {
				errors: { error: 'Upload user profile photo failed' },
				upload: {
					inProgress: false,
				},
			},
		},
		[actions.DELETE_PROFILE_PHOTO]: {
			payload: {},
			expectedStateDiff: {
				deleteProfilePhoto: {
					inProgress: true,
				},
			},
		},
		[actions.DELETE_PROFILE_PHOTO_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				deleteProfilePhoto: {
					inProgress: false,
				},
				getProfilePhoto: {
					fileDto: {
						type: '',
						file: '',
					},
				},
			},
		},
		[actions.DELETE_PROFILE_PHOTO_FAIL]: {
			payload: { error: 'Delete user profile photo failed' },
			expectedStateDiff: {
				errors: { error: 'Delete user profile photo failed' },
				deleteProfilePhoto: {
					inProgress: false,
				},
			},
		},
		[actions.GET_PROFILE_PHOTO]: {
			payload: {},
			expectedStateDiff: {
				getProfilePhoto: {
					inProgress: true,
				},
			},
		},
		[actions.GET_PROFILE_PHOTO_SUCCESS]: {
			payload: { type: '', file: '' },
			expectedStateDiff: {
				getProfilePhoto: {
					inProgress: false,
					fileDto: {
						type: '',
						file: '',
					},
				},
			},
		},
		[actions.GET_PROFILE_PHOTO_FAIL]: {
			payload: { error: 'Get user profile photo failed' },
			expectedStateDiff: {
				errors: { error: 'Get user profile photo failed' },
				getProfilePhoto: {
					inProgress: false,
				},
			},
		},
		[actions.CHANGE_EMAIL_PROFILE]: {
			payload: {},
			expectedStateDiff: {
				changeEmail: {
					inProgress: true,
					errors: '',
				},
			},
		},
		[actions.CHANGE_EMAIL_PROFILE_SUCCESS]: {
			payload: {},
			expectedStateDiff: {
				changeEmail: {
					inProgress: false,
				},
			},
		},
		[actions.CHANGE_EMAIL_PROFILE_FAIL]: {
			payload: { error: 'Change user email profile failed' },
			expectedStateDiff: {
				changeEmail: {
					errors: { error: 'Change user email profile failed' },
					inProgress: false,
				},
			},
		},
	},
});
