// @flow

import * as actions from './actions';
import initialState from './initialState';

type ActionT = {
	type: String,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;
	switch (type) {
		case actions.GET_DOCUMENT_TYPES: {
			const { documentTypes, tweaker } = state;
			documentTypes.data[payload] = {
				inProgress: true,
				errors: '',
				documents: [],
				mandatoriesForEntity: false,
			};

			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.GET_DOCUMENT_TYPES_SUCCESS: {
			const { documentTypes, tweaker } = state;
			const mandatories = payload.data.filter(item => item.mandatory);
			documentTypes.data[payload.entity] = {
				inProgress: false,
				errors: '',
				documents: payload.data.map(doc => {
					return {
						...doc,
						uploads: [],
					};
				}),
				mandatoriesForEntity: mandatories.length === 0,
			};
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.GET_DOCUMENT_TYPES_FAIL: {
			const { documentTypes, tweaker } = state;
			documentTypes.data[payload.entity] = {
				inProgress: false,
				documents: [],
				mandatoriesForEntity: false,
				errors: payload.error,
			};
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.UPLOAD_DYNAMIC_DOCUMENT: {
			const { documentTypes, tweaker } = state;

			const updatedDocs = documentTypes.data[payload.entity].documents.map(doc => {
				if (doc.type === payload.docType) {
					const uploads = doc.uploads.concat([{ ...doc, inProgress: true }]);
					return { ...doc, uploads, inProgress: true };
				}
				return doc;
			});
			documentTypes.data[payload.entity].documents = updatedDocs;
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.UPLOAD_DYNAMIC_DOCUMENT_SUCCESS: {
			const { documentTypes, tweaker } = state;
			const updatedDocs = documentTypes.data[payload.entity].documents.map(doc => {
				if (doc.type === payload.docType) {
					const uploads = doc.uploads.map(upld => {
						return { ...upld, url: payload.url, name: payload.name, inProgress: false };
					});
					return { ...doc, uploads, inProgress: false };
				}
				return doc;
			});
			const mandatories = documentTypes.data[payload.entity].documents.filter(item => item.mandatory === true);
			const mandatoryUploads = mandatories.filter(item => item.uploads.length > 0);

			documentTypes.data[payload.entity].documents = updatedDocs;
			documentTypes.data[payload.entity].mandatoriesForEntity = mandatoryUploads.length === mandatories.length;
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.UPLOAD_DYNAMIC_DOCUMENT_FAIL: {
			const { documentTypes, tweaker } = state;
			const entityDocuments = documentTypes.data[payload.entity];
			const updatedDocs = entityDocuments.documents.map(doc => {
				if (doc.type === payload.docType) {
					const uploads = doc.uploads.map(upld => {
						return { ...upld, inProgress: false };
					});
					return { ...doc, uploads, inProgress: false };
				}
				return doc;
			});
			const mandatories = documentTypes.data[payload.entity].documents.filter(item => item.mandatory);
			const mandatoryUploads = mandatories.filter(item => item.uploads.length > 0);

			documentTypes.data[payload.entity].documents = updatedDocs;
			documentTypes.data[payload.entity].mandatoriesForEntity = mandatoryUploads.length === mandatories.length;
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.CLEAR_DYNAMIC_DOCUMENTS_FOR_ENTITY: {
			const { documentTypes, tweaker } = state;
			documentTypes.data[payload] = {
				inProgress: true,
				errors: '',
				documents: [],
				mandatoriesForEntity: false,
			};
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		case actions.REMOVE_DYNAMIC_DOCUMENT_FOR_ENTITY: {
			const { documentTypes, tweaker } = state;
			let { mandatoriesForEntity } = documentTypes.data[payload.entity];
			const docs = documentTypes.data[payload.entity].documents.map(doc => {
				if (doc.type === payload.docType) {
					const uploads = doc.uploads.filter(upld => upld.url !== payload.url);
					if (doc.mandatory && uploads.length === 0) mandatoriesForEntity = false;
					return { ...doc, uploads };
				}
				return doc;
			});

			documentTypes.data[payload.entity].documents = docs;
			documentTypes.data[payload.entity].mandatoriesForEntity = mandatoriesForEntity;
			return {
				...state,
				documentTypes,
				tweaker: !tweaker,
			};
		}
		default:
			return state;
	}
};
