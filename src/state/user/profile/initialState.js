// @flow

type StateT = {
	inProgress: boolean,
	info: {
		address: string,
		city: string,
		countryOfResidence: string,
		countryForTaxation: string,
		email: string,
		firstName: string,
		id: number,
		lastName: string,
		phoneNumber: string,
		profilePictureUrl: string,
	},
	changePassword: {
		inProgress: boolean,
	},
	changeEmail: {
		inProgress: boolean,
	},
	changeUserProfile: {
		inProgress: boolean,
	},
	upload: {
		inProgress: boolean,
	},
	getProfilePhoto: {
		inProgress: boolean,
		fileDto: {
			type: string,
			file: string,
		},
	},
	deleteProfilePhoto: {
		inProgress: boolean,
	},
	recoveryCode: {
		wildcards: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	kycFrontPhoto: {
		inProgress: boolean,
		fileDto: {
			type: string,
			file: string,
			url: string,
		},
	},
	kycBackPhoto: {
		inProgress: boolean,
		fileDto: {
			type: string,
			file: string,
			url: string,
		},
	},
	kycRequestAction: {
		inProgress: boolean,
	},
	kycCompanyInvestorDocument: {
		inProgress: boolean,
		files: Array<{
			type: string,
			file: string,
			url: string,
			name: string,
		}>,
	},
	kycCurrentUser: {
		auditorId: number,
		companyId: number,
		companyName: string,
		firstName: string,
		id: number,
		lastName: string,
		politicallyExposed: boolean,
		rejectionReason: string,
		requestState: string,
		userDocuments: Array<Object>,
		userId: number,
		userName: string,
		userRole: string,
		files: Array<Object>,
	},
	errors: Object,
};

const initialState = (): StateT => ({
	inProgress: false,
	info: {
		address: '',
		city: '',
		countryOfResidence: '',
		countryForTaxation: '',
		email: '',
		firstName: '',
		id: 0,
		lastName: '',
		phoneNumber: '',
		profilePictureUrl: '',
	},
	changePassword: {
		inProgress: false,
	},
	changeEmail: {
		inProgress: false,
	},
	changeUserProfile: {
		inProgress: false,
	},
	upload: {
		inProgress: false,
	},
	getProfilePhoto: {
		inProgress: false,
		fileDto: {
			type: '',
			file: '',
		},
	},
	deleteProfilePhoto: {
		inProgress: false,
	},
	recoveryCode: {
		wildcards: [],
		inProgress: false,
		errors: '',
	},
	kycFrontPhoto: {
		inProgress: false,
		fileDto: {
			type: '',
			file: '',
			url: '',
		},
	},
	kycBackPhoto: {
		inProgress: false,
		fileDto: {
			type: '',
			file: '',
			url: '',
		},
	},
	kycRequestAction: {
		inProgress: false,
	},
	kycCompanyInvestorDocument: {
		inProgress: false,
		files: [],
	},
	kycCurrentUser: {
		auditorId: 0,
		companyId: 0,
		companyName: '',
		firstName: '',
		id: 0,
		lastName: '',
		politicallyExposed: null,
		rejectionReason: '',
		requestState: '',
		userDocuments: [],
		userId: 0,
		userName: '',
		userRole: '',
		files: [],
	},
	errors: {},
});

export default initialState;
