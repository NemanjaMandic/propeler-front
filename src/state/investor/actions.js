import { createAction } from 'redux-actions';

export const CONVERT_EQUITY = '[Campaign] Convert equity';
export const convertEquity = createAction(CONVERT_EQUITY);

export const CONVERT_EQUITY_SUCCESS = `${CONVERT_EQUITY} success`;
export const convertEquitySuccess = createAction(CONVERT_EQUITY_SUCCESS);

export const CONVERT_EQUITY_FAIL = `${CONVERT_EQUITY} fail`;
export const convertEquityFail = createAction(CONVERT_EQUITY_FAIL);

export const GET_INVESTOR_PORTFOLIO = "[Company] Get investor's portfolio";
export const getInvestorPortfolio = createAction(GET_INVESTOR_PORTFOLIO);

export const GET_INVESTOR_PORTFOLIO_SUCCESS = `${GET_INVESTOR_PORTFOLIO} success`;
export const getInvestorPortfolioSuccess = createAction(GET_INVESTOR_PORTFOLIO_SUCCESS);

export const GET_INVESTOR_PORTFOLIO_FAIL = `${GET_INVESTOR_PORTFOLIO} fail`;
export const getInvestorPortfolioFail = createAction(GET_INVESTOR_PORTFOLIO_FAIL);

export const AVAILABLE_INVESTMENT = '[Campaign] Available Investment';
export const getAvailableInvestment = createAction(AVAILABLE_INVESTMENT);

export const AVAILABLE_INVESTMENT_SUCCESS = `${AVAILABLE_INVESTMENT} success`;
export const getAvailableInvestmentSuccess = createAction(AVAILABLE_INVESTMENT_SUCCESS);

export const AVAILABLE_INVESTMENT_FAIL = `${AVAILABLE_INVESTMENT} fail`;
export const getAvailableInvestmentFail = createAction(AVAILABLE_INVESTMENT_FAIL);

export const INVEST_IN_CAMPAIGN = '[Campaign] Invest in campaign';
export const investInCampaign = createAction(INVEST_IN_CAMPAIGN);

export const INVEST_IN_CAMPAIGN_SUCCESS = `${INVEST_IN_CAMPAIGN} success`;
export const investInCampaignSuccess = createAction(INVEST_IN_CAMPAIGN_SUCCESS);

export const INVEST_IN_CAMPAIGN_FAIL = `${INVEST_IN_CAMPAIGN} fail`;
export const investInCampaignFail = createAction(INVEST_IN_CAMPAIGN_FAIL);

export const CAMPAIGN_DASHBOARD_UPDATES = '[Campaign] Dashboard Updates';
export const campaignDashboardUpdates = createAction(CAMPAIGN_DASHBOARD_UPDATES);

export const CAMPAIGN_DASHBOARD_UPDATES_SUCCESS = `${CAMPAIGN_DASHBOARD_UPDATES} success`;
export const campaignDashboardUpdatesSuccess = createAction(CAMPAIGN_DASHBOARD_UPDATES_SUCCESS);

export const CAMPAIGN_DASHBOARD_UPDATES_FAIL = `${CAMPAIGN_DASHBOARD_UPDATES} fail`;
export const campaignDashboardUpdatesFail = createAction(CAMPAIGN_DASHBOARD_UPDATES_FAIL);
export const REVOKE_INVESTMENT = '[Campaign] Revoke investment';
export const revokeInvestment = createAction(REVOKE_INVESTMENT);

export const REVOKE_INVESTMENT_SUCCESS = `${REVOKE_INVESTMENT} success`;
export const revokeInvestmentSuccess = createAction(REVOKE_INVESTMENT_SUCCESS);

export const REVOKE_INVESTMENT_FAIL = `${REVOKE_INVESTMENT} fail`;
export const revokeInvestmentFail = createAction(REVOKE_INVESTMENT_FAIL);

export const GET_PORTFOLIO_CAMPAIGN_IMAGE = '[Campaign] Get portfolio campaign image';
export const getPortfolioCampaignImage = createAction(GET_PORTFOLIO_CAMPAIGN_IMAGE);

export const GET_PORTFOLIO_CAMPAIGN_IMAGE_SUCCESS = `${GET_PORTFOLIO_CAMPAIGN_IMAGE} success`;
export const getPortfolioCampaignImageSuccess = createAction(GET_PORTFOLIO_CAMPAIGN_IMAGE_SUCCESS);

export const GET_PORTFOLIO_CAMPAIGN_IMAGE_FAIL = `${GET_PORTFOLIO_CAMPAIGN_IMAGE} fail`;
export const getPortfolioCampaignImageFail = createAction(GET_PORTFOLIO_CAMPAIGN_IMAGE_FAIL);
