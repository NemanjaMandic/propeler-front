// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLEAR_AUTH } from '../../auth/actions';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_AUTH:
			return initialState();
		case actions.CHANGE_PASSWORD_PROFILE:
			return {
				...state,
				changePassword: {
					inProgress: true,
				},
			};
		case actions.CHANGE_PASSWORD_PROFILE_SUCCESS:
			return {
				...state,
				changePassword: {
					inProgress: false,
				},
			};
		case actions.CHANGE_PASSWORD_PROFILE_FAIL:
			return {
				...state,
				errors: payload,
				changePassword: {
					inProgress: false,
				},
			};
		case actions.GET_USER_INFO:
			return {
				...state,
				inProgress: true,
			};
		case actions.GET_USER_INFO_SUCCESS:
			return {
				...state,
				inProgress: false,
				info: payload,
			};
		case actions.GET_USER_INFO_FAIL:
			return {
				...state,
				errors: payload,
				inProgress: false,
			};

		case actions.CHANGE_USER_PROFILE:
			return {
				...state,
				changeUserProfile: {
					inProgress: true,
				},
			};
		case actions.CHANGE_USER_PROFILE_SUCCESS:
			return {
				...state,
				changeUserProfile: {
					inProgress: false,
				},
				info: payload,
			};
		case actions.CHANGE_USER_PROFILE_FAIL:
			return {
				...state,
				errors: payload,
				changeUserProfile: {
					inProgress: false,
				},
			};
		case actions.UPLOAD_PROFILE_PHOTO:
			return {
				...state,
				upload: {
					inProgress: true,
				},
			};
		case actions.UPLOAD_PROFILE_PHOTO_SUCCESS:
			return {
				...state,
				upload: {
					inProgress: false,
				},
				getProfilePhoto: {
					fileDto: {
						file: payload,
					},
				},
			};
		case actions.UPLOAD_PROFILE_PHOTO_FAIL:
			return {
				...state,
				errors: payload,
				upload: {
					inProgress: false,
				},
			};
		case actions.DELETE_PROFILE_PHOTO:
			return {
				...state,
				deleteProfilePhoto: {
					inProgress: true,
				},
			};
		case actions.DELETE_PROFILE_PHOTO_SUCCESS:
			return {
				...state,
				deleteProfilePhoto: {
					inProgress: false,
				},
				getProfilePhoto: {
					fileDto: {
						type: '',
						file: '',
					},
				},
			};
		case actions.DELETE_PROFILE_PHOTO_FAIL:
			return {
				...state,
				errors: payload,
				deleteProfilePhoto: {
					inProgress: false,
				},
			};
		case actions.GET_PROFILE_PHOTO:
			return {
				...state,
				getProfilePhoto: {
					inProgress: true,
				},
			};
		case actions.GET_PROFILE_PHOTO_SUCCESS:
			return {
				...state,
				getProfilePhoto: {
					inProgress: false,
					fileDto: payload,
				},
			};
		case actions.GET_PROFILE_PHOTO_FAIL:
			return {
				...state,
				errors: payload,
				getProfilePhoto: {
					inProgress: false,
				},
			};
		case actions.CHANGE_EMAIL_PROFILE:
			return {
				...state,
				changeEmail: {
					errors: '',
					inProgress: true,
				},
			};
		case actions.CHANGE_EMAIL_PROFILE_SUCCESS:
			return {
				...state,
				changeEmail: {
					...state.changeEmail,
					inProgress: false,
				},
			};
		case actions.CHANGE_EMAIL_PROFILE_FAIL:
			return {
				...state,
				changeEmail: {
					errors: payload,
					inProgress: false,
				},
			};
		case actions.RECOVERY_CODES:
			return {
				...state,
				recoveryCode: { ...state.recoveryCode, inProgress: true },
			};
		case actions.RECOVERY_CODES_SUCCESS:
			return {
				...state,
				recoveryCode: {
					...state.recoveryCode,
					inProgress: false,
					wildcards: payload,
				},
			};
		case actions.RECOVERY_CODES_FAIL:
			return {
				...state,
				recoveryCode: {
					...state.recoveryCode,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.UPLOAD_KYC_FRONT_PHOTO:
			return {
				...state,
				kycFrontPhoto: {
					...state.kycFrontPhoto,
					inProgress: true,
				},
			};
		case actions.UPLOAD_KYC_FRONT_PHOTO_SUCCESS:
			return {
				...state,
				kycFrontPhoto: {
					...state.kycFrontPhoto,
					inProgress: false,
					fileDto: {
						...state.kycFrontPhoto.fileDto,
						file: payload.file,
						url: payload.url,
					},
				},
			};
		case actions.UPLOAD_KYC_FRONT_PHOTO_FAIL:
			return {
				...state,
				errors: payload,
				kycFrontPhoto: {
					...state.kycFrontPhoto,
					inProgress: false,
				},
			};
		case actions.UPLOAD_KYC_BACK_PHOTO:
			return {
				...state,
				kycBackPhoto: {
					...state.kycBackPhoto,
					inProgress: true,
				},
			};
		case actions.UPLOAD_KYC_BACK_PHOTO_SUCCESS:
			return {
				...state,
				kycBackPhoto: {
					...state.kycBackPhoto,
					inProgress: false,
					fileDto: {
						...state.kycBackPhoto.fileDto,
						file: payload.file,
						url: payload.url,
					},
				},
			};
		case actions.UPLOAD_KYC_BACK_PHOTO_FAIL:
			return {
				...state,
				errors: payload,
				kycBackPhoto: {
					...state.kycBackPhoto,
					inProgress: false,
				},
			};
		case actions.SUBMIT_KYC_REQUEST:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: true,
				},
			};
		case actions.SUBMIT_KYC_REQUEST_SUCCESS:
			return {
				...state,
				kycCurrentUser: {
					...state.kycCurrentUser,
					requestState: payload.requestState,
					auditorId: null,
				},
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
			};
		case actions.SUBMIT_KYC_REQUEST_FAIL:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
				errors: payload,
			};
		case actions.DELETE_KYC_FRONT_PHOTO:
			return {
				...state,
				kycFrontPhoto: initialState().kycFrontPhoto,
			};
		case actions.DELETE_KYC_BACK_PHOTO:
			return {
				...state,
				kycBackPhoto: initialState().kycBackPhoto,
			};
		case actions.UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT:
			return {
				...state,
				kycCompanyInvestorDocument: {
					...state.kycCompanyInvestorDocument,
					inProgress: true,
				},
			};
		case actions.UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_SUCCESS:
			return {
				...state,
				kycCompanyInvestorDocument: {
					...state.kycCompanyInvestorDocument,
					inProgress: false,
					files: [
						...state.kycCompanyInvestorDocument.files,
						{
							file: payload.file,
							url: payload.url,
							title: payload.title,
						},
					],
				},
			};
		case actions.UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_FAIL:
			return {
				...state,
				errors: payload,
				kycCompanyInvestorDocument: {
					...state.kycCompanyInvestorDocument,
					inProgress: false,
				},
			};
		case actions.REMOVE_UPLOADED_KYC_COMAPNY_DOCUMENT: {
			const indexOfFile = state.kycCompanyInvestorDocument.files.indexOf(payload);
			state.kycCompanyInvestorDocument.files.splice(indexOfFile, 1);
			return {
				...state,
				kycCompanyInvestorDocument: {
					...state.kycCompanyInvestorDocument,
				},
			};
		}
		case actions.GET_KYC_FOR_CURRENT_USER:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: true,
				},
			};
		case actions.GET_KYC_FOR_CURRENT_USER_SUCCESS: {
			const t = payload.userDocuments.filter(doc => doc.title === 'KycFrontPhoto');
			const urlFrontPhoto = t.length > 0 ? t[0].url : '';
			const tBack = payload.userDocuments.filter(doc => doc.title === 'KycBackPhoto');
			const urlBackPhoto = tBack.length > 0 ? tBack[0].url : '';

			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
				kycCurrentUser: {
					...state.kycCurrentUser,
					...payload,
				},
				kycFrontPhoto: {
					...state.kycFrontPhoto,
					fileDto: {
						...state.kycFrontPhoto.fileDto,
						url: urlFrontPhoto === '' ? state.kycFrontPhoto.fileDto.url : urlFrontPhoto,
					},
				},
				kycBackPhoto: {
					...state.kycBackPhoto,
					fileDto: {
						...state.kycBackPhoto.fileDto,
						url: urlBackPhoto === '' ? state.kycBackPhoto.fileDto.url : urlFrontPhoto,
					},
				},
				kycCompanyInvestorDocument: {
					...state.kycCompanyInvestorDocument,
					files:
						payload.userDocuments.length === 0
							? { ...state.kycCompanyInvestorDocument.files }
							: payload.userDocuments.filter(doc => doc.type === 'CORPORATE_INVESTOR_KYC'),
				},
			};
		}
		case actions.GET_KYC_FOR_CURRENT_USER_FAIL:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
				errors: payload,
			};
		case actions.GET_KYC_DOC_FOR_CURRENT_USER:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: true,
				},
			};
		case actions.GET_KYC_DOC_FOR_CURRENT_USER_SUCCESS: {
			const files = state.kycCurrentUser.files;
			files.push(payload.data);

			if (payload.data.title === 'KycFrontPhoto') {
				return {
					...state,
					kycCurrentUser: {
						...state.kycCurrentUser,
						files,
					},
					kycFrontPhoto: {
						...state.kycFrontPhoto,
						fileDto: {
							...state.kycFrontPhoto.fileDto,
							file: payload.data.file,
							type: payload.data.type,
						},
					},
					kycRequestAction: {
						...state.kycRequestAction,
						inProgress: false,
					},
				};
			}
			if (payload.data.title === 'KycBackPhoto') {
				return {
					...state,
					kycCurrentUser: {
						...state.kycCurrentUser,
						files,
					},
					kycBackPhoto: {
						...state.kycBackPhoto,
						fileDto: {
							...state.kycBackPhoto.fileDto,
							file: payload.data.file,
							type: payload.data.type,
						},
					},
					kycRequestAction: {
						...state.kycRequestAction,
						inProgress: false,
					},
				};
			}
			return {
				...state,
				kycCurrentUser: {
					...state.kycCurrentUser,
					files,
				},
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
			};
		}
		case actions.GET_KYC_DOC_FOR_CURRENT_USER_FAIL:
			return {
				...state,
				kycRequestAction: {
					...state.kycRequestAction,
					inProgress: false,
				},
				errors: payload,
			};

		case actions.GET_KYC_NOTIFICATION:
			return {
				...state,
				kycCurrentUser: {
					...state.kycCurrentUser,
					requestState: payload,
				},
			};
		default:
			return state;
	}
};
