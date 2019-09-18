import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '../../../common/button/Button';
import { openDigitalSignatureSettupDialog } from '../../../../state/modals/actions';
import { getRegisteredKey } from '../../../../state/signature/actions';
import { settupMethods } from '../../../../constants/digitalSignatureSettupMethods';

const DigitalSignature = ({ openDigitalSignatureSettupDialog, kp, getRegisteredKey, userId }: PropsT) => {
	const [t] = useTranslation('translations');
	const [dsMethod, setDSMethod] = useState(settupMethods.PASSPHRASE);

	useEffect(() => {
		if (userId) getRegisteredKey({ authId: userId });
	}, [userId]);

	return (
		<div>
			{kp.inProgress && <CircularProgress style={{ marginTop: 50 }} />}
			{!kp.inProgress && !kp.body && (
				<div>
					<div className={'change__profile__form verification'} style={{ marginBottom: 20 }}>
						<span>{t('DIGITAL_SIGNATURE_TITLE')}</span>
						<div>
							<span style={{ maxWidth: 500 }}>{t('DIGITAL_SIGNATURE_INFO')}</span>
						</div>
					</div>
					<Button
						type={'submit'}
						variant={'contained'}
						color={'primary'}
						disabled={false}
						name={t('DIGITAL_SIGNATURE_SETTUP_SINGATURE')}
						onClick={() => openDigitalSignatureSettupDialog()}
					/>
				</div>
			)}
			{!kp.inProgress && kp.body && (
				<div>
					<div className={'change__profile__form verification'} style={{ marginBottom: 20 }}>
						<span>{t('DIGITAL_SIGNATURE_TITLE')}</span>
						<div>
							<span style={{ maxWidth: 500 }}>{t('DIGITAL_SIGNATURE_CREATED_MSG')}</span>
						</div>
					</div>
					<div style={{ marginBottom: 20 }}>
						<FormControl component="fieldset">
							<RadioGroup aria-label="dsMethod2" name="dsMethod" value={dsMethod}>
								<FormControlLabel
									value={settupMethods.PASSPHRASE}
									control={<Radio />}
									label={t('DIGITAL_SIGNATURE_PASSPHRASE')}
									disabled
								/>
								<FormControlLabel
									value={settupMethods.SMART_CARD}
									control={<Radio />}
									label={t('DIGITAL_SIGNATURE_SMART_CARD')}
									disabled
								/>
							</RadioGroup>
						</FormControl>
					</div>

					<Button
						type={'submit'}
						variant={'contained'}
						color={'primary'}
						disabled={false}
						name={t('DIGITAL_SIGNATURE_CHANGE_SINGATURE')}
						onClick={() => openDigitalSignatureSettupDialog()}
					/>
					<div className={'change__profile__form verification'} style={{ marginBottom: 20 }}>
						<div>
							<span style={{ maxWidth: 500 }}>{t('DIGITAL_SIGNATURE_LOST_OR_STOLEN_INFO')}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	const {
		modals: {
			digitalSignatureSettupDialog: { open },
		},
		signature: { kp },
		auth: {
			authentication: { userId },
		},
	} = state;
	return {
		open,
		kp,
		userId,
	};
};

export default connect(
	mapStateToProps,
	{
		openDigitalSignatureSettupDialog,
		getRegisteredKey,
	},
)(DigitalSignature);
