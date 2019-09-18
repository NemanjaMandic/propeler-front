// @flow

import axios from 'axios';
import { getQueryString } from './util';
import localizedError from '../utilities/errorHelpers';
import { FILES } from './api';

const defaultHeaders = {
	'content-type': 'application/json',
	accept: 'application/json',
};

class Network {
	service: Object;

	constructor() {
		const service = axios.create();
		service.interceptors.request.use(Network.handleSuccessRequest, Network.handleErrorRequest);
		service.defaults.headers = defaultHeaders;
		this.service = service;
	}

	static handleSuccessRequest(request: Object) {
		if (localStorage.getItem('authorization')) {
			// $FlowIssue
			request.headers.authorization = `Bearer ${localStorage.getItem('authorization')}`;
		}
		return request;
	}

	static handleErrorRequest(response: Object) {
		return response;
	}

	get(path: string, query?: Object) {
		const fullPath = query ? `${path}?${getQueryString(query)}` : path;
		return this.service
			.get(fullPath)
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	head(path: string, query?: Object) {
		const fullPath = query ? `${path}?${getQueryString(query)}` : path;
		return this.service
			.head(fullPath)
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	patch(path: string, payload: any) {
		return this.service
			.request({
				method: 'PATCH',
				url: path,
				data: JSON.stringify(payload),
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	post(path: string, payload: any) {
		return this.service
			.request({
				method: 'POST',
				url: path,
				withCredentials: true,
				data: payload ? JSON.stringify(payload) : {},
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	postWithHeader(path: string, payload: any, header: Object) {
		const { passwordConfirm, ...ommitedPayload } = payload;
		return this.service
			.request({
				method: 'POST',
				url: path,
				data: ommitedPayload ? JSON.stringify(ommitedPayload) : {},
				headers: header,
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	put(path: string, payload: any) {
		return this.service
			.request({
				method: 'PUT',
				url: path,
				data: JSON.stringify(payload),
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	delete(path: string, payload: any) {
		return this.service
			.request({
				method: 'DELETE',
				url: path,
				data: JSON.stringify(payload),
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}

	postForm(path: string, payload: any) {
		const formData = new FormData();
		// TODO: refactor
		let type = path.includes('updates') ? 'image' : 'picture';
		if (payload.data.type === 'application/pdf' || path === FILES) {
			type = 'file';
		}

		formData.append(type, payload.data, payload.name);
		return this.service
			.request({
				method: 'POST',
				url: path,
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					accept: '*/*, application/json',
				},
			})
			.then(response => response)
			.catch(error => Promise.reject(localizedError(error)));
	}
}

export default new Network();
