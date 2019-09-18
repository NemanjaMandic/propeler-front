// @flow

import { all, takeLatest, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import * as actions from './actions';
import {
	getInvestorPortfolioAPI,
	availableInvestmentAPI,
	convertEquityAPI,
	convertMoneyAPI,
	investInCampaignAPI,
	getCampaignsUpdates,
	revokeInvestmentAPI,
	getCompanyLogoAPI,
} from '../../services/api';

import { errorNotification, I18Map } from '../../utilities/errorHelpers';

export function* convertEquity$({ payload }: any): Generator<*, *, *> {
	const { field, data, urlFriendlyName } = payload;
	try {
		let response = {};
		if (field === 'amount') {
			response = yield convertEquityAPI(urlFriendlyName, {
				percentageOfEquity: data,
			});
		} else {
			response = yield convertMoneyAPI(urlFriendlyName, { money: data });
		}
		yield put(actions.convertEquitySuccess({ field, data: response.data }));
	} catch (error) {
		yield put(
			actions.convertEquityFail({
				error: errorNotification(error, true),
				field,
			}),
		);
	}
}

export function* getAvailableInvestment$({ payload }: any): Generator<*, *, *> {
	const { urlFriendlyName } = payload;
	try {
		const response = yield availableInvestmentAPI(urlFriendlyName);
		yield put(actions.getAvailableInvestmentSuccess(response.data));
	} catch (error) {
		yield put(actions.getAvailableInvestmentFail(errorNotification(error, false)));
	}
}

export function* investInCampaign$({ payload }: any): Generator<*, *, *> {
	const { data, urlFriendlyName } = payload;
	try {
		const response = yield investInCampaignAPI(urlFriendlyName, data);
		yield put(actions.investInCampaignSuccess(response.data));
		yield put(actions.getInvestorPortfolio({ size: 5 }));
		NotificationManager.success(I18Map.errors.INVESTMENT_REQUEST_SENT, '', 8000);
	} catch (error) {
		yield put(actions.investInCampaignFail(errorNotification(error, true)));
	}
}

export function* campaignDashboardUpdates$({ payload }: any): Generator<*, *, *> {
	const { filter } = payload;
	try {
		const response = yield getCampaignsUpdates(filter.key);
		yield put(actions.campaignDashboardUpdatesSuccess(response.data));
	} catch (error) {
		yield put(actions.campaignDashboardUpdatesFail(errorNotification(error, true)));
	}
}
export function* getInvestorPortfolio$({ payload }): Generator<*, *, *> {
	try {
		const { pageNumber, ...rest } = payload;
		const { data } = yield getInvestorPortfolioAPI({
			...rest,
			page: pageNumber,
		});

		yield put(actions.getInvestorPortfolioSuccess(data));
		const haveLogo = data.content.filter(item => item.campaign.companyLogoUrl);
		yield all(haveLogo.map(ci => put(actions.getPortfolioCampaignImage(ci.campaign.companyId))));
	} catch (error) {
		yield put(actions.getInvestorPortfolioFail(errorNotification(error, true)));
	}
}

export function* getPortfolioCampaignImage$({ payload }): Generator<*, *, *> {
	try {
		const response = yield getCompanyLogoAPI(payload);
		yield put(
			actions.getPortfolioCampaignImageSuccess({
				...response.data,
				companyId: payload,
			}),
		);
	} catch (error) {
		yield put(actions.getPortfolioCampaignImageFail(errorNotification(error, false)));
	}
}

export function* revokeInvestment$({ payload }): Generator<*, *, *> {
	try {
		yield revokeInvestmentAPI(payload.investment.id);
		yield put(actions.revokeInvestmentSuccess(payload));
		// yield put(actions.getInvestorPortfolio(payload))
	} catch (error) {
		yield put(actions.revokeInvestmentFail(errorNotification(error, true)));
	}
}

export default function*(): Generator<*, *, *> {
	yield all([
		takeLatest(actions.convertEquity, convertEquity$),
		takeLatest(actions.getAvailableInvestment, getAvailableInvestment$),
		takeLatest(actions.investInCampaign, investInCampaign$),
		takeLatest(actions.campaignDashboardUpdates, campaignDashboardUpdates$),
		takeLatest(actions.getInvestorPortfolio, getInvestorPortfolio$),
		takeLatest(actions.revokeInvestment, revokeInvestment$),
		takeLatest(actions.getPortfolioCampaignImage, getPortfolioCampaignImage$),
	]);
}
