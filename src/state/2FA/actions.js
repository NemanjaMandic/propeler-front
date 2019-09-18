// @flow

import { createAction } from 'redux-actions';

export const OPEN_2FA_DIALOG = '[2FA] Open 2FA dialog';
export const open2FADialog = createAction(OPEN_2FA_DIALOG);

export const CLOSE_2FA_DIALOG = '[2FA] Close 2FA dialog';
export const close2FADialog = createAction(CLOSE_2FA_DIALOG);

export const OPEN_RECOVERY_DIALOG = '[2FA] Open recovery dialog';
export const openRecoveryDialog = createAction(OPEN_RECOVERY_DIALOG);

export const VERIFY_USER_LOGIN = '[2FA] Verify 2FA login';
export const verifyUserLogin = createAction(VERIFY_USER_LOGIN);

export const VERIFY_CHANGE_EMAIL_PROFILE = '[USER] Verify 2FA change email profile';
export const verifyChangeEmailProfile = createAction(VERIFY_CHANGE_EMAIL_PROFILE);

export const VERIFY_PASSWORD_CHANGE = '[AUTH] Verify 2FA password change';
export const verifyPasswordChange = createAction(VERIFY_PASSWORD_CHANGE);

export const OPEN_NEW_RECOVERY_CODE_DIALOG = '[2FA] Open new recovery code dialog';
export const openNewRecoveryCodeDialog = createAction(OPEN_NEW_RECOVERY_CODE_DIALOG);

export const CLOSE_NEW_RECOVERY_CODE_DIALOG = '[2FA] Close new recovery code dialog';
export const closeNewRecoveryCodeDialog = createAction(CLOSE_NEW_RECOVERY_CODE_DIALOG);
export const OPEN_SECRET_DIALOG = '[2FA] Open change secret dialog';
export const openSecretDialog = createAction(OPEN_SECRET_DIALOG);

export const CLOSE_SECRET_DIALOG = '[2FA] Close change secret dialog';
export const closeSecretDialog = createAction(CLOSE_SECRET_DIALOG);

export const TWO_FA_INIT = '[2FA] Two factor auth INIT';
export const twoFAInit = createAction(TWO_FA_INIT);

export const TWO_FA_INIT_NEXT = '[2FA] Two factor auth init, next step';
export const twoFANext = createAction(TWO_FA_INIT_NEXT);

export const TWO_FA_INIT_BACK = '[2FA] Two factor auth init, previous step';
export const twoFABack = createAction(TWO_FA_INIT_BACK);

export const CREATE_SECRET = '[2FA] Create secret';
export const createSecret = createAction(CREATE_SECRET);

export const CREATE_SECRET_SUCCESS = `${CREATE_SECRET} success`;
export const createSecretSuccess = createAction(CREATE_SECRET_SUCCESS);

export const CREATE_SECRET_FAIL = `${CREATE_SECRET} fail`;
export const createSecretFail = createAction(CREATE_SECRET_FAIL);

export const VERIFY_SECRET = '[2FA] Verify secret';
export const verifySecret = createAction(VERIFY_SECRET);

export const VERIFY_SECRET_SUCCESS = `${VERIFY_SECRET} success`;
export const verifySecretSuccess = createAction(VERIFY_SECRET_SUCCESS);

export const VERIFY_SECRET_FAIL = `${VERIFY_SECRET} fail`;
export const verifySecretFail = createAction(VERIFY_SECRET_FAIL);

export const INITIATE_NEW_SECRET = '[2FA] Initiate new secret key';
export const initiateNewSecret = createAction(INITIATE_NEW_SECRET);

export const INITIATE_NEW_SECRET_SUCCESS = `${INITIATE_NEW_SECRET} success`;
export const initiateNewSecretSuccess = createAction(INITIATE_NEW_SECRET_SUCCESS);

export const INITIATE_NEW_SECRET_FAIL = `${INITIATE_NEW_SECRET} fail`;
export const initiateNewSecretFail = createAction(INITIATE_NEW_SECRET_FAIL);

export const GENERATE_NEW_SECRET = '[2FA] Generate new secret key';
export const generateNewSecret = createAction(GENERATE_NEW_SECRET);

export const GENERATE_NEW_SECRET_SUCCESS = `${GENERATE_NEW_SECRET} success`;
export const generateNewSecretSuccess = createAction(GENERATE_NEW_SECRET_SUCCESS);

export const GENERATE_NEW_SECRET_FAIL = `${GENERATE_NEW_SECRET} fail`;
export const generateNewSecretFail = createAction(GENERATE_NEW_SECRET_FAIL);

export const VERIFY_NEW_SECRET = '[2FA] Verify new secret key';
export const verifyNewSecret = createAction(VERIFY_NEW_SECRET);

export const VERIFY_NEW_SECRET_SUCCESS = `${VERIFY_NEW_SECRET} success`;
export const verifyNewSecretSuccess = createAction(VERIFY_NEW_SECRET_SUCCESS);

export const VERIFY_NEW_SECRET_FAIL = `${VERIFY_NEW_SECRET} fail`;
export const verifyNewSecretFail = createAction(VERIFY_NEW_SECRET_FAIL);

export const VERIFY_CAMPAIGN_DELETION = '[2FA] Verify campaign deletion';
export const verifyCampaignDeletion = createAction(VERIFY_CAMPAIGN_DELETION);
