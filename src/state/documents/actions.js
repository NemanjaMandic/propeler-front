import { createAction } from 'redux-actions';

// Get document types for entity
export const GET_DOCUMENT_TYPES = '[Documents] Get document types';
export const getDocumentTypes = createAction(GET_DOCUMENT_TYPES);

export const GET_DOCUMENT_TYPES_SUCCESS = `${GET_DOCUMENT_TYPES} success`;
export const getDocumentTypesSuccess = createAction(GET_DOCUMENT_TYPES_SUCCESS);

export const GET_DOCUMENT_TYPES_FAIL = `${GET_DOCUMENT_TYPES} fail`;
export const getDocumentTypesFail = createAction(GET_DOCUMENT_TYPES_FAIL);

// upload document:
export const UPLOAD_DYNAMIC_DOCUMENT = '[Documents] Upload dynamic document';
export const uploadDynamicDocument = createAction(UPLOAD_DYNAMIC_DOCUMENT);

export const UPLOAD_DYNAMIC_DOCUMENT_SUCCESS = `${UPLOAD_DYNAMIC_DOCUMENT} success`;
export const uploadDynamicDocumentSuccess = createAction(UPLOAD_DYNAMIC_DOCUMENT_SUCCESS);

export const UPLOAD_DYNAMIC_DOCUMENT_FAIL = `${UPLOAD_DYNAMIC_DOCUMENT} fail`;
export const uploadDynamicDocumentFail = createAction(UPLOAD_DYNAMIC_DOCUMENT_FAIL);

// clear documents:
export const CLEAR_DYNAMIC_DOCUMENTS_FOR_ENTITY = '[Documents] Clear dynamic documents for entity';
export const clearDynamicDocumentsForEntity = createAction(CLEAR_DYNAMIC_DOCUMENTS_FOR_ENTITY);

// remove uploaded document:
export const REMOVE_DYNAMIC_DOCUMENT_FOR_ENTITY = '[Documents] Remove dynamic document for entity';
export const removeDynamicDocumentForEntity = createAction(REMOVE_DYNAMIC_DOCUMENT_FOR_ENTITY);

export const GENERATE_ENTREPRENEUR_CONTRACT = '[Documents] Generate entrepreneur platform contract';
export const generateEntrepreneurContract = createAction(GENERATE_ENTREPRENEUR_CONTRACT);

export const GENERATE_ENTREPRENEUR_CONTRACT_SUCCESS = `${GENERATE_ENTREPRENEUR_CONTRACT} success`;
export const generateEntrepreneurContractSuccess = createAction(GENERATE_ENTREPRENEUR_CONTRACT_SUCCESS);

export const GENERATE_ENTREPRENEUR_CONTRACT_FAIL = `${GENERATE_ENTREPRENEUR_CONTRACT} fail`;
export const generateEntrepreneurContractFail = createAction(GENERATE_ENTREPRENEUR_CONTRACT_FAIL);
