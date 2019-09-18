import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Warning from '@material-ui/icons/Warning';
import SmartPaymentButtons, { PayPalSDKWrapper } from 'react-smart-payment-buttons';
import Button from '../../common/button/Button';
import { INVESTOR_DASHBOARD } from '../../../constants/routes';
import visa from '../../../images/investment_icons/visa.svg';
import visaGray from '../../../images/investment_icons/visa-gray.svg';
import master from '../../../images/investment_icons/master.svg';
import masterGray from '../../../images/investment_icons/master-gray.svg';
import dina from '../../../images/investment_icons/dina.svg';
import dinaGray from '../../../images/investment_icons/dina-gray.svg';
import bank from '../../../images/investment_icons/bank.svg';
import bankGray from '../../../images/investment_icons/bank-gray.svg';
import {
	getPaymentMethods,
	getBankTransfer,
	getCardPayment,
	captureTransaction,
	clearPayment,
} from '../../../state/payment/actions';
import { getPlatformSettings } from '../../../state/campaign/actions';
import PageNotFound from '../../common/pageNotFound/PageNotFound';
import { fileDownload } from '../../../utilities/downloader';

type PropsT = {
	history: any,
	availableMethods: {
		inProgress: boolean,
		methods: Array<string>,
	},
	getPaymentMethods: Function,
	getBankTransfer: Function,
	getCardPayment: Function,
	payment: any,
	getPlatformSettings: Function,
};

const ppClientId = 'ARPDjavo9_Oj8ZEZABvlfV28LRH5veb-3WdLaD7ypL7XoK7tKCnYTIv_MRiUigymEJSiNdI-EA_du7Ud';

const Payment = ({
	history,
	match,
	payment,
	availableMethods,
	getPaymentMethods,
	getBankTransfer,
	getCardPayment,
	platformCurrency,
	captureTransaction,
	getPlatformSettings,
	clearPayment,
}: PropsT) => {
	const [t] = useTranslation('translations');
	const [selected, setSelected] = useState();
	const [payPalTransactionDetails, setPPDetails] = useState(null);
	const { document } = payment.proformaInvoice;
	const [investmentId, setInvestmentId] = useState(undefined);

	useEffect(() => {
		match.params.id && getPaymentMethods(match.params.id);
		match.params.id && getBankTransfer({ id: match.params.id, invoice: false });
		setInvestmentId(match.params.id);
		if (!platformCurrency.code) getPlatformSettings();
	}, []);

	const methods = {
		'Bank transfer': {
			action: getBankTransfer,
			images: [{ color: bank, gray: bankGray }],
		},
		Card: {
			action: getCardPayment,
			images: [{ color: master, gray: masterGray }, { color: visa, gray: visaGray }, { color: dina, gray: dinaGray }],
		},
	};

	const renderSuccess = () => {
		return (
			<>
				<CheckCircle style={{ color: '#1CCD77' }} />
				<div style={{ width: 400 }}>
					A pro-forma invoice has been sent to your e-mail address. You may also&nbsp;
					<span className={'upload__link'} onClick={() => fileDownload(document, 'Proforma_Invoice.pdf')}>
						download
					</span>
					&nbsp;your pro-forma invoice from your account at any time.
				</div>
			</>
		);
	};

	const renderPayPalSuccess = () => {
		return (
			<>
				<CheckCircle style={{ color: '#1CCD77' }} />
				<div style={{ width: 400 }}>
					Invoice has been sent to your e-mail address. You may also&nbsp;
					<span className={'upload__link'} onClick={() => fileDownload(document, 'Invoice.pdf')}>
						download
					</span>
					&nbsp;your invoice from your account at any time.
				</div>
			</>
		);
	};

	const renderError = () => {
		return (
			<>
				<Warning style={{ color: '#FA3877' }} />
				<div style={{ width: 350 }}>
					An error occurred! Please{' '}
					<span
						className={'upload__link'}
						onClick={() => {
							clearPayment();
							setPPDetails(null);
							getBankTransfer({ id: match.params.id, invoice: true });
						}}
					>
						try again
					</span>{' '}
					or contact our customer&nbsp;
					<span className={'upload__link'} onClick={() => console.log('')}>
						support service
					</span>
					.
				</div>
			</>
		);
	};

	const renderResponse = () => {
		if (payment.proformaInvoice.inProgress) return <CircularProgress size={30} style={{ margin: 20 }} />;
		return !payment.proformaInvoice.error ? renderSuccess() : renderError();
	};

	const renderPayPalResponse = () => {
		if (payment.payPal && payment.payPal.inProgress) return <CircularProgress size={30} style={{ margin: 20 }} />;
		return payment.payPal && payment.payPal.captured ? renderPayPalSuccess() : renderError();
	};

	const selectMethod = method => {
		methods[method].action({ id: match.params.id, invoice: true });
		setSelected(method);
	};

	const createPayPalOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: payment.data.amount,
					},
				},
			],
		});
	};

	const onPayPalApprove = (data, actions) => {
		const { orderID } = data;
		setPPDetails({ orderID });
		captureTransaction({ investmentId, orderID });
	};

	if (!match.params.id) return <PageNotFound />;
	return (
		<div className={'investor-payment-options'}>
			{(!payPalTransactionDetails || !payment.data) && (
				<div className="payment-options-title">{t('PAYMENT_OPTIONS')}</div>
			)}
			<div style={{ textAlign: 'center', color: '#9498B8' }}>
				{!payPalTransactionDetails && 'For making an investment pick a preferred payment method.'}
				<div className={'box-option-wrapper'}>
					{availableMethods.inProgress ? (
						<CircularProgress />
					) : (
						!payPalTransactionDetails &&
						availableMethods.methods.map(method => {
							if (method !== 'PayPal')
								return (
									<div
										key={method}
										className={`box-option${selected === method ? ' active' : ''}`}
										onClick={() => selectMethod(method)}
									>
										<div className={'payment-icon-wrapper'}>
											{methods[method] &&
												methods[method].images.map((image, i) => (
													<img src={selected === method ? image.color : image.gray} alt={''} key={i} />
												))}
										</div>
										<span>{t(method)}</span>
									</div>
								);
							return (
								<div style={{ minWidth: 230, paddingLeft: 30 }} key={method}>
									{payment.data && !payPalTransactionDetails && platformCurrency.code && (
										<PayPalSDKWrapper clientId={ppClientId} currency={platformCurrency.code}>
											<SmartPaymentButtons createOrder={createPayPalOrder} onApprove={onPayPalApprove} />
										</PayPalSDKWrapper>
									)}
								</div>
							);
						})
					)}
				</div>

				<div className={'bank-type-success'}>
					{selected === 'Bank transfer' && payment.data && !payPalTransactionDetails && renderResponse()}
				</div>
				{payPalTransactionDetails && <div className={'bank-type-success'}>{renderPayPalResponse()}</div>}
				<div className="investment-dialog-footer">
					<div className={'upload__link'} onClick={() => history.push(INVESTOR_DASHBOARD)} style={{ fontSize: 16 }}>
						Back to dashboard
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = ({
	payment: { availableMethods, payment },
	campaign: {
		platformSettings: {
			settings: { platformCurrency },
		},
	},
}) => ({
	payment,
	availableMethods,
	platformCurrency,
});

export default connect(
	mapStateToProps,
	{
		getPaymentMethods,
		getBankTransfer,
		getCardPayment,
		captureTransaction,
		getPlatformSettings,
		clearPayment,
	},
)(Payment);
