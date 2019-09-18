// @flow

export const BASE = ``;
export const LANDING_PAGE = `${BASE}/home`;
export const AUTH = `${BASE}/auth`;
export const LOGIN = `${AUTH}/login`;
export const REGISTER = `${AUTH}/register`;
export const REGISTER_INVESTOR = `${REGISTER}/investor`;
export const REGISTER_INVESTOR_TYPE = `${REGISTER_INVESTOR}/:type`;
export const REGISTER_ENTREPRENEUR = `${REGISTER}/:token`;
export const FORGOT_PASSWORD = `${AUTH}/forgot-password`;
export const FORGOT_USERNAME = `${AUTH}/forgot-username`;
export const CHANGE_PASSWORD = `${AUTH}/change-password`;
export const CONFIRM_REGISTRATION = `${AUTH}/confirm-registration`;
export const CONFIRM_EMAIL_CHANGE = `${AUTH}/change-email`;
export const TWO_FACTOR_AUTHENTICATION = `${AUTH}/two-factor-authentication`;

export const USER = `${BASE}/user`;
export const USER_PROFILE = `${USER}/profile`;
export const CHANGE_PASSWORD_PROFILE = `${USER_PROFILE}/change-password`;
export const CHANGE_EMAIL_PROFILE = `${USER_PROFILE}/change-email`;
export const USER_DOCUMENTS = `${USER_PROFILE}/documents`;
export const PERSONALIZATION = `${USER_PROFILE}/personalization`;
export const USER_NOTIFICATIONS = `${USER_PROFILE}/notifications`;
export const USER_DIGITAL_SIGNATURE = `${USER_PROFILE}/signature`;
export const CHANGE_LANGUAGE = `${PERSONALIZATION}/change-language`;
// export const PERSONALIZE_NOTIFICATIONS = `${PERSONALIZATION}/notifications`;
export const USER_VERIFICATIONS = `${USER_PROFILE}/verifications`;
// export const USER_PERSONAL_VERIFICATIONS = `${USER_VERIFICATIONS}/personal`;
// export const USER_COMPANY_VERIFICATIONS = `${USER_VERIFICATIONS}/company`;

export const LINK_EXPIRED = '/expired';

export const SUCCESS_SCREEN = '/success-screen';
export const FAILURE_SCREEN = '/failure-screen';

export const FAQ = '/faq';
export const START_INVESTING = '/start-investing';
export const RAISE_FUNDS = '/raise-funds';
export const ABOUT = '/about';
export const PRIVACY = '/privacy';
export const TERMS = '/terms';
export const SECURITY = '/security';

export const USER_DASHBOARD = `${USER}/dashboard`;
export const DASHBOARD_DOCUMENTS = `${USER_DASHBOARD}/documents`;
export const MY_COMPANY = `${USER_DASHBOARD}/my-company`;

export const BASIC_INFO = `${MY_COMPANY}/basic-info`;
export const EXTERNAL_LINKS = `${MY_COMPANY}/external-links`;

export const COMPANY = `${BASE}/company`;

export const CAMPAIGN = `${BASE}/campaign`;

export const INBOX = `${BASE}/inbox`;

// Overview
export const OVERVIEW = `${BASE}/overview/:name`;
export const OVERVIEW_DOCUMENTS = `${OVERVIEW}/documents`;
export const OVERVIEW_INVESTORS = `${OVERVIEW}/investors`;
export const OVERVIEW_UPDATES = `${OVERVIEW}/updates`;
export const OVERVIEW_UPDATES_SINGLE = `${OVERVIEW_UPDATES}/:id`;

// Investor
export const INVESTOR = `${BASE}/investor`;
export const INDICATE_INTEREST = `${INVESTOR}/indicate-interest`;
export const INVESTMENT_OPPORTUNITIES = `${INVESTOR}/investment-opportunities`;
export const INVESTOR_DASHBOARD = `${INVESTOR}/dashboard`;
export const INVESTOR_FUNDS = `${INVESTOR_DASHBOARD}/funds`;
export const INVESTOR_BALANCE = `${INVESTOR_DASHBOARD}/balance`;
export const INVESTOR_PAYMENTS = `${INVESTOR_DASHBOARD}/payments`;
export const INVESTOR_UPDATES = `${INVESTOR_DASHBOARD}/updates`;
export const INVESTOR_RAISE = `${INVESTOR_DASHBOARD}/raise`;
export const INVESTOR_PAYMENT = `${INVESTOR}/payment/:id`;
export const INVESTOR_DOCUMENTS = `${INVESTOR_DASHBOARD}/documents`;

// Admin
export const ADMIN = `${BASE}/admin`;
export const ADMIN_DASHBOARD = `${ADMIN}/dashboard`;
export const ADMIN_USERS = `${ADMIN_DASHBOARD}/users`;
export const ADMIN_KYC = `${ADMIN_DASHBOARD}/kyc`;
export const ADMIN_CAMPAIGNS = `${ADMIN_DASHBOARD}/campaigns`;
export const ADMIN_PAYMENTS = `${ADMIN_DASHBOARD}/payments`;
export const ADMIN_DOCUMENTS = `${ADMIN_DASHBOARD}/documents`;

// Any user:
export const CAMPAIGNS_VIEW = `${BASE}/campaigns`;
