// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { investDialog } from '../../state/modals/actions';
import Button from '../common/button/Button';
import Input from '../common/input/Input';
import Checkbox from '../common/checkbox/Checkbox';
import Tooltip from '../common/tooltip/Tooltip';
import { min, max, required } from '../../utilities/validators';
import { convertEquity, getAvailableInvestment, investInCampaign } from '../../state/investor/actions';

const styles = {
	paper: {
		margin: 'auto',
		overflowX: 'hidden',
		width: '700px',
		maxWidth: '700px',
	},
};

type PropsT = {
	open: boolean,
	inProgress: boolean,
	availableInvestment: {
		amount: number,
		equity: number,
	},
	initialValues: {
		minimalAmount: number,
		offered: string,
	},
	formValues: {
		amount: number,
		equity: number,
		acceptTerms: boolean,
	},
	campaign: {
		urlFriendlyName: string,
		maxEquityOffered: number,
		minEquityOffered: number,
		minInvestment: number,
	},
	investDialog: Function,
	handleSubmit: Function,
	convertEquity: Function,
	getAvailableInvestment: Function,
	investInCampaign: Function,
	classes: any,
	invalid: boolean,
};

const InvestDialog = (props: PropsT) => {
	const [t] = useTranslation('translations');
	const fieldOptions = (minimalAmount: number, availableInvestment: any) => [
		{
			name: 'amount',
			label: t('SET_AMOUNT'),
			validate: [
				required,
				value => min(value, minimalAmount, `${t('MIN_INV_AMOUNT')}${minimalAmount}`),
				value => max(value, availableInvestment.amount, `${t('MAX_INV_AMOUNT')}${availableInvestment.amount}`),
			],
		},
		{
			name: 'equity',
			label: t('SET_EQUITY'),
			validate: [
				required,
				value => max(value, availableInvestment.equity, `${t('MAX_EQUITY')}${availableInvestment.equity}`),
			],
		},
	];
	const {
		open,
		inProgress,
		availableInvestment,
		investDialog,
		handleSubmit,
		classes,
		convertEquity,
		getAvailableInvestment,
		investInCampaign,
		campaign,
		invalid,
		dispatch,
		reset,
	} = props;
	const { urlFriendlyName, minInvestment } = campaign;
	const [typingTimeout, setTypingTimeout] = useState();
	const [fields, setFields] = useState(fieldOptions(minInvestment, availableInvestment));

	const close = () => {
		investDialog({ open: false });
	};

	useEffect(() => {
		setFields(fieldOptions(minInvestment, availableInvestment));
	}, [minInvestment, availableInvestment]);

	useEffect(() => {
		if (open) {
			getAvailableInvestment({ urlFriendlyName });
		}
	}, [open]);

	const switchFields = () => {
		convertEquity({
			urlFriendlyName,
			field: fields[0].name,
			data: props.formValues[fields[1].name],
		});
		setFields([fields[1], fields[0]]);
	};

	const invest = data => {
		// TODO: 2FA
		investInCampaign({ urlFriendlyName, data });
		dispatch(reset('InvestDialogForm'));
	};

	const convert = (e: any) => {
		const field = fields[1].name;
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(setTimeout(() => convertEquity({ urlFriendlyName, field, data: e.target.value }), 500));
	};

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={open}
			className="invest-dialog"
			fullWidth={false}
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'investment-dialog-title'}>{t('INVEST_IN_THIS_OFFER')}</DialogTitle>
			<DialogContent className="investment_dialog_content">
				<form onSubmit={handleSubmit((data: *) => invest(data))}>
					<div className={'investment__form_fields'}>
						<Field name="minimalAmount" component={Input} label={t('MINIMAL_AMOUNT')} type="text" disabled />
						<Field name="offered" component={Input} label={t('EQUITY_OFFERED_PER')} type="text" disabled />
					</div>

					<div className={'investment__form_fields'}>
						<Field
							name={fields[0].name}
							component={Input}
							label={fields[0].label}
							type={'number'}
							min={0}
							onChange={convert}
							validate={fields[0].validate}
						/>
						<IconButton onClick={switchFields}>
							<SwapHoriz />
						</IconButton>
						<Field
							name={fields[1].name}
							component={Input}
							label={fields[1].label}
							type={'number'}
							readOnly
							disabled
							min={0}
						/>
					</div>

					<div className={'investment_anonymous_checkbox'}>
						<Field
							name="anonymous"
							component={Checkbox}
							className={'anonymous_checkbox'}
							label={
								<div className={'investment_tooltip__label'}>
									{t('SET_ME_AS_ANONYMOUS')}
									<Tooltip
										title={<div className={'investment_tooltip__text'}>{t('USE_AN_ANONYMOUS')}</div>}
										placement="right"
									>
										<i className="material-icons info_icon">{t('INFO')}</i>
									</Tooltip>
								</div>
							}
						/>
					</div>

					<div className={'investment_accept_terms'}>
						<Field
							name="acceptTerms"
							component={Checkbox}
							label={
								<label>
									{t('I_CONFIRM_THAT_UNDERSTAND')}
									<a
										href={'https://www.google.com/'}
										rel="noreferrer noopener"
										target="_blank"
										onClick={() => investDialog({ open: false })}
									>
										{t('THIS_WARNING')}
									</a>
									{t('WANT_INVEST_DESPITE')}
									<a
										href={'https://www.google.com/'}
										rel="noreferrer noopener"
										target="_blank"
										onClick={() => investDialog({ open: false })}
									>
										{t('FAQ')}
									</a>
								</label>
							}
						/>
					</div>
					<div className="investment-dialog-footer">
						<Button variant={'outlined'} color={'primary'} onClick={() => close()} name={t('CANCEL')} />
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={inProgress || invalid || !props.formValues.acceptTerms}
							name={t('INVEST')}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const selector = formValueSelector('InvestDialogForm');
const mapStateToProps = state => {
	const {
		modals: {
			investDialog: { open, inProgress, availableInvestment, campaign },
		},
	} = state;
	const formValues = selector(state, 'amount', 'equity', 'acceptTerms');
	return {
		open,
		inProgress,
		availableInvestment,
		initialValues: {
			minimalAmount: campaign.minInvestment,
			offered: `${campaign.minEquityOffered}% - ${campaign.maxEquityOffered}% ${
				availableInvestment.equity >= 0 ? `(${availableInvestment.equity}% left)` : ''
			}`,
		},
		formValues,
		campaign,
	};
};
export default compose(
	connect(
		mapStateToProps,
		{ investDialog, convertEquity, getAvailableInvestment, investInCampaign },
	),
	reduxForm({
		form: 'InvestDialogForm',
		enableReinitialize: true,
	}),
)(withStyles(styles)(InvestDialog));
