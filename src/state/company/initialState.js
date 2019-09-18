// @flow

type StateT = {
	info: {
		address: string,
		bankAccount: string,
		city: string,
		companyCategory: {
			id: number,
			name: string,
		},
		county: string,
		featuredImageUrl: string,
		id: number,
		logoUrl: string,
		name: string,
		ownerId: number,
		taxIdentifier: string,
		website: string,
		linkedinUrl: string,
		facebookUrl: string,
		twitterUrl: string,
		inProgress: boolean,
		errors: string,
	},
	createCompany: {
		inProgress: boolean,
		step: number,
		errors: Object,
	},
	reviewCompany: {
		inProgress: boolean,
		errors: string,
	},
	updateExternalLinks: {
		inProgress: boolean,
		errors: string,
	},
	logo: {
		fileDto: {
			type: string,
			file: string,
		},
		inProgress: boolean,
		errors: string,
	},
	featuredImage: {
		fileDto: {
			type: string,
			file: string,
		},
		inProgress: boolean,
		errors: string,
	},
	updateCompany: {
		inProgress: boolean,
		errors: string,
	},
	shareHolders: {
		inProgress: boolean,
		shareHolders: Array<Object>,
		error: string,
	},
	documents: {
		content: Array<Object>,
		overview_content: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	documentActions: {
		inProgress: boolean,
		errors: string,
	},
};

const initialState = (): StateT => ({
	info: {
		address: '',
		bankAccount: '',
		city: '',
		companyCategory: {
			id: 0,
			name: '',
		},
		county: '',
		featuredImageUrl: '',
		id: 0,
		logoUrl: '',
		name: '',
		ownerId: 0,
		taxIdentifier: '',
		website: '',
		linkedinUrl: '',
		facebookUrl: '',
		twitterUrl: '',
		inProgress: false,
		errors: '',
	},
	createCompany: {
		inProgress: false,
		step: 1,
		errors: {},
	},
	reviewCompany: {
		inProgress: false,
		errors: '',
	},
	updateExternalLinks: {
		inProgress: false,
		errors: '',
	},
	logo: {
		fileDto: {
			type: '',
			file: '',
		},
		inProgress: false,
		errors: '',
	},
	featuredImage: {
		fileDto: {
			type: '',
			file: '',
		},
		inProgress: false,
		errors: '',
	},
	updateCompany: {
		inProgress: false,
		errors: '',
	},
	shareHolders: {
		inProgress: false,
		shareHolders: [],
		error: '',
	},
	documents: {
		content: [],
		overview_content: [],
		inProgress: false,
		errors: '',
	},
	documentActions: {
		inProgress: false,
		errors: '',
	},
});

export default initialState;
