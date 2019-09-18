// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import * as colors from '../../../../styles/modules/colors.scss';
import Button from '../../../common/button/Button';
import { getFileURI } from '../../../../utilities/downloader';
import {
	closeModalCampaignDocumentPreview,
	openDocumentSigningDialog,
	confirmModal,
} from '../../../../state/modals/actions';
import { getRegisteredKey } from '../../../../state/signature/actions';
import { history } from '../../../../store/configureStore';
import { useDigitalSignatures } from '../../../../constants/digitalSignatures';

type PropsT = {
	open: boolean,
	classes: {
		paper: any,
		title: any,
		content: any,
		actions: any,
	},
	document: any,
	title?: string,
	text?: string,
	signAction?: Function,
	inProgress: boolean,
	closeModalCampaignDocumentPreview: Function,
	openDocumentSigningDialog: Function,
	userId: string,
	publicKey: string,
	getRegisteredKey: Function,
	confirmModal: Function,
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
	},
	content: {
		overflow: 'hidden',
	},
	actions: {
		margin: '0px 4px 24px 4px',
		justifyContent: 'center',
	},
};

const DocumentPreview = (props: PropsT) => {
	const {
		open,
		title,
		text,
		signAction,
		classes,
		document,
		inProgress,
		closeModalCampaignDocumentPreview,
		getRegisteredKey,
		publicKey,
		userId,
		confirmModal,
	} = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		if (userId && !publicKey && useDigitalSignatures) {
			getRegisteredKey({ authId: userId });
		}
	}, [userId]);

	useEffect(() => {
		if (open && signAction && !useDigitalSignatures) {
			signAction();
			closeModalCampaignDocumentPreview();
		}
	}, [open]);

	const signatureSettupAlert = () => {
		confirmModal({
			open: true,
			title: t('Digital Signature'),
			subtitle: t('In order to continue, please setup your digital signature.'),
			actionLabel: t('SETUP'),
			cancelLabel: t('CANCEL'),
			actionMethod: () => {
				history.push({ pathname: `/user/profile/signature` });
				closeModalCampaignDocumentPreview();
			},
			buttonClass: 'assign_button',
		});
	};

	return (
		<Dialog
			open={signAction ? open && useDigitalSignatures : open}
			onClose={closeModalCampaignDocumentPreview}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title'}>{title || t('DOC_PREV')}</DialogTitle>
			<DialogContent classes={{ root: classes.content }}>
				{text && <div>{text}</div>}
				{!inProgress && document ? (
					<object data={getFileURI(document)} type="application/pdf" className={'document__preview__dialog'}>
						<a href={getFileURI(document)}>test.pdf</a>
					</object>
				) : (
					<CircularProgress size={100} className={'progress_doc_dialog'} />
				)}
			</DialogContent>
			<DialogActions classes={{ root: classes.actions }}>
				<Button
					type={'button'}
					variant={'outlined'}
					color={'primary'}
					onClick={closeModalCampaignDocumentPreview}
					name={t('CLOSE')}
				/>
				{signAction && useDigitalSignatures && (
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						onClick={() => {
							if (publicKey)
								props.openDocumentSigningDialog({
									document: document.file,
									signAction,
								});
							else signatureSettupAlert();
						}}
						name={t('SIGN')}
					/>
				)}
			</DialogActions>
		</Dialog>
	);
};

const mapStateToProps = ({
	modals: {
		documentPreview: { open, title, text, signAction },
	},
	campaign: {
		documentActions: { inProgress, currentDocument: document },
	},
	signature: {
		kp: { body },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	document,
	inProgress,
	open,
	title,
	text,
	signAction,
	publicKey: body,
	userId,
});

export default connect(
	mapStateToProps,
	{
		closeModalCampaignDocumentPreview,
		openDocumentSigningDialog,
		getRegisteredKey,
		confirmModal,
	},
)(withStyles(styles)(DocumentPreview));
