// @flow

type StateT = {
	userCampaigns: {
		campaigns: Array<Object>,
		inProgress: boolean,
	},
	campaignDocuments: {
		content: Array<Object>,
		first: boolean,
		last: boolean,
		number: number,
		numberOfElements: number,
		pageable: {
			offset: number,
			pageNumber: number,
			pageSize: number,
			paged: boolean,
			sort: {
				sorted: boolean,
				unsorted: boolean,
			},
			unpaged: boolean,
		},
		size: number,
		sort: {
			sorted: boolean,
			unsorted: boolean,
		},
		totalElements: number,
		totalPages: number,
		inProgress: boolean,
		errors: string,
	},
	campaignsWithInvestments: {
		content: Array<Object>,
		first: boolean,
		last: boolean,
		number: number,
		numberOfElements: number,
		pageable: {
			offset: number,
			pageNumber: number,
			pageSize: number,
			paged: boolean,
			sort: {
				sorted: boolean,
				unsorted: boolean,
			},
			unpaged: boolean,
		},
		size: number,
		sort: {
			sorted: boolean,
			unsorted: boolean,
		},
		totalElements: number,
		totalPages: number,
		inProgress: boolean,
		errors: string,
	},
	documentRequest: {
		result: {
			campaign: any,
			requests: Array<Object>,
		},
		inProgress: boolean,
		errors: string,
	},
};

const initialState = (): StateT => ({
	userCampaigns: {
		campaigns: [],
		inProgress: false,
	},
	campaignDocuments: {
		content: [],
		first: true,
		last: true,
		number: 0,
		numberOfElements: 0,
		pageable: {
			offset: 0,
			pageNumber: 0,
			pageSize: 0,
			paged: true,
			sort: {
				sorted: true,
				unsorted: true,
			},
			unpaged: true,
		},
		size: 0,
		sort: {
			sorted: true,
			unsorted: true,
		},
		totalElements: 0,
		totalPages: 0,
		inProgress: false,
		errors: '',
	},
	campaignsWithInvestments: {
		content: [],
		first: true,
		last: true,
		number: 0,
		numberOfElements: 0,
		pageable: {
			offset: 0,
			pageNumber: 0,
			pageSize: 0,
			paged: true,
			sort: {
				sorted: true,
				unsorted: true,
			},
			unpaged: true,
		},
		size: 0,
		sort: {
			sorted: true,
			unsorted: true,
		},
		totalElements: 0,
		totalPages: 0,
		inProgress: false,
		errors: '',
	},
	documentRequest: {
		result: {
			campaign: null,
			requests: [],
		},
		inProgress: false,
		errors: '',
	},
});

export default initialState;
