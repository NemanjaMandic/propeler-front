// @flow

type StateT = {
	allPayments: {
		data: {
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
		},
		inProgress: boolean,
		errors: string,
	},
	availableMethods: {
		inProgress: boolean,
		methods: Array<String>,
	},
	payment: {
		inProgress: boolean,
		data?: {
			bankTransferPaymentId?: number,
			cardPaymentId?: number,
			investmentId: number,
			amount: number,
			currency: string,
			creationDate: Date,
			paymentDate: Date,
			accountNumber?: string,
			routingNumber?: string,
			proformaInvoiceUrl?: string,
			sessionToken?: string,
		},
		proformaInvoice: {
			inProgress: boolean,
			document?: any,
		},
		paymentInvoice: {
			inProgress: boolean,
			document?: any,
		},
		payPal?: {
			orderId: string,
			investmentId: string,
			captured: boolean,
			inProgress: boolean,
		},
		error: boolean,
	},
};

const initialState = (): StateT => ({
	allPayments: {
		data: {
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
		},
		inProgress: false,
		errors: '',
	},
	availableMethods: {
		inProgress: false,
		methods: [],
	},
	bankTransfer: {
		inProgress: false,
		bankTransferPaymentId: 0,
		investmentId: 0,
		amount: 0,
		currency: '',
		creationDate: '',
		paymentDate: '',
		accountNumber: '',
		routingNumber: '',
		proformaInvoiceUrl: '',
	},
	payment: {
		inProgress: false,
		proformaInvoice: {
			inProgress: false,
		},
		paymentInvoice: {
			inProgress: false,
		},
		error: false,
	},
});

export default initialState;
