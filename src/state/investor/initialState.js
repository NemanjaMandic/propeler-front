// @flow

type StateT = {
	updates: {
		data: Object,
		inProgress: boolean,
		errors: string,
	},
	portfolio: {
		inProgress: boolean,
		content: Array<Object>,
		totalPages: number,
		last: boolean,
		totalElements: number,
		sort: { sorted: boolean, unsorted: boolean },
		pageable: {
			offset: number,
			pageNumber: number,
			pageSize: number,
			paged: boolean,
			unpaged: boolean,
		},
		numberOfElements: number,
		first: boolean,
		size: number,
		number: number,
	},
};

const initialState = (): StateT => ({
	portfolio: {
		inProgress: false,
		content: [],
		totalPages: 0,
		last: true,
		totalElements: 0,
		sort: { sorted: false, unsorted: true },
		pageable: {
			offset: 0,
			pageNumber: 0,
			pageSize: 20,
			paged: true,
			unpaged: false,
		},
		numberOfElements: 0,
		first: true,
		size: 5,
		number: 0,
	},
	updates: {
		data: null,
		inProgress: false,
		errors: '',
	},
});

export default initialState;
