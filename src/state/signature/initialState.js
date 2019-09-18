// @flow

type StateT = {
	kp: {
		inProgress: boolean,
		body: Object,
	},
	publicKeys: {
		inProgress: boolean,
		keys: Object,
	},
	signedDocument: {
		inProgress: boolean,
		document: Object,
		phase: number,
	},
	contracts: {
		inProgress: boolean,
		documents: Array<Object>,
	},
};

const initialState = (): StateT => ({
	kp: {
		inProgress: false,
		body: null,
	},
	publicKeys: {
		inProgress: false,
		keys: {},
	},
	signedDocument: {
		inProgress: false,
		document: null,
		phase: 0,
	},
	contracts: {
		documents: [],
		inProgress: false,
	},
});

export default initialState;
