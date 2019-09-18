// @flow

export const getQueryString = (params: Object) => {
	return Object.keys(params)
		.map(k => {
			if (Array.isArray(params[k])) {
				return params[k].map(val => `${encodeURIComponent(k)}=${encodeURIComponent(val)}`).join('&');
			}
			const paramValue = encodeURIComponent(params[k]).replace('%2C', ',');
			return params[k] || params[k] === false ? `${encodeURIComponent(k)}=${paramValue}` : '';
		})
		.join('&');
};

const UtilsService = {
	getQueryString,
};

export default UtilsService;
