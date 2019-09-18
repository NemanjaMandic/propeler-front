// @flow

type StateT = {
	is2FAOpen: boolean,
	isRecoveryOpen: boolean,
	isNewRecoveryCodeOpen: boolean,
	showRememberMe: boolean,
	action?: Function,
	token?: string,
	inProgress: boolean,
	success: boolean,
	errors: string,
	twoFAInit: {
		token: string,
		twoFAStatus: string,
		step: number,
	},
	createSecret: {
		secret: string,
		token: string,
		inProgress: boolean,
		errors: string,
	},
	verifySecret: {
		wildcards: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	newSecret: {
		open: boolean,
		initiateInProgress: boolean,
		verifyInProgress: boolean,
		success: boolean,
		errors: string,
		secret: string,
	},
};

const initialState = (): StateT => ({
	is2FAOpen: false,
	isRecoveryOpen: false,
	isNewRecoveryCodeOpen: false,
	showRememberMe: false,
	inProgress: false,
	success: false,
	errors: '',
	twoFAInit: {
		token: '',
		twoFAStatus: '',
		step: 1,
	},
	createSecret: {
		secret: '',
		token: '',
		inProgress: false,
		errors: '',
	},
	verifySecret: {
		wildcards: [],
		inProgress: false,
		errors: '',
	},
	newSecret: {
		open: false,
		initiateInProgress: false,
		verifyInProgress: false,
		success: false,
		errors: '',
		secret: '',
	},
});

export default initialState;
