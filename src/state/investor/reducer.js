// @flow

import * as actions from './actions';
import initialState from './initialState';
import { CLEAR_AUTH } from '../auth/actions';
import * as investmentStates from '../../constants/investmentStates';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_AUTH:
			return initialState();
		case actions.CAMPAIGN_DASHBOARD_UPDATES:
			return {
				...state,
				updates: { ...state.updates, inProgress: true, errors: null },
			};
		case actions.CAMPAIGN_DASHBOARD_UPDATES_SUCCESS:
			return {
				...state,
				updates: {
					...state.updates,
					inProgress: false,
					data: payload,
					errors: null,
				},
			};
		case actions.CAMPAIGN_DASHBOARD_UPDATES_FAIL:
			return {
				...state,
				updates: { ...state.updates, inProgress: false, errors: payload },
			};
		case actions.GET_INVESTOR_PORTFOLIO:
			return {
				...state,
				portfolio: { ...state.portfolio, inProgress: true },
			};
		case actions.GET_INVESTOR_PORTFOLIO_SUCCESS:
			return {
				...state,
				portfolio: { ...payload, inProgress: false },
			};
		case actions.GET_INVESTOR_PORTFOLIO_FAIL:
			return {
				...state,
				portfolio: { ...state.portfolio, inProgress: false },
			};
		case actions.REVOKE_INVESTMENT_SUCCESS:
			return {
				...state,
				portfolio: {
					...state.portfolio,
					content: state.portfolio.content.map(item =>
						item.campaign.urlFriendlyName === payload.urlFriendlyName
							? {
									...item,
									investments: item.investments.map(inv =>
										inv.id === payload.investment.id ? { ...inv, investmentState: investmentStates.REVOKED } : inv,
									),
									total:
										payload.investment.investmentState === investmentStates.PAID
											? {
													amount: item.total.amount - payload.investment.investedAmount,
													equity: item.total.equity - payload.investment.equity,
											  }
											: item.total,
							  }
							: item,
					),
				},
			};
		case actions.GET_PORTFOLIO_CAMPAIGN_IMAGE_SUCCESS:
			return {
				...state,
				portfolio: {
					...state.portfolio,
					content: state.portfolio.content.map(item =>
						item.campaign.companyId === payload.companyId
							? {
									...item,
									campaign: {
										...item.campaign,
										logoImage: payload.file,
									},
							  }
							: item,
					),
				},
			};
		default:
			return state;
	}
};
