// @flow

type StateT = {
	documentTypes: {
		data: Object,
		inProgress: boolean,
		errors: string,
	},
	tweaker: boolean,
};

const initialState = (): StateT => ({
	documentTypes: {
		data: {},
		inProgress: false,
		errors: '',
	},
	tweaker: true,
});

export default initialState;
