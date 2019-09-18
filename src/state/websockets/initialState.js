// @flow

type StateT = {
	isConnected: boolean,
	inProgress: boolean,
	errors: ?string,
};

const initialState = (): StateT => ({
	isConnected: false,
	inProgress: false,
	errors: '',
});

export default initialState;
