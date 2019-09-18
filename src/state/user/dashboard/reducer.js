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
		case actions.GET_USER_CAMPAIGNS:
			return {
				...state,
				userCampaigns: {
					...state.userCampaigns,
					inProgress: true,
				},
			};
		case actions.GET_USER_CAMPAIGNS_SUCCESS:
			return {
				...state,
				userCampaigns: {
					campaigns: payload,
					inProgress: false,
				},
			};
		case actions.GET_USER_CAMPAIGNS_FAIL:
			return {
				...state,
				userCampaigns: {
					...state.userCampaigns,
					inProgress: false,
				},
			};
		case actions.GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE:
			return {
				...state,
				campaignDocuments: {
					...state.campaignDocuments,
					inProgress: true,
				},
			};
		case actions.GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_SUCCESS:
			return {
				...state,
				campaignDocuments: {
					...state.campaignDocuments,
					inProgress: false,
					...payload,
				},
			};
		case actions.GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_FAIL:
			return {
				...state,
				campaignDocuments: {
					...state.campaignDocuments,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_CAMPAIGNS_WITH_INVESTMENTS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: true,
				},
			};
		case actions.GET_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: false,
					...payload,
				},
			};
		case actions.GET_CAMPAIGNS_WITH_INVESTMENTS_FAIL:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: true,
				},
			};

		case actions.GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: false,
					data: payload,
				},
			};

		case actions.GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_FAIL:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.APPROVE_INVESTMENT_AS_OWNER_SUCCESS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					content: state.campaignsWithInvestments.content.map(item => {
						if (item.campaign.id === payload.campaignId) {
							const investments = item.investments.map(inv => {
								if (inv.id === payload.investmentId) return { ...inv, investmentState: 'OWNER_APPROVED' };
								return inv;
							});
							return { ...item, investments };
						}
						return item;
					}),
					inProgress: true,
				},
			};
		case actions.REJECT_INVESTMENT_AS_OWNER_SUCCESS:
			return {
				...state,
				campaignsWithInvestments: {
					...state.campaignsWithInvestments,
					content: state.campaignsWithInvestments.content.map(item => {
						if (item.campaign.id === payload.campaignId) {
							const investments = item.investments.map(inv => {
								if (inv.id === payload.investmentId) return { ...inv, investmentState: 'OWNER_REJECTED' };
								return inv;
							});
							return { ...item, investments };
						}
						return item;
					}),
					inProgress: true,
				},
			};
		case actions.GET_DOCUMENT_REQUESTS:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: true,
				},
			};
		case actions.GET_DOCUMENT_REQUESTS_SUCCESS:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					result: payload,
				},
			};
		case actions.GET_DOCUMENT_REQUESTS_FAIL:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.ACCEPT_DOCUMENT_REQUEST:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: true,
				},
			};
		case actions.ACCEPT_DOCUMENT_REQUEST_SUCCESS:
			console.log(payload);
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					result: {
						...state.documentRequest.result,
						requests: state.documentRequest.result.requests.map(req => {
							if (req.requestId === payload.requestId) {
								return {
									...req,
									requestState: payload.requestState,
								};
							}
							return req;
						}),
					},
				},
			};
		case actions.ACCEPT_DOCUMENT_REQUEST_FAIL:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.REJECT_DOCUMENT_REQUEST:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: true,
				},
			};
		case actions.REJECT_DOCUMENT_REQUEST_SUCCESS:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					result: {
						...state.documentRequest.result,
						requests: state.documentRequest.result.requests.map(req => {
							if (req.requestId === payload.requestId) {
								return {
									...req,
									requestState: payload.requestState,
								};
							}
							return req;
						}),
					},
				},
			};
		case actions.REJECT_DOCUMENT_REQUEST_FAIL:
			return {
				...state,
				documentRequest: {
					...state.documentRequest,
					inProgress: false,
					errors: payload,
				},
			};
		default:
			return state;
	}
};
