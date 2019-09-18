// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles, CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import File from '@material-ui/icons/InsertDriveFileOutlined';
import * as colors from '../../../../styles/modules/colors.scss';
import Button from '../../../common/button/Button';
import {
	closeFundraisingAppReview,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';
import ApplicationForm from '../../../fundrisingApplication/partials/ApplicationForm';
import Input from '../../../common/input/Input';
import {
	getFundrisingApplicationsDocuments,
	acceptFundrisingApplication,
	rejectFundrisingApplication,
	downloadFundraisingAppDocument,
} from '../../../../state/admin/actions';
import dummyContract from '../../../../constants/dummyContract';
import { getDocumentSuccess, getDocument } from '../../../../state/campaign/actions';

type PropsT = {
	open: boolean,
	classes: {
		paper: any,
		title: any,
		content: any,
		actions: any,
		icon: any,
		button: any,
	},
	closeFundraisingAppReview: Function,
	viewOnly: boolean,
	review: any,
	getFundrisingApplicationsDocuments: Function,
	fundrisingApplicationsDocuments: any,
	acceptFundrisingApplication: Function,
	rejectFundrisingApplication: Function,
	getDocumentSuccess: Function,
	openModalCampaignDocumentPreview: Function,
	closeModalCampaignDocumentPreview: Function,
};

const styles = {
	paper: {
		maxWidth: 'none',
		minHeight: 'none',
		width: '1000px',
		height: '1000px',
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

const FundRaisingAppReview = (props: PropsT) => {
	const [t] = useTranslation('translations');

	const {
		open,
		closeFundraisingAppReview,
		classes,
		viewOnly,
		review,
		fundrisingApplicationsDocuments,
		getFundrisingApplicationsDocuments,
		acceptFundrisingApplication,
		rejectFundrisingApplication,
		getDocumentSuccess,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
		downloadFundraisingAppDocument,
		downloadProgress,
	} = props;
	const [rejectionMessage, setRejectionMessage] = useState('');
	const [errorMsg, setErrorMsg] = useState(false);
	const errorMsgText = 'Cannot enter more than 250 characters.';

	const handleChange = (event: any) => {
		setRejectionMessage(event.target.value);
		rejectionMessage.length >= 250 ? setErrorMsg(true) : setErrorMsg(false);
	};

	const signAndApprove = () => {
		getDocumentSuccess({ type: 'pdf', file: dummyContract });
		openModalCampaignDocumentPreview({
			title: t('INITIAL_AGREEMENT'),
			signAction: () => {
				acceptFundrisingApplication({ fundraisingProposalId: review.id });
				closeModalCampaignDocumentPreview();
			},
		});
	};

	const submit = (approve: boolean) => {
		if (approve) {
			signAndApprove();
		} else {
			rejectFundrisingApplication({
				fundraisingProposalId: review.id,
				reason: rejectionMessage,
			});
		}
		setRejectionMessage('');
		closeFundraisingAppReview();
	};

	useEffect(() => {
		review && getFundrisingApplicationsDocuments({ fundraisingProposalId: review.id });
	}, [review]);

	const renderDocument = (document: any) => {
		return (
			<div
				key={document.url}
				onClick={() => {
					!downloadProgress && downloadFundraisingAppDocument(document);
				}}
			>
				{downloadProgress ? <CircularProgress size={18} /> : <File />}
				<span className={'app_form_submitted_doc_doc_title'} style={{ paddingLeft: 5 }}>
					{document.title}
				</span>
			</div>
		);
	};

	return (
		<Dialog
			open={open}
			onClose={closeFundraisingAppReview}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title app_review_title'}>
				<span>{'Campaign application form'}</span>
				<IconButton onClick={closeFundraisingAppReview} classes={{ root: classes.button }}>
					<CloseIcon classes={{ root: classes.icon }} />
				</IconButton>
			</DialogTitle>
			<DialogContent classes={{ root: classes.content }}>
				<ApplicationForm review />
				<div className={'app_form_submitted_doc'}>
					<span>Submitted documents</span>
					{fundrisingApplicationsDocuments && fundrisingApplicationsDocuments.data.map(doc => renderDocument(doc))}
				</div>
				{!viewOnly && (
					<Input
						name={'tagLine'}
						multiline
						rows="8"
						label={t('REJECT_MSG')}
						type="text"
						maxLength={250}
						meta={{ touched: errorMsg, invalid: errorMsg, error: errorMsgText }}
						onChange={handleChange}
					/>
				)}
			</DialogContent>

			<DialogActions classes={{ root: classes.actions }}>
				{viewOnly ? (
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						onClick={closeFundraisingAppReview}
						name={`Close`}
					/>
				) : (
					<div className={'app_form_buttons'}>
						<Button
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							name={t('REJECT')}
							disabled={!rejectionMessage}
							onClick={() => submit(false)}
						/>
						<Button
							type={'submit'}
							variant="contained"
							color={'primary'}
							name={t('APPROVE')}
							onClick={() => submit(true)}
						/>
					</div>
				)}
			</DialogActions>
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			fundraisingAppReview: { open, viewOnly, review },
		},
		admin: {
			fundrisingApplicationsDocuments,
			fundrisingAppDocumentDownload: { inProgress: downloadProgress },
		},
	} = state;
	return {
		open,
		viewOnly,
		fundrisingApplicationsDocuments,
		review,
		downloadProgress,
	};
};

export default connect(
	mapStateToProps,
	{
		closeFundraisingAppReview,
		getFundrisingApplicationsDocuments,
		acceptFundrisingApplication,
		rejectFundrisingApplication,
		getDocumentSuccess,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
		downloadFundraisingAppDocument,
	},
)(withStyles(styles)(FundRaisingAppReview));
