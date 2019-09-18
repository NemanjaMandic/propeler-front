// @flow

import * as actions from './actions';
import initialState from './initialState';

type ActionT = {
	type: string,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;

	switch (type) {
		case actions.GET_ALL_PAYMENTS:
			return {
				...state,
				allPayments: {
					...state.allPayments,
					inProgress: true,
				},
			};

		case actions.GET_ALL_PAYMENTS_SUCCESS:
			return {
				...state,
				allPayments: {
					...state.allPayments,
					data: payload,
					inProgress: false,
				},
			};

		case actions.GET_ALL_PAYMENTS_FAIL:
			return {
				...state,
				allPayments: {
					...state.allPayments,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.SEND_PAYMENT_CONFIRMATION:
			return {
				...state,
				sendPayment: {
					...state.sendPayment,
					inProgress: true,
				},
			};

		case actions.SEND_PAYMENT_CONFIRMATION_SUCCESS:
			return {
				...state,
				sendPayment: {
					...state.sendPayment,
					inProgress: false,
					data: payload,
				},
			};

		case actions.SEND_PAYMENT_CONFIRMATION_FAIL:
			return {
				...state,
				sendPayment: {
					...state.sendPayment,
					inProgress: false,
					errors: payload,
				},
			};

		case actions.GET_PAYMENT_METHODS:
			return {
				...state,
				availableMethods: {
					...state.availableMethods,
					inProgress: true,
				},
				payment: initialState().payment,
			};
		case actions.GET_PAYMENT_METHODS_SUCCESS:
			return {
				...state,
				availableMethods: {
					...state.availableMethods,
					inProgress: false,
					methods: payload,
				},
			};
		case actions.GET_PAYMENT_METHODS_FAIL:
			return {
				...state,
				availableMethods: {
					...state.availableMethods,
					inProgress: false,
					methods: [],
				},
			};
		case actions.GET_BANK_TRANSFER:
		case actions.GET_CARD_PAYMENT:
			return {
				...state,
				payment: {
					...initialState().payment,
					inProgress: true,
				},
			};
		case actions.GET_BANK_TRANSFER_SUCCESS:
		case actions.GET_CARD_PAYMENT_SUCCESS:
			return {
				...state,
				payment: {
					...state.payment,
					inProgress: false,
					data: payload,
				},
			};
		case actions.GET_BANK_TRANSFER_FAIL:
		case actions.GET_CARD_PAYMENT_FAIL:
			return {
				...state,
				payment: {
					...initialState().payment,
					error: true,
				},
			};
		case actions.GET_PROFORMA_INVOICE:
			return {
				...state,
				payment: {
					...state.payment,
					proformaInvoice: {
						...initialState().payment.proformaInvoice,
						inProgress: true,
					},
				},
			};
		case actions.GET_PROFORMA_INVOICE_SUCCESS:
			return {
				...state,
				payment: {
					...state.payment,
					proformaInvoice: {
						inProgress: false,
						document: payload,
					},
				},
			};
		case actions.GET_PROFORMA_INVOICE_FAIL:
			return {
				...state,
				payment: {
					...state.payment,
					proformaInvoice: {
						...state.payment.proformaInvoice,
						inProgress: false,
					},
					error: true,
				},
			};

		case actions.GET_PAYMENT_INVOICE:
			return {
				...state,
				payment: {
					...state.payment,
					paymentInvoice: {
						...initialState().payment.paymentInvoice,
						inProgress: true,
					},
				},
			};

		case actions.GET_PAYMENT_INVOICE_SUCCESS:
			return {
				...state,
				payment: {
					...state.payment,
					paymentInvoice: {
						inProgress: false,
						document: payload,
					},
				},
			};
		case actions.GET_PAYMENT_INVOICE_FAIL:
			return {
				...state,
				payment: {
					...state.payment,
					paymentInvoice: {
						...state.payment.paymentInvoice,
						inProgress: false,
					},
					error: true,
				},
			};
		case actions.CAPTURE_TRANSACTION:
			return {
				...state,
				payment: {
					...state.payment,
					payPal: {
						orderId: payload.orderId,
						investmentId: payload.investmentId,
						captured: false,
						inProgress: true,
					},
				},
			};
		case actions.CAPTURE_TRANSACTION_SUCCESS:
			return {
				...state,
				payment: {
					...state.payment,
					payPal: {
						captured: true,
						inProgress: false,
					},
				},
			};
		case actions.CAPTURE_TRANSACTION_FAIL:
			return {
				...state,
				payment: {
					...state.payment,
					payPal: {
						captured: false,
						inProgress: false,
					},
				},
			};
		case actions.CLEAR_PAYMENT:
			return {
				...state,
				payment: initialState().payment,
			};
		default:
			return state;
	}
};
