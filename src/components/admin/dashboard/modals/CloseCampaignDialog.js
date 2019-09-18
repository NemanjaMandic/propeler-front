// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import CloseIcon from '@material-ui/icons/Close';
import * as colors from '../../../../styles/modules/colors.scss';
import Button from '../../../common/button/Button';
import { closeCloseCampaignDialog } from '../../../../state/modals/actions';
import Input from '../../../common/input/Input';
import Radio from '@material-ui/core/Radio';

type PropsT = {
	open: boolean,
	campaign: Object,
	closeCloseCampaignDialog: Function,
};

const campaignR = {
	SUCCESSFULL: 0,
	UNSUCCESSFULL: 1,
	UNSELECTED: 2,
};

const styles = {
	paper: {
		maxWidth: 'none',
		minHeight: 'none',
		width: '500px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
		marginTop: '50px',
	},
	content: {
		overflow: 'auto',
	},
	actions: {
		margin: '20px 4px 40px 4px',
		justifyContent: 'center',
	},
	icon: {
		width: 20,
		height: 20,
	},
	button: {
		float: 'right',
		padding: 15,
		position: 'absolute',
		top: 0,
		right: 0,
	},
};

const CloseCampaignDialog = (props: PropsT) => {
	const [t] = useTranslation('translations');
	const [selected, setSelected] = useState(campaignR.UNSELECTED);
	const [closingReason, setClosingReason] = useState('');
	const [validationError, setValidationError] = useState('');

	const { open, campaign, closeCloseCampaignDialog, classes } = props;

	useEffect(() => {
		setSelected(campaignR.UNSELECTED);
		setClosingReason('');
		setValidationError('');
	}, [open]);

	const handleChange = e => setClosingReason(e.target.value);

	const endCampaign = () => {
		// TODO: send to BE
		console.log('Campaign to be closed:', campaign);
		console.log('Successfull? ', selected === campaignR.SUCCESSFULL);
		console.log('Closing reason: ', closingReason);

		closeCloseCampaignDialog();
	};

	return (
		<Dialog
			open={open}
			onClose={closeCloseCampaignDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title app_review_title'}>
				<span>{t('CAMPAIGN_ENDING_TITLE')}</span>
				<IconButton onClick={closeCloseCampaignDialog} classes={{ root: classes.button }}>
					<CloseIcon classes={{ root: classes.icon }} />
				</IconButton>
			</DialogTitle>
			<DialogContent classes={{ root: classes.content }}>
				<div
					style={{
						width: '70%',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					{t('CAMPAIGN_ENDING_SUBTITLE')}
				</div>
				<div className={'box-option-wrapper'}>
					<div
						key="campaign-successfull"
						className={`box-option${selected === campaignR.SUCCESSFULL ? ' green' : ''}`}
						onClick={() => setSelected(campaignR.SUCCESSFULL)}
					>
						<Radio
							checked={selected === campaignR.SUCCESSFULL}
							style={{
								color: selected === campaignR.SUCCESSFULL ? '#1CCD77' : '#D0D1DA',
								position: 'relative',
								left: -85,
								top: -25,
							}}
						/>
						<div style={{ position: 'relative', bottom: 45 }}>
							<div className={'payment-icon-wrapper'}>
								<ThumbUp />
							</div>
							<span>{t('CAMPAIGN_SUCCESSFULL')}</span>
						</div>
					</div>
					<div
						key="campaign-unsuccessfull"
						className={`box-option${selected === campaignR.UNSUCCESSFULL ? ' red' : ''}`}
						onClick={() => setSelected(campaignR.UNSUCCESSFULL)}
					>
						<Radio
							checked={selected === campaignR.UNSUCCESSFULL}
							style={{
								color: selected === campaignR.UNSUCCESSFULL ? '#FA3877' : '#D0D1DA',
								position: 'relative',
								left: -85,
								top: -25,
							}}
						/>
						<div style={{ position: 'relative', bottom: 45 }}>
							<div className={'payment-icon-wrapper'}>
								<ThumbDown />
							</div>
							<span>{t('CAMPAIGN_UNSUCCESSFULL')}</span>
						</div>
					</div>
				</div>
				{
					<Input
						name={'rejectionReason'}
						multiline
						rows="8"
						label={t('TYPE_EXPLANATION_NOTE')}
						type="text"
						maxLength={250}
						meta={{
							touched: validationError,
							invalid: validationError,
							error: validationError,
						}}
						onChange={handleChange}
						disabled={selected === campaignR.UNSELECTED}
					/>
				}
			</DialogContent>

			<DialogActions classes={{ root: classes.actions }}>
				<div className={'app_form_buttons'}>
					<Button
						type={'button'}
						variant={'outlined'}
						color={'primary'}
						name={t('CANCEL')}
						onClick={closeCloseCampaignDialog}
					/>
					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						name={t('END')}
						disabled={closingReason.length === 0 || selected === campaignR.UNSELECTED}
						onClick={() => endCampaign()}
					/>
				</div>
			</DialogActions>
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			closeCampaignDialog: { open, campaign },
		},
	} = state;
	return {
		open,
		campaign,
	};
};

export default connect(
	mapStateToProps,
	{
		closeCloseCampaignDialog,
	},
)(withStyles(styles)(CloseCampaignDialog));
