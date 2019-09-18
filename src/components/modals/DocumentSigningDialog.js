// @flow

import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { closeDocumentSigningDialog } from '../../state/modals/actions';
import { signDocument, signDocumentReinit } from '../../state/signature/actions';
import { stringToBytes, bytesToString } from '../../signature/RMDS';

const useStyles = makeStyles({
	paper: {
		width: '700px',
		maxWidth: '700px',
		textAlign: 'center',
	},
	closeBtn: {
		textTransform: 'initial',
		width: 160,
		height: 50,
	},
	successMsg: {
		display: 'flex',
		width: '70%',
		margin: '0 auto',
	},
});

type PropsT = {
	open: boolean,
	closeDocumentSigningDialog: Function,
	signAction: Function,
};

const signingStates = {
	SIGN_INITIAL: 0,
	SIGN_SUCCESS: 1,
	SIGN_FAIL: 2,
};
const DocumentSigningDialog = (props: PropsT) => {
	const {
		open,
		closeDocumentSigningDialog,
		document,
		signAction,
		signDocument,
		signedDocument,
		signDocumentReinit,
		kp,
	} = props;

	const [t] = useTranslation('translations');
	const classes = useStyles();
	let passInput = null;

	useEffect(() => {
		signedDocument.phase === signingStates.SIGN_SUCCESS && signAction && signAction();
	}, [signedDocument.phase]);

	const onInputChange = e => {
		passInput = stringToBytes(e.target.value);
	};

	const startSigningProcess = () => {
		if (passInput) {
			signDocument({ document, passphrase: bytesToString(passInput) });
		}
		passInput = null;
	};
	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={open}>
			<div className="overview-confirm-dialog-title">Document signing</div>
			{signedDocument.phase === signingStates.SIGN_SUCCESS ? (
				<div>
					<DialogContent>
						<div className={'form__field'}>
							<div className={classes.successMsg}>
								<i className="material-icons" style={{ color: '#1CCD77' }}>
									check_circle
								</i>
								<p>Your initial agreement has been successfully signed.</p>
							</div>
						</div>
					</DialogContent>
					<DialogActions className="overview-confirm-dialog-footer">
						<Button
							className={classes.closeBtn}
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							onClick={() => closeDocumentSigningDialog()}
							name={`Close`}
							style={{ margin: 20 }}
						>
							Close
						</Button>
					</DialogActions>
				</div>
			) : null}
			{signedDocument.phase === signingStates.SIGN_FAIL ? (
				<div>
					<DialogContent>
						<div className={'form__field'}>
							<div className={classes.successMsg}>
								<i className="material-icons" style={{ color: '#FA3877' }}>
									report_problem
								</i>
								<p>
									Ooops! Something went wrong. To continue signing check your passphrase and try again or contact our{' '}
									<a href="#">customer support</a>
								</p>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<div className={'app_form_buttons'} style={{ margin: 'auto', marginBottom: 20 }}>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'overview-confirm-dialog-cancel-button'}
								onClick={() => closeDocumentSigningDialog()}
							>
								Cancel
							</Button>
							<Button
								type={'submit'}
								className={'overview-confirm-dialog-cancel-button'}
								variant={'contained'}
								color={'primary'}
								onClick={() => signDocumentReinit()}
							>
								Try again
							</Button>
						</div>
					</DialogActions>
				</div>
			) : null}
			{signedDocument.phase === signingStates.SIGN_INITIAL ? (
				<div>
					<DialogContent style={{ textAlign: 'center' }}>
						{signedDocument.inProgress ? (
							<CircularProgress style={{ margin: 20 }} />
						) : (
							<TextField
								label={t('Type passphrase')}
								autoFocus
								style={{ fontSize: 11, width: '80%' }}
								onChange={onInputChange}
							/>
						)}
					</DialogContent>
					<DialogActions>
						<div className={'app_form_buttons'} style={{ margin: 20 }}>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'overview-confirm-dialog-cancel-button'}
								onClick={() => closeDocumentSigningDialog()}
							>
								Cancel
							</Button>
							<Button
								type={'submit'}
								className={'overview-confirm-dialog-cancel-button'}
								variant={'contained'}
								color={'primary'}
								disabled={!kp.body || signedDocument.inProgress}
								onClick={() => startSigningProcess()}
							>
								Confirm
							</Button>
						</div>
					</DialogActions>
				</div>
			) : null}
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			documentSigningDialog: { open, document, signAction },
		},
		signature: { signedDocument, kp },
	} = state;

	return {
		open,
		signAction,
		document,
		signedDocument,
		kp,
	};
};

export default connect(
	mapStateToProps,
	{
		closeDocumentSigningDialog,
		signDocument,
		signDocumentReinit,
	},
)(DocumentSigningDialog);
