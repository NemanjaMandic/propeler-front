// @flow

type StateT = {
	info: {
		companyId: any,
		fundingGoals: any,
		marketImageUrl: string,
		maxEquityOffered: any,
		minEquityOffered: any,
		minInvestment: any,
		name: string,
		tagLine: string,
		timeToRaiseFunds: any,
		urlFriendlyName: string,
		topicStatus: {
			market: boolean,
			overview: boolean,
			problem: boolean,
			solution: boolean,
			risk_and_competition: boolean,
			traction: boolean,
			updates: boolean,
		},
		inProgress: boolean,
		errors: string,
	},
	activeCampaign: {
		exists: boolean,
		inProgress: boolean,
		errors: string,
	},
	createCampaign: {
		inProgress: boolean,
		step: number,
		errors: Object,
	},
	updateCampaign: {
		inProgress: boolean,
		errors: Object,
	},
	checkName: {
		inProgress: boolean,
		available: boolean,
		errors: string,
	},
	marketImage: {
		fileDto: {
			type: string,
			file: string,
		},
		inProgress: boolean,
		errors: string,
	},
	current_topic: {
		market: {
			content: Object,
		},
		overview: {
			content: Object,
		},
		problem: {
			content: Object,
		},
		solution: {
			content: Object,
		},
		risk_and_competition: {
			content: Object,
		},
		traction: {
			content: Object,
		},
		updates: {
			content: Object,
		},
	},
	overview: {
		content: string,
		inProgress: boolean,
	},
	problem: {
		content: string,
		inProgress: boolean,
	},
	risk_and_competition: {
		content: string,
		inProgress: boolean,
	},
	updates: {
		content: string,
		inProgress: boolean,
	},
	market: {
		content: string,
		inProgress: boolean,
	},
	traction: {
		content: string,
		inProgress: boolean,
	},
	solution: {
		content: string,
		inProgress: boolean,
	},
	createCampaignTopic: {
		inProgress: boolean,
		errors: Object,
	},
	updateCampaignTopic: {
		inProgress: boolean,
		errors: Object,
	},
	getCampaignTopic: {
		inProgress: boolean,
		errors: Object,
	},
	team: {
		inProgress: boolean,
		members: Array<Object>,
		error: string,
	},
	campaignOverview: {
		isOpen: boolean,
		hash: string,
	},
	currentInfo: {
		companyId: any,
		fundingGoals: any,
		marketImageUrl: string,
		maxEquityOffered: any,
		minEquityOffered: any,
		minInvestment: any,
		name: string,
		tagLine: string,
		timeToRaiseFunds: any,
		urlFriendlyName: string,
	},
	platformSettings: {
		settings: Array<Object>,
		inProgress: boolean,
		errors: string,
	},

	deleteCampaign: {
		inProgress: boolean,
		errors: string,
	},
	campaignSubmitForReview: {
		inProgress: boolean,
		errors: string,
		contract: {
			inProgress: boolean,
			signed: boolean,
			success?: boolean,
			url: string,
		},
	},
	getActiveCampaigns: {
		campaigns: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	getCompletedCampaigns: {
		campaigns: {
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
	},
	getAllCampaigns: {
		campaigns: {
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
	},
	documents: {
		content: Array<Object>,
		inProgress: boolean,
		errors: string,
	},
	documentActions: {
		docName: string,
		name: string,
		inProgress: boolean,
		errors: string,
		currentDocument: {
			file: string,
			type: string,
		},
	},
	campaignUpdates: {
		updates: {
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
		currentUpdate: {
			title: string,
			content: string,
			id: number,
			postDate: Date,
			campaignName: string,
			campaignUrlFriendlyName: string,
		},
		inProgress: boolean,
		errors: string,
	},
	requestForDocuments: {
		inProgress: boolean,
		errors: string,
		result: any,
	},
};

const initialState = (): StateT => ({
	info: {
		companyId: null,
		fundingGoals: null,
		marketImageUrl: '',
		maxEquityOffered: null,
		minEquityOffered: null,
		minInvestment: null,
		name: '',
		tagLine: '',
		timeToRaiseFunds: null,
		urlFriendlyName: '',
		topicStatus: {
			market: false,
			overview: false,
			problem: false,
			solution: false,
			risk_and_competition: false,
			traction: false,
			updates: false,
		},
		inProgress: false,
		errors: '',
	},
	activeCampaign: {
		inProgress: false,
		exists: false,
		errors: '',
	},
	createCampaign: {
		inProgress: false,
		step: 1,
		errors: {},
	},
	updateCampaign: {
		inProgress: false,
		errors: {},
	},
	checkName: {
		inProgress: false,
		available: false,
		errors: '',
	},
	marketImage: {
		fileDto: {
			type: '',
			file: '',
		},
		inProgress: false,
		errors: '',
	},
	current_topic: {
		market: {
			content: null,
		},
		overview: {
			content: null,
		},
		problem: {
			content: null,
		},
		solution: {
			content: null,
		},
		risk_and_competition: {
			content: null,
		},
		traction: {
			content: null,
		},
		updates: {
			content: null,
		},
	},
	overview: {
		content: '',
		inProgress: false,
	},
	problem: {
		content: '',
		inProgress: false,
	},
	risk_and_competition: {
		content: '',
		inProgress: false,
	},
	updates: {
		content: '',
		inProgress: false,
	},
	market: {
		content: '',
		inProgress: false,
	},
	traction: {
		content: '',
		inProgress: false,
	},
	solution: {
		content: '',
		inProgress: false,
	},
	createCampaignTopic: {
		inProgress: false,
		errors: {},
	},
	updateCampaignTopic: {
		inProgress: false,
		errors: {},
	},
	getCampaignTopic: {
		inProgress: false,
		errors: {},
	},
	team: {
		inProgress: false,
		members: [],
		error: '',
	},
	campaignOverview: {
		isOpen: false,
		hash: '',
	},
	currentInfo: {
		companyId: null,
		fundingGoals: null,
		marketImageUrl: '',
		maxEquityOffered: null,
		minEquityOffered: null,
		minInvestment: null,
		tagLine: '',
		name: '',
		timeToRaiseFunds: null,
		urlFriendlyName: '',
	},
	platformSettings: {
		settings: {
			platformCurrency: {
				code: '',
				name: '',
				symbol: '',
			},
		},
		inProgress: false,
		errors: '',
	},
	// currency: {
	//   data: {
	//     code: "",
	//     name: "",
	//     symbol: ""
	//   },
	//   inProgress: false,
	//   errors: ""
	// },
	deleteCampaign: {
		inProgress: false,
		errors: '',
	},
	campaignSubmitForReview: {
		inProgress: false,
		errors: '',
		contract: {
			inProgress: false,
			signed: false,
			url: '',
		},
	},
	getActiveCampaigns: {
		campaigns: [],
		inProgress: false,
		errors: '',
	},
	getCompletedCampaigns: {
		campaigns: {
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
		inProgress: false,
		errors: '',
	},
	getAllCampaigns: {
		campaigns: {
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
		inProgress: false,
		errors: '',
	},
	documents: {
		content: [],
		inProgress: false,
		errors: '',
	},
	documentActions: {
		docName: '',
		name: '',
		inProgress: false,
		errors: '',
		currentDocument: {
			file: '',
			type: '',
		},
	},
	campaignUpdates: {
		updates: {
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
		inProgress: false,
		currentUpdate: {
			title: '',
			content: '',
			id: null,
			postDate: null,
			campaignName: '',
			campaignUrlFriendlyName: '',
		},
		errors: '',
	},
	requestForDocuments: {
		inProgress: false,
		errors: '',
		result: null,
	},
});
export default initialState;
