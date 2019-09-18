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
		case actions.CREATE_COMPANY:
			return {
				...state,
				createCompany: { ...state.createCompany, inProgress: true },
			};
		case actions.CREATE_COMPANY_SUCCESS:
			return {
				...state,
				createCompany: {
					...state.createCompany,
					inProgress: false,
					step: state.createCompany.step + 1,
				},
				info: payload,
			};
		case actions.CREATE_COMPANY_FAIL:
			return {
				...state,
				createCompany: {
					...state.createCompany,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.REVIEW_COMPANY:
			return {
				...state,
				reviewCompany: {
					...state.reviewCompany,
					inProgress: true,
				},
			};
		case actions.REVIEW_COMPANY_SUCCESS:
			return {
				...state,
				reviewCompany: {
					...state.reviewCompany,
					inProgress: false,
				},
			};
		case actions.REVIEW_COMPANY_FAIL:
			return {
				...state,
				reviewCompany: {
					...state.reviewCompany,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.UPDATE_EXTERNAL_LINKS:
			return {
				...state,
				updateExternalLinks: {
					...state.updateExternalLinks,
					inProgress: true,
				},
			};

		case actions.UPDATE_EXTERNAL_LINKS_SUCCESS:
			return {
				...state,
				updateExternalLinks: {
					...state.updateExternalLinks,
					inProgress: false,
				},
			};

		case actions.UPDATE_EXTERNAL_LINKS_FAIL:
			return {
				...state,
				updateExternalLinks: {
					...state.updateExternalLinks,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_COMPANY:
			return {
				...state,
				info: { ...state.info, inProgress: true, errors: '' },
				logo: initialState().logo,
				featuredImage: initialState().featuredImage,
			};
		case actions.GET_COMPANY_SUCCESS:
			return {
				...state,
				info: { ...payload, inProgress: false, errors: '' },
			};
		case actions.GET_COMPANY_FAIL:
			return {
				...state,
				info: { ...state.info, inProgress: false, errors: payload },
			};
		case actions.UPLOAD_COMPANY_LOGO:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: true,
					errors: '',
				},
			};
		case actions.UPLOAD_COMPANY_LOGO_SUCCESS:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: false,
					fileDto: {
						file: payload,
					},
				},
			};
		case actions.UPLOAD_COMPANY_LOGO_FAIL:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_COMPANY_LOGO:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: true,
					errors: '',
				},
			};
		case actions.GET_COMPANY_LOGO_SUCCESS:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: false,
					fileDto: payload,
				},
			};
		case actions.GET_COMPANY_LOGO_FAIL:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.DELETE_COMPANY_LOGO:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: true,
					errors: '',
				},
			};
		case actions.DELETE_COMPANY_LOGO_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					logoUrl: '',
				},
				logo: {
					...state.logo,
					inProgress: false,
					fileDto: {
						file: '',
					},
				},
			};
		case actions.DELETE_COMPANY_LOGO_FAIL:
			return {
				...state,
				logo: {
					...state.logo,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.UPLOAD_FEATURED_IMAGE:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.UPLOAD_FEATURED_IMAGE_SUCCESS:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					fileDto: {
						file: payload,
					},
				},
			};
		case actions.UPLOAD_FEATURED_IMAGE_FAIL:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_FEATURED_IMAGE:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.GET_FEATURED_IMAGE_SUCCESS:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					fileDto: payload,
				},
			};
		case actions.GET_FEATURED_IMAGE_FAIL:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.DELETE_FEATURED_IMAGE:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.DELETE_FEATURED_IMAGE_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					featuredImageUrl: '',
				},
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					fileDto: {
						file: '',
					},
				},
			};
		case actions.DELETE_FEATURED_IMAGE_FAIL:
			return {
				...state,
				featuredImage: {
					...state.featuredImage,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.STEP_BACK:
			return {
				...state,
				createCompany: {
					step: state.createCompany.step - 1,
				},
			};
		case actions.STEP_NEXT:
			return {
				...state,
				createCompany: {
					step: state.createCompany.step + 1,
				},
			};
		case actions.UPDATE_COMPANY:
			return {
				...state,
				updateCompany: { ...state.updateCompany, inProgress: true },
			};
		case actions.UPDATE_COMPANY_SUCCESS:
			return {
				...state,
				updateCompany: { ...state.updateCompany, inProgress: false },
				info: payload,
			};
		case actions.UPDATE_COMPANY_FAIL:
			return {
				...state,
				updateCompany: {
					...state.updateCompany,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_USER_COMPANY:
			return {
				...state,
				info: { ...state.info, inProgress: true, errors: '' },
			};
		case actions.GET_USER_COMPANY_SUCCESS:
			return {
				...state,
				info: { ...payload, inProgress: false, errors: '' },
			};
		case actions.GET_USER_COMPANY_FAIL:
			return {
				...state,
				info: { ...state.info, inProgress: false, errors: payload },
			};
		case actions.GET_SHARE_HOLDERS:
		case actions.GET_SHARE_HOLDERS_MINE:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: true,
					error: '',
				},
			};
		case actions.GET_SHARE_HOLDERS_SUCCESS:
		case actions.GET_SHARE_HOLDERS_MINE_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					shareHolders: payload,
				},
			};
		case actions.GET_SHARE_HOLDERS_FAIL:
		case actions.GET_SHARE_HOLDERS_MINE_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					error: payload,
				},
			};
		case actions.GET_SHARE_HOLDER_PHOTO:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.GET_SHARE_HOLDERS_PHOTO_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: false, fileDto: payload.data } : value,
					): Array<Object>),
				},
			};
		case actions.GET_SHARE_HOLDERS_PHOTO_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.REORDER_SHARE_HOLDERS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: true,
					error: '',
				},
			};
		case actions.REORDER_SHARE_HOLDERS_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
				},
			};
		case actions.REORDER_SHARE_HOLDERS_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					error: payload,
				},
			};
		case actions.UPDATE_SHARE_HOLDER:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: true,
					error: false,
				},
			};
		case actions.UPDATE_SHARE_HOLDER_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					shareHolders: (state.shareHolders.shareHolders.map(item =>
						item.id === payload.shareHolderId
							? {
									...payload.data,
									fileDto: item.fileDto,
									initial: false,
							  }
							: item,
					): Array<Object>),
				},
			};
		case actions.UPDATE_SHARE_HOLDER_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					error: payload,
				},
			};
		case actions.DELETE_SHARE_HOLDER:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: true,
					error: false,
				},
			};
		case actions.DELETE_SHARE_HOLDER_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					shareHolders: (state.shareHolders.shareHolders.filter(item => item.id !== payload): Array<Object>),
				},
			};
		case actions.DELETE_SHARE_HOLDER_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					error: payload,
				},
			};
		case actions.UPLOAD_SHARE_HOLDER_PHOTO:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.UPLOAD_SHARE_HOLDER_PHOTO_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id
							? {
									...value,
									inProgress: false,
									fileDto: { ...value.fileDto, file: payload.base64 },
							  }
							: value,
					): Array<Object>),
				},
			};
		case actions.UPLOAD_SHARE_HOLDER_PHOTO_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_SHARE_HOLDER_PHOTO:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_SHARE_HOLDER_PHOTO_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: false, fileDto: {}, photoUrl: '' } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_SHARE_HOLDER_PHOTO_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: (state.shareHolders.shareHolders.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.SET_SHARE_HOLDER_POSITION:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					shareHolders: payload,
				},
			};
		case actions.ADD_SHARE_HOLDER:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: true,
					error: '',
				},
			};
		case actions.ADD_SHARE_HOLDER_SUCCESS:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					shareHolders: [...state.shareHolders.shareHolders, { ...payload, initial: true }],
				},
			};
		case actions.ADD_SHARE_HOLDER_FAIL:
			return {
				...state,
				shareHolders: {
					...state.shareHolders,
					inProgress: false,
					error: payload,
				},
			};

		case actions.GET_COMPANY_DOCUMENTS:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: true,
				},
			};
		case actions.GET_COMPANY_DOCUMENTS_SUCCESS:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					content: payload,
				},
			};
		case actions.GET_COMPANY_DOCUMENTS_FAIL:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.SUBMIT_COMPANY_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.SUBMIT_COMPANY_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.SUBMIT_COMPANY_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.UPDATE_COMPANY_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.UPDATE_COMPANY_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.UPDATE_COMPANY_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.DELETE_COMPANY_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.DELETE_COMPANY_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.DELETE_COMPANY_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_COMPANY_DOCUMENTS_OVERVIEW:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: true,
				},
			};
		case actions.GET_COMPANY_DOCUMENTS_OVERVIEW_SUCCESS:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					content: payload,
				},
			};
		case actions.GET_COMPANY_DOCUMENTS_OVERVIEW_FAIL:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					errors: payload,
				},
			};
		default:
			return state;
	}
};
