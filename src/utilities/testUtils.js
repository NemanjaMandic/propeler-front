// @flow

type UtilT = {
	testName: string,
	moduleMocks: any,
	getState: Function,
	getReducer: Function,
	expectedActions: Object,
};

export const testReducer = ({
	testName,
	moduleMocks = [],
	getState = f => f,
	getReducer = f => f,
	expectedActions = {},
}: UtilT) => {
	moduleMocks.forEach(({ path, recordedMock }) => {
		jest.doMock(path, () => recordedMock.mock);
	});

	const actionTypes = Object.keys(expectedActions);
	const state = getState();
	const reducer = getReducer();

	actionTypes.forEach(actionType => {
		test(`${testName} - ${actionType}`, () => {
			const { expectedStateDiff, payload } = expectedActions[actionType];
			const result = reducer(state, { type: actionType, payload });

			const stateDiff = typeof expectedStateDiff === 'function' ? expectedStateDiff(state) : expectedStateDiff;
			expect(result).toEqual({ ...state, ...stateDiff });
		});
	});
};
