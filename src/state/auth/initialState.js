// @flow

type StateT = {
	authentication: {
		isAuthenticated: boolean,
		isAuthorized: boolean,
		inProgress: boolean,
	},
	forgotPassword: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	forgotUsername: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	changePassword: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	changeUsername: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	registerUser: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	checkUsername: {
		inProgress: boolean,
		success: boolean,
		errors: string,
	},
	fundRaisingProposal: {
		successFP: boolean,
		inProgress: boolean,
		errors: string,
	},
	uploadDocument: {
		PITCH_DECK: {
			url: string,
			inProgress: boolean,
		},
		BUSINESS_PLAN: {
			url: string,
			inProgress: boolean,
		},
		errors: string,
	},
	registrationToken: {
		firstName: string,
		lastName: string,
		inProgress: boolean,
	},
	platformSettings: {
		settings: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	errors: string,
};

const initialState = (): StateT => ({
	authentication: {
		isAuthenticated: false,
		isAuthorized: false,
		inProgress: false,
	},
	forgotPassword: {
		inProgress: false,
		success: false,
		errors: '',
	},
	forgotUsername: {
		inProgress: false,
		success: false,
		errors: '',
	},
	changePassword: {
		inProgress: false,
		success: false,
		errors: '',
	},
	changeUsername: {
		inProgress: false,
		success: false,
		errors: '',
	},
	registerUser: {
		inProgress: false,
		success: false,
		errors: '',
	},
	checkUsername: {
		inProgress: false,
		success: false,
		errors: '',
	},
	fundRaisingProposal: {
		successFP: false,
		inProgress: false,
		errors: '',
	},
	uploadDocument: {
		PITCH_DECK: {
			url: '',
			inProgress: false,
		},
		BUSINESS_PLAN: {
			url: '',
			inProgress: false,
		},
		errors: '',
	},
	registrationToken: {
		firstName: '',
		lastName: '',
		inProgress: false,
	},
	platformSettings: {
		settings: {
			platformCurrency: {
				code: '',
				name: '',
				symbol: '',
			},
		},
		inProgress: false,
		errors: '',
	},
	errors: '',
});

export default initialState;
