// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLEAR_AUTH } from '../auth/actions';
import { ACCEPT_CAMPAIGN_SUCCESS, REJECT_CAMPAIGN_SUCCESS } from '../admin/actions';
import { states } from '../../constants/campaignStates';
import {
	GENERATE_ENTREPRENEUR_CONTRACT,
	GENERATE_ENTREPRENEUR_CONTRACT_FAIL,
	GENERATE_ENTREPRENEUR_CONTRACT_SUCCESS,
} from '../documents/actions';
import { OPEN_MODAL_CAMPAIGN_DOCUMENT_PREVIEW } from '../modals/actions';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;

	switch (type) {
		case CLEAR_AUTH:
			return initialState();
		case actions.CREATE_CAMPAIGN:
			return {
				...state,
				createCampaign: { ...state.createCampaign, inProgress: true },
			};
		case actions.CREATE_CAMPAIGN_SUCCESS:
			return {
				...state,
				createCampaign: { ...state.createCampaign, inProgress: false },
				info: {
					...payload,
				},
				activeCampaign: {
					exists: true,
				},
			};
		case actions.CREATE_CAMPAIGN_FAIL:
			return {
				...state,
				createCampaign: {
					...state.createCampaign,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.SET_STEP:
			return {
				...state,
				createCampaign: {
					step: payload,
				},
			};
		case actions.CHECK_CAMPAIGN_NAME:
			return {
				...state,
				checkName: {
					...state.checkName,
					inProgress: true,
				},
			};
		case actions.CHECK_CAMPAIGN_NAME_SUCCESS:
			return {
				...state,
				checkName: {
					...state.checkName,
					inProgress: false,
					available: true,
				},
			};
		case actions.CHECK_CAMPAIGN_NAME_FAIL:
			return {
				...state,
				checkName: {
					...state.checkName,
					inProgress: false,
					available: false,
				},
			};
		case actions.GET_CAMPAIGN_INFO:
			return {
				...state,
				info: { ...state.info, inProgress: true, errors: '' },
			};
		case actions.GET_CAMPAIGN_INFO_SUCCESS:
			return {
				...state,
				info: {
					urlFriendlyName: `${payload.urlFriendlyName}`,
					...payload.campaignData,
					inProgress: false,
					errors: '',
				},
			};
		case actions.GET_CAMPAIGN_INFO_FAIL:
			return {
				...state,
				info: { ...state.info, inProgress: false, errors: payload },
			};
		case actions.UPDATE_CAMPAIGN_INFO:
			return {
				...state,
				updateCampaign: {
					...state.updateCampaign,
					inProgress: true,
					errors: '',
				},
			};
		case actions.UPDATE_CAMPAIGN_INFO_SUCCESS:
			return {
				...state,
				updateCampaign: {
					...state.updateCampaign,
					inProgress: false,
					errors: '',
				},
				info: {
					urlFriendlyName: `${payload.urlFriendlyName}`,
					...payload.campaignData,
					inProgress: false,
					errors: '',
				},
			};
		case actions.UPDATE_CAMPAIGN_INFO_FAIL:
			return {
				...state,
				updateCampaign: { ...state.info, inProgress: false, errors: payload },
			};
		case actions.UPLOAD_CAMPAIGN_MARKET_IMAGE:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.UPLOAD_CAMPAIGN_MARKET_IMAGE_SUCCESS:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: false,
					fileDto: {
						file: payload,
					},
				},
			};
		case actions.UPLOAD_CAMPAIGN_MARKET_IMAGE_FAIL:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_CAMPAIGN_MARKET_IMAGE:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.GET_CAMPAIGN_MARKET_IMAGE_SUCCESS:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: false,
					fileDto: payload,
				},
			};
		case actions.GET_CAMPAIGN_MARKET_IMAGE_FAIL:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.DELETE_CAMPAIGN_MARKET_IMAGE:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: true,
					errors: '',
				},
			};
		case actions.DELETE_CAMPAIGN_MARKET_IMAGE_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					marketImageUrl: '',
				},
				marketImage: {
					...state.marketImage,
					inProgress: false,
					fileDto: {
						file: '',
					},
				},
			};
		case actions.DELETE_CAMPAIGN_MARKET_IMAGE_FAIL:
			return {
				...state,
				marketImage: {
					...state.marketImage,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_CURRENT_CAMPAIGN:
			return {
				...state,
				activeCampaign: {
					...state.activeCampaign,
					inProgress: true,
					errors: '',
				},
			};
		case actions.GET_CURRENT_CAMPAIGN_SUCCESS:
			return {
				...state,
				info: {
					urlFriendlyName: `${payload.urlFriendlyName}`,
					...payload.campaignData,
				},
				currentInfo: {
					...payload.campaignData,
					urlFriendlyName: `${payload.urlFriendlyName}`,
				},
				activeCampaign: {
					exists: true,
					inProgress: false,
				},
			};
		case actions.GET_CURRENT_CAMPAIGN_FAIL:
			return {
				...state,
				activeCampaign: { exists: false, inProgress: false, errors: payload },
			};
		case actions.SET_CAMPAIGN_CURRENT_TOPIC:
			return {
				...state,
				current_topic: {
					...state.current_topic,
					[payload.topicType]: {
						content: payload.content,
					},
				},
			};
		case actions.CREATE_CAMPAIGN_TOPIC:
			return {
				...state,
				createCampaignTopic: { ...state.createCampaignTopic, inProgress: true },
			};
		case actions.CREATE_CAMPAIGN_TOPIC_SUCCESS:
			return {
				...state,
				createCampaignTopic: {
					...state.createCampaignTopic,
					inProgress: false,
				},
				[payload.topic.toLowerCase()]: { content: payload.response.content },
				info: {
					...state.info,
					topicStatus: {
						...state.info.topicStatus,
						[payload.topic.toLowerCase()]: true,
					},
				},
			};
		case actions.CREATE_CAMPAIGN_TOPIC_FAIL:
			return {
				...state,
				createCampaignTopic: {
					...state.createCampaignTopic,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_CAMPAIGN_TOPIC:
			return {
				...state,
				getCampaignTopic: { ...state.getCampaignTopic, inProgress: true },
				[payload.topicType.toLowerCase()]: { content: '', inProgress: true },
			};
		case actions.GET_CAMPAIGN_TOPIC_SUCCESS:
			return {
				...state,
				getCampaignTopic: { ...state.getCampaignTopic, inProgress: false },
				[payload.topic.toLowerCase()]: {
					content: payload.response.content,
					inProgress: false,
				},
			};
		case actions.GET_CAMPAIGN_TOPIC_FAIL:
			return {
				...state,
				getCampaignTopic: {
					...state.getCampaignTopic,
					inProgress: false,
					errors: payload,
				},
				[payload.topic.toLowerCase()]: { content: '', inProgress: false },
			};
		case actions.UPDATE_CAMPAIGN_TOPIC:
			return {
				...state,
				updateCampaignTopic: { ...state.updateCampaignTopic, inProgress: true },
			};
		case actions.UPDATE_CAMPAIGN_TOPIC_SUCCESS:
			return {
				...state,
				updateCampaignTopic: {
					...state.updateCampaignTopic,
					inProgress: false,
				},
				[payload.topic.toLowerCase()]: { content: payload.response.content },
			};
		case actions.UPDATE_CAMPAIGN_TOPIC_FAIL:
			return {
				...state,
				updateCampaignTopic: {
					...state.updateCampaignTopic,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.CREATE_FRIENDLY_URL:
			return {
				...state,
				info: {
					...state.info,
					urlFriendlyName: `${payload.url}`,
					name: payload.name,
				},
			};
		case actions.ADD_TEAM_MEMBER:
			return {
				...state,
				team: {
					...state.team,
					inProgress: true,
					error: '',
				},
			};
		case actions.ADD_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					members: [...state.team.members, { ...payload, initial: true }],
				},
			};
		case actions.ADD_TEAM_MEMBER_FAIL:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					error: payload,
				},
			};
		case actions.UPDATE_TEAM_MEMBER:
			return {
				...state,
				team: {
					...state.team,
					inProgress: true,
					error: false,
				},
			};
		case actions.UPDATE_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					members: (state.team.members.map(item =>
						item.id === payload.memberId
							? {
									...payload.data,
									fileDto: item.fileDto,
									initial: false,
							  }
							: item,
					): Array<Object>),
				},
			};
		case actions.UPDATE_TEAM_MEMBER_FAIL:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					error: payload,
				},
			};
		case actions.DELETE_TEAM_MEMBER:
			return {
				...state,
				team: {
					...state.team,
					inProgress: true,
					error: false,
				},
			};
		case actions.DELETE_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					members: (state.team.members.filter(item => item.id !== payload): Array<Object>),
				},
			};
		case actions.DELETE_TEAM_MEMBER_FAIL:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					error: payload,
				},
			};
		case actions.GET_TEAM_MEMBERS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: true,
					error: '',
				},
			};
		case actions.GET_TEAM_MEMBERS_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					members: payload,
				},
			};
		case actions.GET_TEAM_MEMBERS_FAIL:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					error: payload,
				},
			};
		case actions.REORDER_TEAM_MEMBERS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: true,
					error: '',
				},
			};
		case actions.REORDER_TEAM_MEMBERS_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
				},
			};
		case actions.REORDER_TEAM_MEMBERS_FAIL:
			return {
				...state,
				team: {
					...state.team,
					inProgress: false,
					error: payload,
				},
			};
		case actions.SET_MEMBERS_POSITION:
			return {
				...state,
				team: {
					...state.team,
					members: payload,
				},
			};
		case actions.UPLOAD_MEMBER_PHOTO:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.UPLOAD_MEMBER_PHOTO_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
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
		case actions.UPLOAD_MEMBER_PHOTO_FAIL:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.GET_MEMBER_PHOTO:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.GET_MEMBER_PHOTO_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: false, fileDto: payload.data } : value,
					): Array<Object>),
				},
			};
		case actions.GET_MEMBER_PHOTO_FAIL:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_MEMBER_PHOTO:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: true } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_MEMBER_PHOTO_SUCCESS:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: false, fileDto: {}, photoUrl: '' } : value,
					): Array<Object>),
				},
			};
		case actions.DELETE_MEMBER_PHOTO_FAIL:
			return {
				...state,
				team: {
					...state.team,
					members: (state.team.members.map(value =>
						value.id === payload.id ? { ...value, inProgress: false } : value,
					): Array<Object>),
				},
			};
		case actions.UPLOAD_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
				// uploadDocuments: {
				//   ...state.uploadDocuments,
				//   inProgress: true
				// }
			};
		case actions.UPLOAD_DOCUMENT_SUCCESS: {
			const { docName, name } = payload;
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					docName,
					name,
				},
			};
		}
		case actions.UPLOAD_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.SUBMIT_CAMPAIGN_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.SUBMIT_CAMPAIGN_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.SUBMIT_CAMPAIGN_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.DELETE_CAMPAIGN_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.DELETE_CAMPAIGN_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.DELETE_CAMPAIGN_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.REMOVE_UPLOADED_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					docName: '',
				},
			};
		case actions.GET_CAMPAIGN_DOCUMENTS:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: true,
				},
			};
		case actions.GET_CAMPAIGN_DOCUMENTS_SUCCESS:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					content: payload,
				},
			};
		case actions.GET_CAMPAIGN_DOCUMENTS_FAIL:
			return {
				...state,
				documents: {
					...state.documents,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.OPEN_CAMPAIGN_OVERVIEW:
			return {
				...state,
				campaignOverview: {
					isOpen: payload.open,
					hash: payload.hash,
				},
			};
		case actions.SET_CURRENT_INFO:
			return {
				...state,
				currentInfo: payload,
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

		case actions.DELETE_CAMPAIGN:
			return {
				...state,
				deleteCampaign: {
					...state.deleteCampaign,
					inProgress: true,
				},
			};
		case actions.DELETE_CAMPAIGN_SUCCESS:
			return {
				...state,
				deleteCampaign: {
					...state.deleteCampaign,
					inProgress: false,
				},
				info: initialState().info,
			};
		case actions.DELETE_CAMPAIGN_FAIL:
			return {
				...state,
				deleteCampaign: {
					...state.deleteCampaign,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.CAMPAIGN_SUBMIT_FOR_REVIEW:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					inProgress: true,
				},
			};
		case actions.CAMPAIGN_SUBMIT_FOR_REVIEW_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					state: states.REVIEW_READY,
				},
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					inProgress: false,
				},
			};
		case actions.CAMPAIGN_SUBMIT_FOR_REVIEW_FAIL:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					inProgress: false,
					errors: payload,
				},
			};
		case GENERATE_ENTREPRENEUR_CONTRACT:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					contract: {
						...state.campaignSubmitForReview.contract,
						inProgress: true,
						success: null,
					},
				},
			};
		case GENERATE_ENTREPRENEUR_CONTRACT_SUCCESS:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					contract: {
						...state.campaignSubmitForReview.contract,
						...payload,
						inProgress: false,
						success: true,
					},
				},
			};
		case GENERATE_ENTREPRENEUR_CONTRACT_FAIL:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					contract: {
						...initialState().campaignSubmitForReview.contract,
						success: false,
					},
				},
			};
		case OPEN_MODAL_CAMPAIGN_DOCUMENT_PREVIEW:
			return {
				...state,
				campaignSubmitForReview: {
					...state.campaignSubmitForReview,
					contract: initialState().campaignSubmitForReview.contract,
				},
			};
		case actions.GET_ALL_CAMPAIGNS:
			return {
				...state,
				getAllCampaigns: {
					...state.getAllCampaigns,
					errors: '',
					inProgress: true,
				},
			};
		case actions.GET_ALL_CAMPAIGNS_SUCCESS:
			return {
				...state,
				getAllCampaigns: {
					...state.getAllCampaigns,
					inProgress: false,
					errors: '',
					campaigns: payload,
				},
			};
		case actions.GET_ALL_CAMPAIGNS_FAIL:
			return {
				...state,
				getAllCampaigns: {
					...state.getAllCampaigns,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_ACTIVE_CAMPAIGNS:
			return state;
		case actions.GET_COMPLETED_CAMPAIGNS:
			return {
				...state,
				getCompletedCampaigns: {
					...state.getCompletedCampaigns,
					errors: '',
					inProgress: true,
				},
			};
		case actions.GET_COMPLETED_CAMPAIGNS_SUCCESS:
			return {
				...state,
				getCompletedCampaigns: {
					...state.getCompletedCampaigns,
					inProgress: false,
					errors: '',
					campaigns: payload,
				},
			};
		case actions.GET_COMPLETED_CAMPAIGNS_FAIL:
			return {
				...state,
				getCompletedCampaigns: {
					...state.getCompletedCampaigns,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_CAMPAIGN_CARD_COVER:
			return state;
		case actions.GET_CAMPAIGN_CARD_COVER_SUCCESS:
			return {
				...state,
				getAllCampaigns: {
					...state.getAllCampaigns,
					campaigns: {
						...state.getAllCampaigns.campaigns,
						content: state.getAllCampaigns.campaigns.content.map(campaign =>
							campaign.urlFriendlyName === payload.urlFriendlyName
								? {
										...campaign,
										coverImage: payload.file,
								  }
								: campaign,
						),
					},
				},
				getCompletedCampaigns: {
					...state.getCompletedCampaigns,
					campaigns: {
						...state.getCompletedCampaigns.campaigns,
						content: state.getCompletedCampaigns.campaigns.content.map(campaign =>
							campaign.urlFriendlyName === payload.urlFriendlyName
								? {
										...campaign,
										coverImage: payload.file,
								  }
								: campaign,
						),
					},
				},
			};
		case actions.GET_CAMPAIGN_CARD_LOGO:
			return state;
		case actions.GET_CAMPAIGN_CARD_LOGO_SUCCESS:
			return {
				...state,
				getAllCampaigns: {
					...state.getAllCampaigns,
					campaigns: {
						...state.getAllCampaigns.campaigns,
						content: state.getAllCampaigns.campaigns.content.map(campaign =>
							campaign.companyId === payload.companyId ? { ...campaign, logoImage: payload.file } : campaign,
						),
					},
				},
				getCompletedCampaigns: {
					...state.getCompletedCampaigns,
					campaigns: {
						...state.getCompletedCampaigns.campaigns,
						content: state.getCompletedCampaigns.campaigns.content.map(campaign =>
							campaign.companyId === payload.companyId
								? {
										...campaign,
										logoImage: payload.file,
								  }
								: campaign,
						),
					},
				},
			};

		case actions.UPDATE_CAMPAIGN_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.UPDATE_CAMPAIGN_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
				},
			};
		case actions.UPDATE_CAMPAIGN_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_DOCUMENT:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: true,
				},
			};
		case actions.GET_DOCUMENT_SUCCESS:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					currentDocument: payload,
				},
			};
		case actions.GET_DOCUMENT_FAIL:
			return {
				...state,
				documentActions: {
					...state.documentActions,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_ALL_CAMPAIGN_UPDATES_PAGEABLE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: true,
				},
			};
		case actions.GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_SUCCESS:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					updates: payload,
				},
			};
		case actions.GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_FAIL:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.UPDATE_CAMPAIGN_UPDATE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: true,
				},
			};
		case actions.UPDATE_CAMPAIGN_UPDATE_SUCCESS:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpdate: state.campaignUpdates.currentUpdate.title
						? payload
						: initialState().campaignUpdates.currentUpdate,
				},
			};
		case actions.UPDATE_CAMPAIGN_UPDATE_FAIL:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.CREATE_CAMPAIGN_UPDATE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: true,
				},
			};
		case actions.CREATE_CAMPAIGN_UPDATE_SUCCESS:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpdate: payload,
				},
			};
		case actions.CREATE_CAMPAIGN_UPDATE_FAIL:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.DELETE_CAMPAIGN_UPDATE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: true,
				},
			};
		case actions.DELETE_CAMPAIGN_UPDATE_SUCCESS:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpload: null,
				},
			};
		case actions.DELETE_CAMPAIGN_UPDATE_FAIL:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpload: null,
					errors: payload,
				},
			};
		case actions.GET_CAMPAIGN_UPDATE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: true,
				},
			};
		case actions.GET_CAMPAIGN_UPDATE_SUCCESS:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpdate: payload,
				},
			};
		case actions.GET_CAMPAIGN_UPDATE_FAIL:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					inProgress: false,
					currentUpdate: null,
					errors: payload,
				},
			};
		case actions.CLEAR_CURRENT_CAMPAIGN_UPDATE:
			return {
				...state,
				campaignUpdates: {
					...state.campaignUpdates,
					currentUpdate: initialState().campaignUpdates.currentUpdate,
				},
			};
		case ACCEPT_CAMPAIGN_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					state: states.ACTIVE,
				},
			};
		case REJECT_CAMPAIGN_SUCCESS:
			return {
				...state,
				info: {
					...state.info,
					state: states.INITIAL,
				},
			};

		case actions.SUBMIT_REQUEST_FOR_DOCUMENTS:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: true,
				},
			};
		case actions.SUBMIT_REQUEST_FOR_DOCUMENTS_SUCCESS:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: false,
					result: payload.requestState,
				},
			};
		case actions.SUBMIT_REQUEST_FOR_DOCUMENTS_FAIL:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: false,
					errors: payload,
				},
			};
		case actions.GET_DOCUMENTS_REQUEST_STATUS:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: true,
				},
			};
		case actions.GET_DOCUMENTS_REQUEST_STATUS_SUCCESS:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: false,
					result: payload,
				},
			};
		case actions.GET_DOCUMENTS_REQUEST_STATUS_FAIL:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_REQ_DOCUMENT_NOTIFICATION:
			return {
				...state,
				requestForDocuments: {
					...state.requestForDocuments,
					result: payload,
				},
			};
		default:
			return state;
	}
};
