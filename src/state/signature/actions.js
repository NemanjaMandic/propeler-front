import { createAction } from 'redux-actions';

export const REGISTER_KEY = '[DigitalSignature] Register key';
export const registerKey = createAction(REGISTER_KEY);

export const REGISTER_KEY_SUCCESS = `${REGISTER_KEY} success`;
export const registerKeySuccess = createAction(REGISTER_KEY_SUCCESS);

export const REGISTER_KEY_FAIL = `${REGISTER_KEY} fail`;
export const registerKeyFail = createAction(REGISTER_KEY_FAIL);

export const GET_REGISTERED_KEY = '[DigitalSignature] Get registered key';
export const getRegisteredKey = createAction(GET_REGISTERED_KEY);

export const GET_REGISTERED_KEY_SUCCESS = `${GET_REGISTERED_KEY} success`;
export const getRegisteredKeySuccess = createAction(GET_REGISTERED_KEY_SUCCESS);

export const GET_REGISTERED_KEY_FAIL = `${GET_REGISTERED_KEY} fail`;
export const getRegisteredKeyFail = createAction(GET_REGISTERED_KEY_FAIL);

export const GET_PUBLIC_KEY = '[DigitalSignature] Get public key';
export const getPublicKey = createAction(GET_PUBLIC_KEY);

export const GET_PUBLIC_KEY_SUCCESS = `${GET_PUBLIC_KEY} success`;
export const getPublicKeySuccess = createAction(GET_PUBLIC_KEY_SUCCESS);

export const GET_PUBLIC_KEY_FAIL = `${GET_PUBLIC_KEY} fail`;
export const getPublicKeyFail = createAction(GET_PUBLIC_KEY_FAIL);

// document signing:
export const SIGN_DOCUMENT = '[DigitalSignature] Sign document';
export const signDocument = createAction(SIGN_DOCUMENT);

export const SIGN_DOCUMENT_SUCCESS = `${SIGN_DOCUMENT} success`;
export const signDocumentSuccess = createAction(SIGN_DOCUMENT_SUCCESS);

export const SIGN_DOCUMENT_FAIL = `${SIGN_DOCUMENT} fail`;
export const signDocumentFail = createAction(SIGN_DOCUMENT_FAIL);

export const SIGN_DOCUMENT_REINIT = `${SIGN_DOCUMENT} re-init`;
export const signDocumentReinit = createAction(SIGN_DOCUMENT_REINIT);

// fetch the contracts:
export const GET_CONTRACTS = '[DigitalSignature] get contracts';
export const getContracts = createAction(GET_CONTRACTS);

export const GET_CONTRACTS_SUCCESS = `${GET_CONTRACTS} success`;
export const getContractsSuccess = createAction(GET_CONTRACTS_SUCCESS);

export const GET_CONTRACTS_FAIL = `${GET_CONTRACTS} fail`;
export const getContractsFail = createAction(GET_CONTRACTS_FAIL);
