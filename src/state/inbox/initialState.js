// @flow

type StateT = {
	getAllNotifications: {
		notifications: {
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
		inProgress: boolean,
		errors: string,
		unread: number,
		currentMessage: any,
	},
};

const initialState = (): StateT => ({
	getAllNotifications: {
		notifications: {
			content: [],
			totalPages: 1,
			last: true,
			totalElements: 0,
			sort: { sorted: false, unsorted: true },
			pageable: {
				offset: 0,
				pageNumber: 0,
				pageSize: 10,
				paged: true,
				unpaged: false,
			},
			numberOfElements: 0,
			first: true,
			size: 10,
			number: 0,
		},
		inProgress: false,
		errors: '',
		unread: 0,
		currentMessage: null,
	},
});
export default initialState;
