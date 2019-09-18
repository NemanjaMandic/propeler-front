// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLEAR_AUTH } from '../auth/actions';
import { CLOSE_DOCUMENT_SIGNING_DIALOG } from '../modals/actions';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_AUTH:
			return initialState();
		case actions.REGISTER_KEY:
			return {
				...state,
				kp: {
					...state.kp,
					body: null,
					inProgress: true,
				},
			};
		case actions.REGISTER_KEY_SUCCESS:
			return {
				...state,
				kp: {
					...state.kp,
					body: payload,
					inProgress: false,
				},
			};
		case actions.REGISTER_KEY_FAIL:
			return {
				...state,
				kp: {
					...state.kp,
					body: null,
					inProgress: false,
				},
			};
		case actions.GET_PUBLIC_KEY:
			return {
				...state,
				publicKeys: {
					...state.publicKeys,
					inProgress: true,
				},
			};
		case actions.GET_PUBLIC_KEY_SUCCESS: {
			const { authId, publicKey } = payload;
			const { publicKeys } = state;
			const { keys } = publicKeys;
			if (!keys[authId]) keys[authId] = [];
			keys[authId].push(publicKey);
			return {
				...state,
				publicKeys: {
					...state.publicKeys,
					inProgress: false,
					keys,
				},
			};
		}
		case actions.GET_PUBLIC_KEY_FAIL:
			return {
				...state,
				publicKeys: {
					...state.publicKeys,
					inProgress: false,
				},
			};
		case actions.GET_REGISTERED_KEY:
			return {
				...state,
				kp: {
					...state.kp,
					body: null,
					inProgress: true,
				},
			};
		case actions.GET_REGISTERED_KEY_SUCCESS: {
			const { authId, publicKey } = payload;
			const { publicKeys } = state;
			const { keys } = publicKeys;
			if (!keys[authId]) keys[authId] = [];
			keys[authId].push(publicKey);
			return {
				...state,
				kp: {
					...state.kp,
					body: { publicKey },
					inProgress: false,
				},
				publicKeys: {
					...state.publicKeys,
					inProgress: false,
					keys,
				},
			};
		}
		case actions.GET_REGISTERED_KEY_FAIL:
			return {
				...state,
				kp: {
					...state.kp,
					body: null,
					inProgress: false,
				},
			};
		case actions.SIGN_DOCUMENT:
			return {
				...state,
				signedDocument: {
					...state.signedDocument,
					document: null,
					inProgress: true,
					phase: 0,
				},
			};
		case actions.SIGN_DOCUMENT_SUCCESS:
			return {
				...state,
				signedDocument: {
					...state.signedDocument,
					document: payload,
					inProgress: false,
					phase: 1,
				},
			};
		case actions.SIGN_DOCUMENT_FAIL:
			return {
				...state,
				signedDocument: {
					...state.signedDocument,
					document: null,
					inProgress: false,
					phase: 2,
				},
			};
		case actions.SIGN_DOCUMENT_REINIT:
		case CLOSE_DOCUMENT_SIGNING_DIALOG:
			return {
				...state,
				signedDocument: {
					...state.signedDocument,
					document: null,
					inProgress: false,
					phase: 0,
				},
			};
		case actions.GET_CONTRACTS:
			return {
				...state,
				contracts: {
					...state.contracts,
					inProgress: true,
				},
			};
		case actions.GET_CONTRACTS_SUCCESS:
			return {
				...state,
				contracts: {
					...state.contracts,
					documents: payload,
					inProgress: false,
				},
			};
		case actions.GET_CONTRACTS_FAIL:
			return {
				...state,
				contracts: {
					...state.contracts,
					inProgress: false,
				},
			};
		default:
			return state;
	}
};
