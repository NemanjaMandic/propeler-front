// @flow

import { createAction } from 'redux-actions';

export const REDIRECT_TO_LOGIN = '[AUTH] Redirect to login';
export const redirectToLogin = createAction(REDIRECT_TO_LOGIN);

export const LOGOUT_USER = '[AUTH] Logout user';
export const logoutUser = createAction(LOGOUT_USER);

export const CLEAR_AUTH = '[AUTH] Clear authentication';
export const clearAuth = createAction(CLEAR_AUTH);

export const LOGOUT_USER_FAIL = `${LOGOUT_USER} fail`;
export const logoutUserFail = createAction(LOGOUT_USER_FAIL);

export const LOGIN_USER = '[AUTH] Login user';
export const loginUser = createAction(LOGIN_USER);

export const LOGIN_USER_SUCCESS = `${LOGIN_USER} success`;
export const loginUserSuccess = createAction(LOGIN_USER_SUCCESS);

export const LOGIN_USER_FAIL = `${LOGIN_USER} fail`;
export const loginUserFail = createAction(LOGIN_USER_FAIL);

export const FORGOT_USERNAME = '[AUTH] Forgot Username';
export const forgotUsername = createAction(FORGOT_USERNAME);

export const FORGOT_USERNAME_SUCCESS = `${FORGOT_USERNAME} success`;
export const forgotUsernameSuccess = createAction(FORGOT_USERNAME_SUCCESS);

export const FORGOT_USERNAME_FAIL = `${FORGOT_USERNAME} fail`;
export const forgotUsernameFail = createAction(FORGOT_USERNAME_FAIL);

export const FORGOT_PASSWORD = '[AUTH] Forgot password';
export const forgotPassword = createAction(FORGOT_PASSWORD);

export const FORGOT_PASSWORD_SUCCESS = `${FORGOT_PASSWORD} success`;
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);

export const FORGOT_PASSWORD_FAIL = `${FORGOT_PASSWORD} fail`;
export const forgotPasswordFail = createAction(FORGOT_PASSWORD_FAIL);

export const CHANGE_PASSWORD = '[AUTH] Change password';
export const changePassword = createAction(CHANGE_PASSWORD);

export const CHANGE_PASSWORD_SUCCESS = `${CHANGE_PASSWORD} success`;
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);

export const CHANGE_PASSWORD_FAIL = `${CHANGE_PASSWORD} fail`;
export const changePasswordFail = createAction(CHANGE_PASSWORD_FAIL);

export const REGISTER_USER = '[AUTH] Register user';
export const registerUser = createAction(REGISTER_USER);

export const REGISTER_USER_SUCCESS = `${REGISTER_USER} success`;
export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS);

export const REGISTER_USER_FAIL = `${REGISTER_USER} fail`;
export const registerUserFail = createAction(REGISTER_USER_FAIL);

// register entrepreneur:
export const REGISTER_ENTREPRENEUR = '[AUTH] Register entrepreneur';
export const registerEntrepreneur = createAction(REGISTER_ENTREPRENEUR);

export const REGISTER_ENTREPRENEUR_SUCCESS = `${REGISTER_ENTREPRENEUR} success`;
export const registerEntrepreneurSuccess = createAction(REGISTER_ENTREPRENEUR_SUCCESS);

export const REGISTER_ENTREPRENEUR_FAIL = `${REGISTER_ENTREPRENEUR} fail`;
export const registerEntrepreneurFail = createAction(REGISTER_ENTREPRENEUR_FAIL);

// register company investor
export const REGISTER_COMPANY_INVESTOR = '[AUTH] Register Company Investor';
export const registerCompanyInvestor = createAction(REGISTER_COMPANY_INVESTOR);

export const REGISTER_COMPANY_INVESTOR_SUCCESS = `${REGISTER_COMPANY_INVESTOR} success`;
export const registerCompanyInvestorSuccess = createAction(REGISTER_COMPANY_INVESTOR_SUCCESS);

export const REGISTER_COMPANY_INVESTOR_FAIL = `${REGISTER_COMPANY_INVESTOR} fail`;
export const registerCompanyInvestorFail = createAction(REGISTER_COMPANY_INVESTOR_FAIL);

// register individual investor
export const REGISTER_INDIVIDUAL_INVESTOR = '[AUTH] Register Individual Investor';
export const registerIndividualInvestor = createAction(REGISTER_INDIVIDUAL_INVESTOR);

export const REGISTER_INDIVIDUAL_INVESTOR_SUCCESS = `${REGISTER_INDIVIDUAL_INVESTOR} success`;
export const registerIndividualInvestorSuccess = createAction(REGISTER_INDIVIDUAL_INVESTOR_SUCCESS);

export const REGISTER_INDIVIDUAL_INVESTOR_FAIL = `${REGISTER_INDIVIDUAL_INVESTOR} fail`;
export const registerIndividualInvestorFail = createAction(REGISTER_INDIVIDUAL_INVESTOR_FAIL);

// check registration token:
export const CHECK_REGISTRATION_TOKEN = '[AUTH] Check registration token';
export const checkRegistrationToken = createAction(CHECK_REGISTRATION_TOKEN);

export const CHECK_REGISTRATION_TOKEN_SUCCESS = `${CHECK_REGISTRATION_TOKEN} success`;
export const checkRegistrationTokenSuccess = createAction(CHECK_REGISTRATION_TOKEN_SUCCESS);

export const CHECK_REGISTRATION_TOKEN_FAIL = `${CHECK_REGISTRATION_TOKEN} fail`;
export const checkRegistrationTokenFail = createAction(CHECK_REGISTRATION_TOKEN_FAIL);

export const CHECK_USERNAME = '[AUTH] Check username';
export const checkUsername = createAction(CHECK_USERNAME);

export const CHECK_USERNAME_SUCCESS = `${CHECK_USERNAME} success`;
export const checkUsernameSuccess = createAction(CHECK_USERNAME_SUCCESS);

export const CHECK_USERNAME_FAIL = `${CHECK_USERNAME} fail`;
export const checkUsernameFail = createAction(CHECK_USERNAME_FAIL);

export const CONFIRM_REGISTRATION = '[AUTH] Confirm management';
export const confirmRegistration = createAction(CONFIRM_REGISTRATION);

export const CONFIRM_REGISTRATION_SUCCESS = `${CONFIRM_REGISTRATION} success`;
export const confirmRegistrationSuccess = createAction(CONFIRM_REGISTRATION_SUCCESS);

export const CONFIRM_REGISTRATION_FAIL = `${CONFIRM_REGISTRATION} fail`;
export const confirmRegistrationFail = createAction(CONFIRM_REGISTRATION_FAIL);

export const SUBMIT_FUNDRAISING_PROPOSAL = '[AUTH] Submit fundraising proposal';
export const submitFundraisingProposal = createAction(SUBMIT_FUNDRAISING_PROPOSAL);

export const SUBMIT_FUNDRAISING_PROPOSAL_SUCCESS = `${SUBMIT_FUNDRAISING_PROPOSAL} success`;
export const submitFundraisingProposalSuccess = createAction(SUBMIT_FUNDRAISING_PROPOSAL_SUCCESS);

export const SUBMIT_FUNDRAISING_PROPOSAL_FAIL = `${SUBMIT_FUNDRAISING_PROPOSAL} field`;
export const submitFundraisingProposalFail = createAction(SUBMIT_FUNDRAISING_PROPOSAL_FAIL);

export const SUBMIT_FUNDRAISING_PROPOSAL_DOC = '[AUTH] Submit fundraising proposal doc';
export const submitFundraisingProposalDoc = createAction(SUBMIT_FUNDRAISING_PROPOSAL_DOC);

export const SUBMIT_FUNDRAISING_PROPOSAL_DOC_SUCCESS = `${SUBMIT_FUNDRAISING_PROPOSAL_DOC} success`;
export const submitFundraisingProposalDocSuccess = createAction(SUBMIT_FUNDRAISING_PROPOSAL_DOC_SUCCESS);

export const SUBMIT_FUNDRAISING_PROPOSAL_DOC_FAIL = `${SUBMIT_FUNDRAISING_PROPOSAL_DOC} fail`;
export const submitFundraisingProposalDocFail = createAction(SUBMIT_FUNDRAISING_PROPOSAL_DOC_FAIL);

export const UPLOAD_FUNDRAISING_PROPOSAL_DOC = '[AUTH] Upload fundraising proposal doc';
export const uploadFundraisingProposalDoc = createAction(UPLOAD_FUNDRAISING_PROPOSAL_DOC);

export const UPLOAD_FUNDRAISING_PROPOSAL_DOC_SUCCESS = `${UPLOAD_FUNDRAISING_PROPOSAL_DOC} success`;
export const uploadFundraisingProposalDocSuccess = createAction(UPLOAD_FUNDRAISING_PROPOSAL_DOC_SUCCESS);

export const UPLOAD_FUNDRAISING_PROPOSAL_DOC_FAIL = `${UPLOAD_FUNDRAISING_PROPOSAL_DOC} fail`;
export const uploadFundraisingProposalDocFail = createAction(UPLOAD_FUNDRAISING_PROPOSAL_DOC_FAIL);

export const REMOVE_UPLOADED_DOC = '[AUTH] Remove uploaded document';
export const removeUploadedDoc = createAction(REMOVE_UPLOADED_DOC);

export const GET_PLATFORM_SETTINGS = '[AUTH] Get platform settings';
export const getPlatformSettings = createAction(GET_PLATFORM_SETTINGS);

export const GET_PLATFORM_SETTINGS_SUCCESS = `${GET_PLATFORM_SETTINGS} success`;
export const getPlatformSettingsSuccess = createAction(GET_PLATFORM_SETTINGS_SUCCESS);

export const GET_PLATFORM_SETTINGS_FAIL = `${GET_PLATFORM_SETTINGS} fail`;
export const getPlatformSettingsFail = createAction(GET_PLATFORM_SETTINGS_FAIL);
