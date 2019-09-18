// @flow
import * as actions from './actions';
import initialState from './initialState';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case actions.LOGOUT_USER:
			return {
				...state,
				authentication: {
					...state.authentication,
					errors: '',
					inProgress: true,
				},
			};
		case actions.CLEAR_AUTH:
			localStorage.removeItem('authorization');
			localStorage.clear();
			return initialState();
		case actions.LOGOUT_USER_FAIL:
			return {
				...state,
				authentication: {
					...state.authentication,
					errors: payload,
					inProgress: false,
				},
			};
		case actions.LOGIN_USER:
			return {
				...state,
				authentication: {
					...state.authentication,
					errors: '',
					inProgress: true,
				},
			};
		case actions.LOGIN_USER_SUCCESS:
			localStorage.setItem('authorization', payload.jwt);
			return {
				...state,
				authentication: {
					userId: Number(payload.sub),
					username: payload.username,
					role: payload.role,
					isAuthenticated: true,
					isAuthorized: true,
					errors: '',
					inProgress: false,
				},
			};
		case actions.LOGIN_USER_FAIL:
			return {
				...state,
				authentication: {
					...initialState().authentication,
					errors: payload,
				},
			};
		case actions.FORGOT_PASSWORD:
			return {
				...state,
				forgotPassword: { ...state.forgotPassword, inProgress: true },
			};
		case actions.FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					inProgress: false,
					success: true,
				},
			};
		case actions.FORGOT_PASSWORD_FAIL:
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					inProgress: false,
					success: false,
					errors: payload,
				},
			};
		case actions.FORGOT_USERNAME:
			return {
				...state,
				forgotUsername: { ...state.forgotUsername, inProgress: true },
			};
		case actions.FORGOT_USERNAME_SUCCESS:
			return {
				...state,
				forgotUsername: {
					...state.forgotUsername,
					inProgress: false,
					success: true,
				},
			};
		case actions.FORGOT_USERNAME_FAIL:
			return {
				...state,
				forgotUsername: {
					...state.forgotUsername,
					inProgress: false,
					success: false,
					errors: payload,
				},
			};
		case actions.CHANGE_PASSWORD:
			return {
				...state,
				changePassword: { ...state.changePassword, inProgress: true },
			};
		case actions.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				changePassword: {
					...state.changePassword,
					inProgress: false,
					success: true,
				},
			};
		case actions.CHANGE_PASSWORD_FAIL:
			return {
				...state,
				changePassword: {
					...state.changePassword,
					inProgress: false,
					success: false,
					errors: payload,
				},
			};

		case actions.REGISTER_ENTREPRENEUR:
		case actions.REGISTER_USER:
		case actions.REGISTER_COMPANY_INVESTOR:
		case actions.REGISTER_INDIVIDUAL_INVESTOR:
			return {
				...state,
				registerUser: { ...state.registerUser, inProgress: true },
			};

		case actions.REGISTER_ENTREPRENEUR_SUCCESS:
		case actions.REGISTER_USER_SUCCESS:
		case actions.REGISTER_COMPANY_INVESTOR_SUCCESS:
		case actions.REGISTER_INDIVIDUAL_INVESTOR_SUCCESS:
			return {
				...state,
				registerUser: {
					...state.registerUser,
					inProgress: false,
					success: true,
				},
			};

		case actions.REGISTER_ENTREPRENEUR_FAIL:
		case actions.REGISTER_USER_FAIL:
		case actions.REGISTER_COMPANY_INVESTOR_FAIL:
		case actions.REGISTER_INDIVIDUAL_INVESTOR_FAIL:
			return {
				...state,
				registerUser: {
					...state.registerUser,
					inProgress: false,
					success: false,
					errors: payload,
				},
			};
		case actions.CHECK_USERNAME:
			return {
				...state,
				checkUsername: { ...state.checkUsername, inProgress: true },
			};
		case actions.CHECK_USERNAME_SUCCESS:
			return {
				...state,
				checkUsername: {
					...state.checkUsername,
					inProgress: false,
					success: true,
				},
			};
		case actions.CHECK_USERNAME_FAIL:
			return {
				...state,
				checkUsername: {
					...state.checkUsername,
					inProgress: false,
					success: false,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: true,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL_SUCCESS:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: false,
					successFP: true,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL_FAIL:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: false,
					errors: payload,
					successFP: false,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL_DOC:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: true,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL_DOC_SUCCESS:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: false,
				},
			};
		case actions.SUBMIT_FUNDRAISING_PROPOSAL_DOC_FAIL:
			return {
				...state,
				fundRaisingProposal: {
					...state.fundRaisingProposal,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.UPLOAD_FUNDRAISING_PROPOSAL_DOC:
			return {
				...state,
				uploadDocument: {
					...state.uploadDocument,
					[payload.docType]: {
						inProgress: true,
					},
				},
			};
		case actions.UPLOAD_FUNDRAISING_PROPOSAL_DOC_SUCCESS:
			return {
				...state,
				uploadDocument: {
					...state.uploadDocument,
					[payload.docType]: {
						url: payload.url,
						inProgress: false,
					},
				},
			};
		case actions.UPLOAD_FUNDRAISING_PROPOSAL_DOC_FAIL:
			return {
				...state,
				uploadDocument: {
					...state.uploadDocument,
					[payload.docType]: {
						inProgress: false,
					},
					errors: payload.error,
				},
			};
		case actions.REMOVE_UPLOADED_DOC:
			return {
				...state,
				uploadDocument: {
					...state.uploadDocument,
					[payload.docType]: {
						url: '',
					},
				},
			};
		case actions.CHECK_REGISTRATION_TOKEN:
			return {
				...state,
				registrationToken: {
					...state.registrationToken,
					inProgress: true,
				},
			};
		case actions.CHECK_REGISTRATION_TOKEN_SUCCESS:
			return {
				...state,
				registrationToken: {
					...state.registrationToken,
					firstName: payload.firstName,
					lastName: payload.lastName,
					inProgress: false,
				},
			};
		case actions.CHECK_REGISTRATION_TOKEN_FAIL:
			return {
				...state,
				registrationToken: {
					...state.registrationToken,
					inProgress: false,
				},
			};
		case actions.GET_PLATFORM_SETTINGS:
			return {
				...state,
				platformSettings: {
					...state.platformSettings,
					inProgress: true,
				},
			};
		case actions.GET_PLATFORM_SETTINGS_SUCCESS:
			return {
				...state,
				platformSettings: {
					...state.platformSettings,
					inProgress: false,
					settings: payload,
				},
			};
		case actions.GET_PLATFORM_SETTINGS_FAIL:
			return {
				...state,
				platformSettings: {
					...state.platformSettings,
					inProgress: false,
					errors: payload,
				},
			};
		default:
			return state;
	}
};
