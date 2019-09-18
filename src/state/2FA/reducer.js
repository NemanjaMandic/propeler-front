// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLEAR_AUTH } from '../auth/actions';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_AUTH:
			return initialState();
		case actions.OPEN_2FA_DIALOG:
			return {
				...state,
				is2FAOpen: true,
				action: payload.action,
				token: payload.token,
				showRememberMe: payload.remember,
			};
		case actions.OPEN_RECOVERY_DIALOG:
			return {
				...state,
				is2FAOpen: false,
				isRecoveryOpen: true,
			};
		case actions.CLOSE_2FA_DIALOG:
			return {
				...state,
				is2FAOpen: false,
				isRecoveryOpen: false,
				action: null,
				token: null,
			};
		case actions.OPEN_NEW_RECOVERY_CODE_DIALOG:
			return {
				...state,
				isNewRecoveryCodeOpen: true,
			};
		case actions.CLOSE_NEW_RECOVERY_CODE_DIALOG:
			return {
				...state,
				isNewRecoveryCodeOpen: false,
			};
		case actions.OPEN_SECRET_DIALOG:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					open: true,
				},
			};
		case actions.CLOSE_SECRET_DIALOG:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					open: false,
					success: false,
				},
			};
		case actions.TWO_FA_INIT:
			return {
				...state,
				twoFAInit: {
					...state.twoFAInit,
					token: payload.token,
					twoFAStatus: payload.twoFAStatus,
					step: 1,
				},
			};
		case actions.TWO_FA_INIT_NEXT:
			return {
				...state,
				twoFAInit: { ...state.twoFAInit, step: state.twoFAInit.step + 1 },
			};
		case actions.TWO_FA_INIT_BACK:
			return {
				...state,
				twoFAInit: { ...state.twoFAInit, step: state.twoFAInit.step - 1 },
			};
		case actions.CREATE_SECRET:
			return {
				...state,
				createSecret: { ...state.createSecret, inProgress: true },
			};
		case actions.CREATE_SECRET_SUCCESS:
			return {
				...state,
				twoFAInit: { ...state.twoFAInit, step: 2 },
				createSecret: {
					...state.createSecret,
					inProgress: false,
					secret: payload.secret,
					token: payload.token,
				},
			};
		case actions.CREATE_SECRET_FAIL:
			return {
				...state,
				createSecret: {
					...state.createSecret,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.VERIFY_SECRET:
			return {
				...state,
				verifySecret: { ...state.verifySecret, inProgress: true },
			};
		case actions.VERIFY_SECRET_SUCCESS:
			return {
				...state,
				twoFAInit: { ...state.twoFAInit, step: 3 },
				verifySecret: {
					...state.verifySecret,
					inProgress: false,
					wildcards: payload.wildcards,
				},
			};
		case actions.VERIFY_SECRET_FAIL:
			return {
				...state,
				verifySecret: {
					...state.verifySecret,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.INITIATE_NEW_SECRET:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					initiateInProgress: true,
				},
			};
		case actions.INITIATE_NEW_SECRET_SUCCESS:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					initiateInProgress: false,
					open: false,
				},
			};
		case actions.INITIATE_NEW_SECRET_FAIL:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					initiateInProgress: false,
				},
			};
		case actions.GENERATE_NEW_SECRET:
			return {
				...state,
			};
		case actions.GENERATE_NEW_SECRET_SUCCESS:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					open: true,
					success: true,
					secret: payload,
				},
			};
		case actions.GENERATE_NEW_SECRET_FAIL:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					success: false,
				},
			};
		case actions.VERIFY_NEW_SECRET:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					verifyInProgress: true,
				},
			};
		case actions.VERIFY_NEW_SECRET_SUCCESS:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					verifyInProgress: false,
					open: false,
					success: false,
					secret: '',
				},
			};
		case actions.VERIFY_NEW_SECRET_FAIL:
			return {
				...state,
				newSecret: {
					...state.newSecret,
					verifyInProgress: false,
				},
			};
		default:
			return state;
	}
};
