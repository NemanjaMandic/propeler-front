import { createAction } from 'redux-actions';

export const CREATE_COMPANY = '[Company] Create company';
export const createCompany = createAction(CREATE_COMPANY);

export const CREATE_COMPANY_SUCCESS = `${CREATE_COMPANY} success`;
export const createCompanySuccess = createAction(CREATE_COMPANY_SUCCESS);

export const CREATE_COMPANY_FAIL = `${CREATE_COMPANY} fail`;
export const createCompanyFail = createAction(CREATE_COMPANY_FAIL);

export const REVIEW_COMPANY = '[Company] Review company';
export const reviewCompany = createAction(REVIEW_COMPANY);

export const REVIEW_COMPANY_SUCCESS = `${REVIEW_COMPANY} success`;
export const reviewCompanySuccess = createAction(REVIEW_COMPANY_SUCCESS);

export const REVIEW_COMPANY_FAIL = `${REVIEW_COMPANY} fail`;
export const reviewCompanyFail = createAction(REVIEW_COMPANY_FAIL);

export const UPDATE_EXTERNAL_LINKS = '[Company] Update external links';
export const updateExternalLinks = createAction(UPDATE_EXTERNAL_LINKS);

export const UPDATE_EXTERNAL_LINKS_SUCCESS = `${UPDATE_EXTERNAL_LINKS} success`;
export const updateExternalLinksSuccess = createAction(UPDATE_EXTERNAL_LINKS_SUCCESS);

export const UPDATE_EXTERNAL_LINKS_FAIL = `${UPDATE_EXTERNAL_LINKS} fail`;
export const updateExternalLinksFail = createAction(UPDATE_EXTERNAL_LINKS_FAIL);

export const GET_COMPANY = '[Company] Get company';
export const getCompany = createAction(GET_COMPANY);

export const GET_COMPANY_SUCCESS = `${GET_COMPANY} success`;
export const getCompanySuccess = createAction(GET_COMPANY_SUCCESS);

export const GET_COMPANY_FAIL = `${GET_COMPANY} fail`;
export const getCompanyFail = createAction(GET_COMPANY_FAIL);

export const UPLOAD_FEATURED_IMAGE = '[Company] Upload featured image';
export const uploadFeaturedImage = createAction(UPLOAD_FEATURED_IMAGE);

export const UPLOAD_FEATURED_IMAGE_SUCCESS = `${UPLOAD_FEATURED_IMAGE} success`;
export const uploadFeaturedImageSuccess = createAction(UPLOAD_FEATURED_IMAGE_SUCCESS);

export const UPLOAD_FEATURED_IMAGE_FAIL = `${UPLOAD_FEATURED_IMAGE} fail`;
export const uploadFeaturedImageFail = createAction(UPLOAD_FEATURED_IMAGE_FAIL);

export const DELETE_FEATURED_IMAGE = '[Company] Delete featured image';
export const deleteFeaturedImage = createAction(DELETE_FEATURED_IMAGE);

export const DELETE_FEATURED_IMAGE_SUCCESS = `${DELETE_FEATURED_IMAGE} success`;
export const deleteFeaturedImageSuccess = createAction(DELETE_FEATURED_IMAGE_SUCCESS);

export const DELETE_FEATURED_IMAGE_FAIL = `${DELETE_FEATURED_IMAGE} fail`;
export const deleteFeaturedImageFail = createAction(DELETE_FEATURED_IMAGE_FAIL);

export const GET_FEATURED_IMAGE = '[Company] Get featured image';
export const getFeaturedImage = createAction(GET_FEATURED_IMAGE);

export const GET_FEATURED_IMAGE_SUCCESS = `${GET_FEATURED_IMAGE} success`;
export const getFeaturedImageSuccess = createAction(GET_FEATURED_IMAGE_SUCCESS);

export const GET_FEATURED_IMAGE_FAIL = `${GET_FEATURED_IMAGE} fail`;
export const getFeaturedImageFail = createAction(GET_FEATURED_IMAGE_FAIL);

export const UPLOAD_COMPANY_LOGO = '[Company] Upload logo';
export const uploadCompanyLogo = createAction(UPLOAD_COMPANY_LOGO);

export const UPLOAD_COMPANY_LOGO_SUCCESS = `${UPLOAD_COMPANY_LOGO} success`;
export const uploadCompanyLogoSuccess = createAction(UPLOAD_COMPANY_LOGO_SUCCESS);

export const UPLOAD_COMPANY_LOGO_FAIL = `${UPLOAD_COMPANY_LOGO} fail`;
export const uploadCompanyLogoFail = createAction(UPLOAD_COMPANY_LOGO_FAIL);

export const DELETE_COMPANY_LOGO = '[Company] Delete logo';
export const deleteCompanyLogo = createAction(DELETE_COMPANY_LOGO);

export const DELETE_COMPANY_LOGO_SUCCESS = `${DELETE_COMPANY_LOGO} success`;
export const deleteCompanyLogoSuccess = createAction(DELETE_COMPANY_LOGO_SUCCESS);

export const DELETE_COMPANY_LOGO_FAIL = `${DELETE_COMPANY_LOGO} fail`;
export const deleteCompanyLogoFail = createAction(DELETE_COMPANY_LOGO_FAIL);

export const GET_COMPANY_LOGO = '[Company] Get logo';
export const getCompanyLogo = createAction(GET_COMPANY_LOGO);

export const GET_COMPANY_LOGO_SUCCESS = `${GET_COMPANY_LOGO} success`;
export const getCompanyLogoSuccess = createAction(GET_COMPANY_LOGO_SUCCESS);

export const GET_COMPANY_LOGO_FAIL = `${GET_COMPANY_LOGO} fail`;
export const getCompanyLogoFail = createAction(GET_COMPANY_LOGO_FAIL);

export const STEP_BACK = '[Company} step back';
export const stepBack = createAction(STEP_BACK);

export const STEP_NEXT = '[Company} step next';
export const stepNext = createAction(STEP_NEXT);

export const UPDATE_COMPANY = '[Company] Update company';
export const updateCompany = createAction(UPDATE_COMPANY);

export const UPDATE_COMPANY_SUCCESS = `${UPDATE_COMPANY} success`;
export const updateCompanySuccess = createAction(UPDATE_COMPANY_SUCCESS);

export const UPDATE_COMPANY_FAIL = `${UPDATE_COMPANY} fail`;
export const updateCompanyFail = createAction(UPDATE_COMPANY_FAIL);

export const GET_USER_COMPANY = '[Company] Get user company';
export const getUserCompany = createAction(GET_USER_COMPANY);

export const GET_USER_COMPANY_SUCCESS = `${GET_USER_COMPANY} success`;
export const getUserCompanySuccess = createAction(GET_USER_COMPANY_SUCCESS);

export const GET_USER_COMPANY_FAIL = `${GET_USER_COMPANY} fail`;
export const getUserCompanyFail = createAction(GET_USER_COMPANY_FAIL);

// SHAREHOLDERS:
export const GET_SHARE_HOLDERS = `[Company] Get shareholders`;
export const getShareHolders = createAction(GET_SHARE_HOLDERS);

export const GET_SHARE_HOLDERS_SUCCESS = `${GET_SHARE_HOLDERS} success`;
export const getShareHoldersSuccess = createAction(GET_SHARE_HOLDERS_SUCCESS);

export const GET_SHARE_HOLDERS_FAIL = `${GET_SHARE_HOLDERS} fail`;
export const getShareHoldersFail = createAction(GET_SHARE_HOLDERS_FAIL);

export const GET_SHARE_HOLDERS_MINE = `[Company] Get my shareholders`;
export const getShareHoldersMine = createAction(GET_SHARE_HOLDERS_MINE);

export const GET_SHARE_HOLDERS_MINE_SUCCESS = `${GET_SHARE_HOLDERS_MINE} success`;
export const getShareHoldersMineSuccess = createAction(GET_SHARE_HOLDERS_MINE_SUCCESS);

export const GET_SHARE_HOLDERS_MINE_FAIL = `${GET_SHARE_HOLDERS_MINE} fail`;
export const getShareHoldersMineFail = createAction(GET_SHARE_HOLDERS_MINE_FAIL);

export const GET_SHARE_HOLDER_PHOTO = '[Company] Get shareholder photo';
export const getShareHolderPhoto = createAction(GET_SHARE_HOLDER_PHOTO);

export const GET_SHARE_HOLDERS_PHOTO_SUCCESS = `${GET_SHARE_HOLDER_PHOTO} success`;
export const getShareHolderPhotoSuccess = createAction(GET_SHARE_HOLDERS_PHOTO_SUCCESS);

export const GET_SHARE_HOLDERS_PHOTO_FAIL = `${GET_SHARE_HOLDER_PHOTO} fail`;
export const getShareHolderPhotoFail = createAction(GET_SHARE_HOLDERS_PHOTO_FAIL);

export const REORDER_SHARE_HOLDERS = `[Company] Reorder share holders`;
export const reorderShareHolders = createAction(REORDER_SHARE_HOLDERS);

export const REORDER_SHARE_HOLDERS_SUCCESS = `${REORDER_SHARE_HOLDERS} success`;
export const reorderShareHoldersSuccess = createAction(REORDER_SHARE_HOLDERS_SUCCESS);

export const REORDER_SHARE_HOLDERS_FAIL = `${REORDER_SHARE_HOLDERS} fail`;
export const reorderShareHoldersFail = createAction(REORDER_SHARE_HOLDERS_FAIL);

export const ADD_SHARE_HOLDER = `[Company] Add share holder`;
export const addShareHolder = createAction(ADD_SHARE_HOLDER);

export const ADD_SHARE_HOLDER_SUCCESS = `${ADD_SHARE_HOLDER} success`;
export const addShareHolderSuccess = createAction(ADD_SHARE_HOLDER_SUCCESS);

export const ADD_SHARE_HOLDER_FAIL = `${ADD_SHARE_HOLDER} fail`;
export const addShareHolderFail = createAction(ADD_SHARE_HOLDER_FAIL);

export const UPDATE_SHARE_HOLDER = `[Company] Update share holder`;
export const updateShareHolder = createAction(UPDATE_SHARE_HOLDER);

export const UPDATE_SHARE_HOLDER_SUCCESS = `${UPDATE_SHARE_HOLDER} success`;
export const updateShareHolderSuccess = createAction(UPDATE_SHARE_HOLDER_SUCCESS);

export const UPDATE_SHARE_HOLDER_FAIL = `${UPDATE_SHARE_HOLDER} fail`;
export const updateShareHolderFail = createAction(UPDATE_SHARE_HOLDER_FAIL);

export const DELETE_SHARE_HOLDER = `[Company] Delete share holder`;
export const deleteShareHolder = createAction(DELETE_SHARE_HOLDER);

export const DELETE_SHARE_HOLDER_SUCCESS = `${DELETE_SHARE_HOLDER} success`;
export const deleteShareHolderSuccess = createAction(DELETE_SHARE_HOLDER_SUCCESS);

export const DELETE_SHARE_HOLDER_FAIL = `${DELETE_SHARE_HOLDER} fail`;
export const deleteShareHolderFail = createAction(DELETE_SHARE_HOLDER_FAIL);

export const UPLOAD_SHARE_HOLDER_PHOTO = '[Company] Upload share holder photo';
export const uploadShareHolderPhoto = createAction(UPLOAD_SHARE_HOLDER_PHOTO);

export const UPLOAD_SHARE_HOLDER_PHOTO_SUCCESS = `${UPLOAD_SHARE_HOLDER_PHOTO} success`;
export const uploadShareHolderPhotoSuccess = createAction(UPLOAD_SHARE_HOLDER_PHOTO_SUCCESS);

export const UPLOAD_SHARE_HOLDER_PHOTO_FAIL = `${UPLOAD_SHARE_HOLDER_PHOTO} fail`;
export const uploadShareHolderPhotoFail = createAction(UPLOAD_SHARE_HOLDER_PHOTO_FAIL);

export const DELETE_SHARE_HOLDER_PHOTO = '[Company] Delete share holder photo';
export const deleteShareHolderPhoto = createAction(DELETE_SHARE_HOLDER_PHOTO);

export const DELETE_SHARE_HOLDER_PHOTO_SUCCESS = `${DELETE_SHARE_HOLDER_PHOTO} success`;
export const deleteShareHolderPhotoSuccess = createAction(DELETE_SHARE_HOLDER_PHOTO_SUCCESS);

export const DELETE_SHARE_HOLDER_PHOTO_FAIL = `${DELETE_SHARE_HOLDER_PHOTO} fail`;
export const deleteShareHolderPhotoFail = createAction(DELETE_SHARE_HOLDER_PHOTO_FAIL);

export const SET_SHARE_HOLDER_POSITION = '[Company] Set share holder position';
export const setShareHolderPosition = createAction(SET_SHARE_HOLDER_POSITION);

// COMPANY DOCUMENTS
export const GET_COMPANY_DOCUMENTS = '[Company] Get all documents';
export const getCompanyDocuments = createAction(GET_COMPANY_DOCUMENTS);

export const GET_COMPANY_DOCUMENTS_SUCCESS = `${GET_COMPANY_DOCUMENTS} success`;
export const getCompanyDocumentsSuccess = createAction(GET_COMPANY_DOCUMENTS_SUCCESS);

export const GET_COMPANY_DOCUMENTS_FAIL = `${GET_COMPANY_DOCUMENTS} fail`;
export const getCompanyDocumentsFail = createAction(GET_COMPANY_DOCUMENTS_FAIL);

export const SUBMIT_COMPANY_DOCUMENT = '[Company] Submit document';
export const submitCompanyDocument = createAction(SUBMIT_COMPANY_DOCUMENT);

export const SUBMIT_COMPANY_DOCUMENT_SUCCESS = `${SUBMIT_COMPANY_DOCUMENT} success`;
export const submitCompanyDocumentSuccess = createAction(SUBMIT_COMPANY_DOCUMENT_SUCCESS);

export const SUBMIT_COMPANY_DOCUMENT_FAIL = `${SUBMIT_COMPANY_DOCUMENT} fail`;
export const submitCompanyDocumentFail = createAction(SUBMIT_COMPANY_DOCUMENT_FAIL);

export const UPDATE_COMPANY_DOCUMENT = '[Company] Update document';
export const updateCompanyDocument = createAction(UPDATE_COMPANY_DOCUMENT);

export const UPDATE_COMPANY_DOCUMENT_SUCCESS = `${UPDATE_COMPANY_DOCUMENT} success`;
export const updateCompanyDocumentSuccess = createAction(UPDATE_COMPANY_DOCUMENT_SUCCESS);

export const UPDATE_COMPANY_DOCUMENT_FAIL = `${UPDATE_COMPANY_DOCUMENT} fail`;
export const updateCompanyDocumentFail = createAction(UPDATE_COMPANY_DOCUMENT_FAIL);

export const DELETE_COMPANY_DOCUMENT = '[Company] Delete document';
export const deleteCompanyDocument = createAction(DELETE_COMPANY_DOCUMENT);

export const DELETE_COMPANY_DOCUMENT_SUCCESS = `${DELETE_COMPANY_DOCUMENT} success`;
export const deleteCompanyDocumentSuccess = createAction(DELETE_COMPANY_DOCUMENT_SUCCESS);

export const DELETE_COMPANY_DOCUMENT_FAIL = `${DELETE_COMPANY_DOCUMENT} fail`;
export const deleteCompanyDocumentFail = createAction(DELETE_COMPANY_DOCUMENT_FAIL);

export const GET_COMPANY_DOCUMENTS_OVERVIEW = '[Company] Get all documents for overview';
export const getCompanyDocumentsOverview = createAction(GET_COMPANY_DOCUMENTS_OVERVIEW);

export const GET_COMPANY_DOCUMENTS_OVERVIEW_SUCCESS = `${GET_COMPANY_DOCUMENTS_OVERVIEW} success`;
export const getCompanyDocumentsOverviewSuccess = createAction(GET_COMPANY_DOCUMENTS_OVERVIEW_SUCCESS);

export const GET_COMPANY_DOCUMENTS_OVERVIEW_FAIL = `${GET_COMPANY_DOCUMENTS_OVERVIEW} fail`;
export const getCompanyDocumentsOverviewFail = createAction(GET_COMPANY_DOCUMENTS_OVERVIEW_FAIL);
