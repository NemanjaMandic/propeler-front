// @flow

import { testReducer } from '../../utilities/testUtils';
import * as actions from './actions';
import initialState from './initialState';
import reducer from './reducer';

testReducer({
	testName: 'Reducer::Profile',
	moduleMocks: [],
	getReducer: () => reducer,
	getState: () => initialState,
	expectedActions: {
		[actions.CREATE_COMPANY]: {
			payload: {},
			expectedStateDiff: {
				createCompany: {
					inProgress: true,
				},
			},
		},
		[actions.CREATE_COMPANY_SUCCESS]: {
			payload: {
				address: '',
				bankAccount: '',
				city: '',
				companyCategory: {
					id: 0,
					name: '',
				},
				county: '',
				featuredImageUrl: '',
				id: 0,
				logoUrl: '',
				name: '',
				ownerId: 0,
				taxIdentifier: '',
				website: '',
			},
			expectedStateDiff: {
				createCompany: {
					inProgress: false,
				},
				info: {
					address: '',
					bankAccount: '',
					city: '',
					companyCategory: {
						id: 0,
						name: '',
					},
					county: '',
					featuredImageUrl: '',
					id: 0,
					logoUrl: '',
					name: '',
					ownerId: 0,
					taxIdentifier: '',
					website: '',
				},
			},
		},
		[actions.CREATE_COMPANY_FAIL]: {
			payload: { error: 'Create company basic info failed' },
			expectedStateDiff: {
				createCompany: {
					inProgress: false,
				},
				errors: { error: 'Create company basic info failed' },
			},
		},
	},
});
