import { createAction } from 'redux-actions';

// Get payments
export const GET_ALL_PAYMENTS = '[Payments] Get payments';
export const getAllPayments = createAction(GET_ALL_PAYMENTS);

export const GET_ALL_PAYMENTS_SUCCESS = `${GET_ALL_PAYMENTS} success`;
export const getAllPaymentsSuccess = createAction(GET_ALL_PAYMENTS_SUCCESS);

export const GET_ALL_PAYMENTS_FAIL = `${GET_ALL_PAYMENTS} fail`;
export const getAllPaymentsFail = createAction(GET_ALL_PAYMENTS_FAIL);

// Send Payment Confirmation
export const SEND_PAYMENT_CONFIRMATION = '[Payments] Send payment confirmation';
export const sendPaymentConfirmation = createAction(SEND_PAYMENT_CONFIRMATION);

export const SEND_PAYMENT_CONFIRMATION_SUCCESS = `${SEND_PAYMENT_CONFIRMATION} success`;
export const sendPaymentConfirmationSuccess = createAction(SEND_PAYMENT_CONFIRMATION_SUCCESS);

export const SEND_PAYMENT_CONFIRMATION_FAIL = `${SEND_PAYMENT_CONFIRMATION} fail`;
export const sendPaymentConfirmationFail = createAction(SEND_PAYMENT_CONFIRMATION_FAIL);

export const GET_PAYMENT_METHODS = '[Payments] Get payment methods';
export const getPaymentMethods = createAction(GET_PAYMENT_METHODS);

export const GET_PAYMENT_METHODS_SUCCESS = `${GET_PAYMENT_METHODS} success`;
export const getPaymentMethodsSuccess = createAction(GET_PAYMENT_METHODS_SUCCESS);

export const GET_PAYMENT_METHODS_FAIL = `${GET_PAYMENT_METHODS} fail`;
export const getPaymentMethodsFail = createAction(GET_PAYMENT_METHODS_FAIL);

export const GET_BANK_TRANSFER = '[Payments] Get bank transfer';
export const getBankTransfer = createAction(GET_BANK_TRANSFER);

export const GET_BANK_TRANSFER_SUCCESS = `${GET_BANK_TRANSFER} success`;
export const getBankTransferSuccess = createAction(GET_BANK_TRANSFER_SUCCESS);

export const GET_BANK_TRANSFER_FAIL = `${GET_BANK_TRANSFER} fail`;
export const getBankTransferFail = createAction(GET_BANK_TRANSFER_FAIL);

export const GET_CARD_PAYMENT = '[Payments] Get card payment';
export const getCardPayment = createAction(GET_CARD_PAYMENT);

export const GET_CARD_PAYMENT_SUCCESS = `${GET_CARD_PAYMENT} success`;
export const getCardPaymentSuccess = createAction(GET_CARD_PAYMENT_SUCCESS);

export const GET_CARD_PAYMENT_FAIL = `${GET_CARD_PAYMENT} fail`;
export const getCardPaymentFail = createAction(GET_CARD_PAYMENT_FAIL);

export const GET_PROFORMA_INVOICE = '[Payments] Get proforma invoice';
export const getProformaInvoice = createAction(GET_PROFORMA_INVOICE);

export const GET_PROFORMA_INVOICE_SUCCESS = `${GET_PROFORMA_INVOICE} success`;
export const getProformaInvoiceSuccess = createAction(GET_PROFORMA_INVOICE_SUCCESS);

export const GET_PROFORMA_INVOICE_FAIL = `${GET_PROFORMA_INVOICE} fail`;
export const getProformaInvoiceFail = createAction(GET_PROFORMA_INVOICE_FAIL);

// Get payment invoice
export const GET_PAYMENT_INVOICE = '[Payments] Get payment invoice';
export const getPaymentInvoice = createAction(GET_PAYMENT_INVOICE);

export const GET_PAYMENT_INVOICE_SUCCESS = `${GET_PAYMENT_INVOICE} success`;
export const getPaymentInvoiceSuccess = createAction(GET_PAYMENT_INVOICE_SUCCESS);

export const GET_PAYMENT_INVOICE_FAIL = `${GET_PAYMENT_INVOICE} fail`;
export const getPaymentInvoiceFail = createAction(GET_PAYMENT_INVOICE_FAIL);

// capture transaction:
export const CAPTURE_TRANSACTION = '[Payments] Capture transaction';
export const captureTransaction = createAction(CAPTURE_TRANSACTION);

export const CAPTURE_TRANSACTION_SUCCESS = `${CAPTURE_TRANSACTION} success`;
export const captureTransactionSuccess = createAction(CAPTURE_TRANSACTION_SUCCESS);

export const CAPTURE_TRANSACTION_FAIL = `${CAPTURE_TRANSACTION} fail`;
export const captureTransactionFail = createAction(CAPTURE_TRANSACTION_FAIL);

// clear payment
export const CLEAR_PAYMENT = '[Payments] Clear';
export const clearPayment = createAction(CLEAR_PAYMENT);
