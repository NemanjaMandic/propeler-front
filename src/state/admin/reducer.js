// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLOSE_KYC_INTERNAL_REVIEW } from '../modals/actions';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case actions.AUDIT_CAMPAIGN:
		case actions.ACCEPT_CAMPAIGN:
		case actions.REJECT_CAMPAIGN:
			return {
				...state,
				auditActions: {
					...state.auditActions,
					inProgress: true,
				},
			};
		case actions.AUDIT_CAMPAIGN_SUCCESS:
		case actions.ACCEPT_CAMPAIGN_SUCCESS:
		case actions.REJECT_CAMPAIGN_SUCCESS:
			return {
				...state,
				auditActions: {
					...state.auditActions,
					inProgress: false,
				},
			};
		case actions.AUDIT_CAMPAIGN_FAIL:
		case actions.ACCEPT_CAMPAIGN_FAIL:
		case actions.REJECT_CAMPAIGN_FAIL:
			return {
				...state,
				auditActions: {
					...state.auditActions,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.AUDIT_KYC:
			return {
				...state,
				auditKYC: {
					...state.auditKYC,
				},
				inProgress: true,
			};

		case actions.AUDIT_KYC_SUCCESS: {
			const data = state.KYCRequest.data.content.map(item => {
				if (item.id === payload.id)
					return {
						...item,
						requestState: payload.requestState,
						auditorId: payload.auditorId,
					};
				return item;
			});

			return {
				...state,
				auditKYC: {
					...state.auditKYC,
				},
				KYCRequest: {
					...state.KYCRequest,
					data: {
						...state.KYCRequest.data,
						content: data,
					},
					inProgress: false,
				},
				inProgress: false,
			};
		}

		case actions.AUDIT_KYC_FAIL:
			return {
				...state,
				auditKYC: {
					...state.auditKYC,
				},
				inProgress: false,
				errors: payload,
			};

		case actions.GET_CAMPAIGNS_BY_STATE:
			return {
				...state,
				campaignActions: {
					...state.campaignActions,
					inProgress: true,
				},
			};

		case actions.GET_CAMPAIGNS_BY_STATE_SUCCESS:
			return {
				...state,
				campaignActions: {
					...state.campaignActions,
					data: payload,
					inProgress: false,
				},
			};

		case actions.GET_CAMPAIGNS_BY_STATE_FAIL:
			return {
				...state,
				campaignActions: {
					...state.campaignActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS:
			return {
				...state,
				fundrisingApplications: {
					...state.fundrisingApplications,
					inProgress: true,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS_SUCCESS:
			return {
				...state,
				fundrisingApplications: {
					...state.fundrisingApplications,
					inProgress: false,
					data: payload,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS_FAIL:
			return {
				...state,
				fundrisingApplications: {
					...state.fundrisingApplications,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS_DOCUMENTS:
			return {
				...state,
				fundrisingApplicationsDocuments: {
					...state.fundrisingApplicationsDocuments,
					inProgress: true,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS_DOCUMENTS_SUCCESS:
			return {
				...state,
				fundrisingApplicationsDocuments: {
					...state.fundrisingApplicationsDocuments,
					inProgress: false,
					data: payload,
				},
			};
		case actions.GET_FUNDRISING_APPLICATIONS_DOCUMENTS_FAIL:
			return {
				...state,
				fundrisingApplicationsDocuments: {
					...state.fundrisingApplicationsDocuments,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_USER_KYC:
			return {
				...state,
				userKYC: {
					...state.userKYC,
					inProgress: true,
				},
			};

		case actions.GET_USER_KYC_SUCCESS:
			return {
				...state,
				userKYC: {
					...state.userKYC,
					inProgress: false,
					data: payload,
				},
			};

		case actions.GET_USER_KYC_FAIL:
			return {
				...state,
				userKYC: {
					...state.userKYC,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.LAUNCH_CAMPAIGN:
			return {
				...state,
				launchCampaign: {
					...state.launchCampaign,
					inProgress: true,
				},
			};
		case actions.LAUNCH_CAMPAIGN_SUCCESS:
			return {
				...state,
				launchCampaign: {
					...state.launchCampaign,
					inProgress: false,
				},
			};
		case actions.LAUNCH_CAMPAIGN_FAIL:
			return {
				...state,
				launchCampaign: {
					...state.launchCampaign,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_KYC_REQUESTS:
			return {
				...state,
				KYCRequest: {
					...state.KYCRequest,
					inProgress: true,
				},
			};
		case actions.GET_KYC_REQUESTS_SUCCESS:
			return {
				...state,
				KYCRequest: {
					...state.KYCRequest,
					data: payload,
					inProgress: false,
				},
			};
		case actions.GET_KYC_REQUESTS_FAIL:
			return {
				...state,
				KYCRequest: {
					...state.KYCRequest,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_KYC_DOC:
			return {
				...state,
				userKYC: {
					...state.userKYC,
					inProgress: true,
				},
			};
		case actions.GET_KYC_DOC_SUCCESS: {
			// const files =  state.userKYC.files;
			const { files } = state.userKYC;
			files.push(payload.data);
			return {
				...state,
				userKYC: {
					...state.userKYC,
					files,
				},
			};
		}
		case actions.GET_KYC_DOC_FAIL:
			return {
				...state,
				userKYC: {
					...state.userKYC,
					errors: payload,
				},
			};
		case CLOSE_KYC_INTERNAL_REVIEW:
			return {
				...state,
				userKYC: initialState().userKYC,
			};
		case actions.GET_CAMPAIGN_IMG_SUCCESS:
			return {
				...state,
				campaignActions: {
					...state.campaignActions,
					data: {
						...state.campaignActions.data,
						content: state.campaignActions.data.content.map(campaign =>
							campaign.companyId === payload.companyId ? { ...campaign, logoImage: payload.file } : campaign,
						),
					},
				},
			};
		case actions.DOWNLOAD_FUNDRAISING_APP_DOCUMENT:
			return {
				...state,
				fundrisingAppDocumentDownload: {
					...state.fundrisingAppDocumentDownload,
					fileDto: {
						type: '',
						file: '',
					},
					inProgress: true,
				},
			};
		case actions.DOWNLOAD_FUNDRAISING_APP_DOCUMENT_SUCCESS:
			return {
				...state,
				fundrisingAppDocumentDownload: {
					...state.fundrisingAppDocumentDownload,
					fileDto: payload,
					inProgress: false,
				},
			};
		case actions.DOWNLOAD_FUNDRAISING_APP_DOCUMENT_FAIL:
			return {
				...state,
				fundrisingAppDocumentDownload: {
					...state.fundrisingAppDocumentDownload,
					inProgress: false,
				},
			};
		default:
			return state;
	}
};
