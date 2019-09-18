import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import Print from '@material-ui/icons/Print';
import { NotificationManager } from 'react-notifications';
import Button from '../common/button/Button';
import { settupMethods } from '../../constants/digitalSignatureSettupMethods';
import { genRandomPassphrase, getKPPayload, stringToBytes, bytesToString } from '../../signature/RMDS';
import { closeDigitalSignatureSettupDialog } from '../../state/modals/actions';
import { registerKey } from '../../state/signature/actions';

const styles = {
	paper: {
		width: '520px',
		maxWidth: '520px',
		textAlign: 'left',
	},
};

const DigitalSignatureSettupDialog = ({
	classes,
	closeDigitalSignatureSettupDialog,
	open,
	registerKey,
	kp,
}: PropsT) => {
	const [t] = useTranslation('translations');
	const [passphrase, setPassphrase] = useState(null);
	const [dsMethod, setDSMethod] = useState(settupMethods.PASSPHRASE);
	const [step, setStep] = useState(0);
	const [warningChecked, setWarningChecked] = useState(false);

	useEffect(() => {
		open && setStep(0);
		setWarningChecked(false);
		setPassphrase(null);
	}, [open]);

	const passphraseSettup = () => {
		const pass = stringToBytes(genRandomPassphrase(window.crypto, 6));
		setPassphrase(pass);
		setStep(1);
	};

	const smartCardSettup = () => {
		// TODO: Implement smart card
		setStep(2);
	};

	const close = () => {
		closeDigitalSignatureSettupDialog();
	};

	const handleDSMethodChange = event => {
		setDSMethod(event.target.value);
	};

	const proceedSettupWithMethod = () => {
		if (dsMethod === settupMethods.PASSPHRASE) {
			passphraseSettup();
		} else if (dsMethod === settupMethods.SMART_CARD) {
			smartCardSettup();
		}
	};

	const completePassphraseSettup = async () => {
		await registerKey(await getKPPayload(bytesToString(passphrase)));
		setPassphrase(null);
		NotificationManager.success(t('DIGITAL_SIGNATURE_SUCCESS_MESSAGE'), '', 3000);
		closeDigitalSignatureSettupDialog();
	};

	const handleWarningChange = event => {
		setWarningChecked(event.target.checked);
	};

	const printPassphrase = () => {
		const printArea = window.open();
		printArea.document.write(`<div>${bytesToString(passphrase)}</div>`);
		printArea.document.close();
		printArea.focus();
		printArea.print();
		printArea.close();
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
			{step === 0 && (
				<div>
					<DialogTitle className={'signature-dialog-title'}>
						<div>{t('DIGITAL_SIGNATURE_MODAL_TITLE')}</div>
						<div className="signature_dialog_subtitle">{t('DIGITAL_SIGNATURE_MODAL_PERFERRED_METHOD')}</div>
					</DialogTitle>
					<DialogContent className="signature_dialog_content">
						<FormControl component="fieldset">
							<RadioGroup aria-label="dsMethod" name="dsMethod" value={dsMethod} onChange={handleDSMethodChange}>
								<FormControlLabel
									style={{ marginBottom: 30 }}
									value={settupMethods.PASSPHRASE}
									control={<Radio />}
									label={t('DIGITAL_SIGNATURE_PASSPHRASE')}
								/>
								<FormControlLabel
									value={settupMethods.SMART_CARD}
									control={<Radio />}
									label={t('DIGITAL_SIGNATURE_SMART_CARD')}
									disabled
								/>
							</RadioGroup>
						</FormControl>
						<div className="investment-dialog-footer">
							<Button variant={'outlined'} color={'primary'} onClick={() => close()} name={t('CANCEL')} />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={false}
								name={t('PROCEED')}
								onClick={() => proceedSettupWithMethod()}
							/>
						</div>
					</DialogContent>
				</div>
			)}
			{step === 1 && (
				<div>
					<DialogTitle className={'signature-dialog-title'}>
						<div>{t('DIGITAL_SIGNATURE_MODAL_TITLE')}</div>
						<div className="signature_dialog_subtitle">{t('DIGITAL_SIGNATURE_MODAL_PASSPHRASE')}</div>
					</DialogTitle>
					<DialogContent className="investment_dialog_content">
						<div style={{ display: 'flex', marginBottom: 30 }}>
							<TextField
								label={t('DIGITAL_SIGNATURE_PASSPHRASE_LABEL')}
								disabled
								variant="filled"
								style={{ width: '100%', fontSize: 11 }}
								value={(passphrase && bytesToString(passphrase)) || ''}
							/>
						</div>
						<div>
							<IconButton onClick={() => printPassphrase()}>
								<Print />
							</IconButton>
							<a href={'#'} rel="noreferrer noopener" onClick={() => printPassphrase()}>
								{t('DIGITAL_SIGNATURE_PRINT_BACKUP')}
							</a>
						</div>
						<div className={'investment_accept_terms'}>
							<FormGroup row>
								<FormControlLabel
									style={{ alignItems: 'end', textAlign: 'left' }}
									value="accepted"
									control={<Checkbox onChange={handleWarningChange} />}
									label={
										<label>
											{t('I_CONFIRM_THAT_UNDERSTAND')}
											<a
												href={'https://realmarket.io/'}
												rel="noreferrer noopener"
												target="_blank"
												onClick={() => console.log('link')}
											>
												{t('THIS_WARNING')}
											</a>
											{t('WANT_SIGN_DESPITE')}
											<a
												href={'https://realmarket.io/'}
												rel="noreferrer noopener"
												target="_blank"
												onClick={() => console.log('link')}
											>
												{t('FAQ')}
											</a>
										</label>
									}
								/>
							</FormGroup>
						</div>
						<div className="investment-dialog-footer">
							<Button variant={'outlined'} color={'primary'} onClick={() => setStep(0)} name={t('BACK')} />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={!warningChecked || kp.inProgress}
								name={t('FINISH')}
								onClick={() => completePassphraseSettup()}
							/>
						</div>
					</DialogContent>
				</div>
			)}
		</Dialog>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			digitalSignatureSettupDialog: { open },
		},
		signature: { kp },
	} = state;
	return {
		open,
		kp,
	};
};

export default connect(
	mapStateToProps,
	{
		closeDigitalSignatureSettupDialog,
		registerKey,
	},
)(withStyles(styles)(DigitalSignatureSettupDialog));
