// @flow

import { createAction } from 'redux-actions';

export const CHANGE_PASSWORD_PROFILE = '[User] Change password';
export const changePasswordProfile = createAction(CHANGE_PASSWORD_PROFILE);

export const CHANGE_PASSWORD_PROFILE_SUCCESS = `${CHANGE_PASSWORD_PROFILE} success`;
export const changePasswordProfileSuccess = createAction(CHANGE_PASSWORD_PROFILE_SUCCESS);

export const CHANGE_PASSWORD_PROFILE_FAIL = `${CHANGE_PASSWORD_PROFILE} fail`;
export const changePasswordProfileFail = createAction(CHANGE_PASSWORD_PROFILE_FAIL);

export const GET_USER_INFO = '[User] Get info';
export const getUserInfo = createAction(GET_USER_INFO);

export const GET_USER_INFO_SUCCESS = `${GET_USER_INFO} success`;
export const getUserInfoSuccess = createAction(GET_USER_INFO_SUCCESS);

export const GET_USER_INFO_FAIL = `${GET_USER_INFO} fail`;
export const getUserInfoFail = createAction(GET_USER_INFO_FAIL);

export const CHANGE_USER_PROFILE = '[User] Change profile';
export const changeUserProfile = createAction(CHANGE_USER_PROFILE);

export const CHANGE_USER_PROFILE_SUCCESS = `${CHANGE_USER_PROFILE} success`;
export const changeUserProfileSuccess = createAction(CHANGE_USER_PROFILE_SUCCESS);

export const CHANGE_USER_PROFILE_FAIL = `${CHANGE_USER_PROFILE} fail`;
export const changeUserProfileFail = createAction(CHANGE_USER_PROFILE_FAIL);

export const UPLOAD_PROFILE_PHOTO = '[User] Upload profile photo';
export const uploadProfilePhoto = createAction(UPLOAD_PROFILE_PHOTO);

export const UPLOAD_PROFILE_PHOTO_SUCCESS = `${UPLOAD_PROFILE_PHOTO} success`;
export const uploadProfilePhotoSuccess = createAction(UPLOAD_PROFILE_PHOTO_SUCCESS);

export const UPLOAD_PROFILE_PHOTO_FAIL = `${UPLOAD_PROFILE_PHOTO} fail`;
export const uploadProfilePhotoFail = createAction(UPLOAD_PROFILE_PHOTO_FAIL);

export const GET_PROFILE_PHOTO = '[User] Get profile photo';
export const getProfilePhoto = createAction(GET_PROFILE_PHOTO);

export const GET_PROFILE_PHOTO_SUCCESS = `${GET_PROFILE_PHOTO} success`;
export const getProfilePhotoSuccess = createAction(GET_PROFILE_PHOTO_SUCCESS);

export const GET_PROFILE_PHOTO_FAIL = `${GET_PROFILE_PHOTO} fail`;
export const getProfilePhotoFail = createAction(GET_PROFILE_PHOTO_FAIL);

export const DELETE_PROFILE_PHOTO = '[User] Delete profile photo';
export const deleteProfilePhoto = createAction(DELETE_PROFILE_PHOTO);

export const DELETE_PROFILE_PHOTO_SUCCESS = `${DELETE_PROFILE_PHOTO} success`;
export const deleteProfilePhotoSuccess = createAction(DELETE_PROFILE_PHOTO_SUCCESS);

export const DELETE_PROFILE_PHOTO_FAIL = `${DELETE_PROFILE_PHOTO} fail`;
export const deleteProfilePhotoFail = createAction(DELETE_PROFILE_PHOTO_FAIL);

export const CHANGE_EMAIL_PROFILE = '[User] Change email';
export const changeEmailProfile = createAction(CHANGE_EMAIL_PROFILE);

export const CHANGE_EMAIL_PROFILE_SUCCESS = `${CHANGE_EMAIL_PROFILE} success`;
export const changeEmailProfileSuccess = createAction(CHANGE_EMAIL_PROFILE_SUCCESS);

export const CHANGE_EMAIL_PROFILE_FAIL = `${CHANGE_EMAIL_PROFILE} fail`;
export const changeEmailProfileFail = createAction(CHANGE_EMAIL_PROFILE_FAIL);

export const CONFIRM_EMAIL_CHANGE = '[User] Confirm email change';
export const confirmEmailChange = createAction(CONFIRM_EMAIL_CHANGE);

export const CONFIRM_EMAIL_CHANGE_SUCCESS = `${CONFIRM_EMAIL_CHANGE} success`;
export const confirmEmailChangeSuccess = createAction(CONFIRM_EMAIL_CHANGE_SUCCESS);

export const CONFIRM_EMAIL_CHANGE_FAIL = `${CONFIRM_EMAIL_CHANGE} fail`;
export const confirmEmailChangeFail = createAction(CONFIRM_EMAIL_CHANGE_FAIL);

export const RECOVERY_CODES = '[User] Recovery code';
export const recoveryCode = createAction(RECOVERY_CODES);

export const RECOVERY_CODES_SUCCESS = `${RECOVERY_CODES} success`;
export const recoveryCodeSuccess = createAction(RECOVERY_CODES_SUCCESS);

export const RECOVERY_CODES_FAIL = `${RECOVERY_CODES} fail`;
export const recoveryCodeFail = createAction(RECOVERY_CODES_FAIL);

export const UPLOAD_KYC_FRONT_PHOTO = '[User] Upload kyc front photo';
export const uploadKycFrontPhoto = createAction(UPLOAD_KYC_FRONT_PHOTO);

export const UPLOAD_KYC_FRONT_PHOTO_SUCCESS = `${UPLOAD_KYC_FRONT_PHOTO} success`;
export const uploadKycFrontPhotoSuccess = createAction(UPLOAD_KYC_FRONT_PHOTO_SUCCESS);

export const UPLOAD_KYC_FRONT_PHOTO_FAIL = `${UPLOAD_KYC_FRONT_PHOTO} fail`;
export const uploadKycFrontPhotoFail = createAction(UPLOAD_KYC_FRONT_PHOTO_FAIL);

export const UPLOAD_KYC_BACK_PHOTO = '[User] Upload kyc back photo';
export const uploadKycBackPhoto = createAction(UPLOAD_KYC_BACK_PHOTO);

export const UPLOAD_KYC_BACK_PHOTO_SUCCESS = `${UPLOAD_KYC_BACK_PHOTO} success`;
export const uploadKycBackPhotoSuccess = createAction(UPLOAD_KYC_BACK_PHOTO_SUCCESS);

export const UPLOAD_KYC_BACK_PHOTO_FAIL = `${UPLOAD_KYC_BACK_PHOTO} fail`;
export const uploadKycBackPhotoFail = createAction(UPLOAD_KYC_BACK_PHOTO_FAIL);

export const GET_KYC_FRONT_PHOTO = '[User] Get kyc front photo';
export const getKycFrontPhoto = createAction(GET_KYC_FRONT_PHOTO);

export const GET_KYC_FRONT_PHOTO_SUCCESS = `${GET_KYC_FRONT_PHOTO} success`;
export const getKycFrontPhotoSuccess = createAction(GET_KYC_FRONT_PHOTO_SUCCESS);

export const GET_KYC_FRONT_PHOTO_FAIL = `${GET_KYC_FRONT_PHOTO} fail`;
export const getKycFrontPhotoFail = createAction(GET_KYC_FRONT_PHOTO_FAIL);

export const GET_KYC_BACK_PHOTO = '[User] Get kyc back photo';
export const getKycBackPhoto = createAction(GET_KYC_BACK_PHOTO);

export const GET_KYC_BACK_PHOTO_SUCCESS = `${GET_KYC_BACK_PHOTO} success`;
export const getKycBackPhotoSuccess = createAction(GET_KYC_BACK_PHOTO_SUCCESS);

export const GET_KYC_BACK_PHOTO_FAIL = `${GET_KYC_BACK_PHOTO} fail`;
export const getKycBackPhotoFail = createAction(GET_KYC_BACK_PHOTO_FAIL);

export const SUBMIT_KYC_REQUEST = '[User] Submit KYC request';
export const submitKYCRequest = createAction(SUBMIT_KYC_REQUEST);

export const SUBMIT_KYC_REQUEST_SUCCESS = `${SUBMIT_KYC_REQUEST} success`;
export const submitKYCRequestSuccess = createAction(SUBMIT_KYC_REQUEST_SUCCESS);

export const SUBMIT_KYC_REQUEST_FAIL = `${SUBMIT_KYC_REQUEST} fail`;
export const submitKYCRequestFail = createAction(SUBMIT_KYC_REQUEST_FAIL);

export const DELETE_KYC_FRONT_PHOTO = '[User] Delete KYC front photo';
export const deleteKYCFrontPhoto = createAction(DELETE_KYC_FRONT_PHOTO);

export const DELETE_KYC_BACK_PHOTO = '[User] Delete KYC back photo';
export const deleteKYCBackPhoto = createAction(DELETE_KYC_BACK_PHOTO);

export const UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT = '[User] Upload KYC company investor document';
export const uploadKYCCompanyInvestorDocument = createAction(UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT);

export const UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_SUCCESS = `${UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT} success`;
export const uploadKYCCompanyInvestorDocumentSuccess = createAction(UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_SUCCESS);

export const UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_FAIL = `${UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT} fail`;
export const uploadKYCCompanyInvestorDocumentFail = createAction(UPLOAD_KYC_COMPANY_INVESTOR_DOCUMENT_FAIL);

export const REMOVE_UPLOADED_KYC_COMAPNY_DOCUMENT = '[User] Remove uploaded KYC company document';
export const removeUploadedKYCCompanyDocument = createAction(REMOVE_UPLOADED_KYC_COMAPNY_DOCUMENT);

export const GET_KYC_FOR_CURRENT_USER = '[User] Get KYC for current user';
export const getKYCforCurrentUser = createAction(GET_KYC_FOR_CURRENT_USER);

export const GET_KYC_FOR_CURRENT_USER_SUCCESS = `${GET_KYC_FOR_CURRENT_USER} success`;
export const getKYCforCurrentUserSuccess = createAction(GET_KYC_FOR_CURRENT_USER_SUCCESS);

export const GET_KYC_FOR_CURRENT_USER_FAIL = `${GET_KYC_FOR_CURRENT_USER} fail`;
export const getKYCforCurrentUserFail = createAction(GET_KYC_FOR_CURRENT_USER_FAIL);

export const GET_KYC_DOC_FOR_CURRENT_USER = '[User] Get KYC doc for current user';
export const getKYCDocForCurrentUser = createAction(GET_KYC_DOC_FOR_CURRENT_USER);

export const GET_KYC_DOC_FOR_CURRENT_USER_SUCCESS = `${GET_KYC_DOC_FOR_CURRENT_USER} success`;
export const getKYCDocForCurrentUserSuccess = createAction(GET_KYC_DOC_FOR_CURRENT_USER_SUCCESS);

export const GET_KYC_DOC_FOR_CURRENT_USER_FAIL = `${GET_KYC_DOC_FOR_CURRENT_USER} fail`;
export const getKYCDocForCurrentUserFail = createAction(GET_KYC_DOC_FOR_CURRENT_USER_FAIL);

export const GET_KYC_NOTIFICATION = '[User] Get kyc notification';
export const getKYCNotification = createAction(GET_KYC_NOTIFICATION);
