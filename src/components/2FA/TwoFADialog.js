// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import Input from '../common/input/Input';
import Checkbox from '../common/checkbox/Checkbox';
import Button from '../common/button/Button';
import { close2FADialog, openRecoveryDialog } from '../../state/2FA/actions';
import { number, length } from '../../utilities/validators';

type PropsT = {
	is2FAOpen: boolean,
	close2FADialog: Function,
	openRecoveryDialog: Function,
	handleSubmit: Function,
	showRememberMe: boolean,
	action: Function,
	token: string,
	userId: number,
	dispatch: Function,
	reset: Function,
	classes: {
		paper: any,
	},
};

type TwoFADataT = {
	code: string,
	rememberMe: boolean,
};

const styles = {
	paper: {
		width: '480px',
		padding: '25px 15px',
		textAlign: 'center',
	},
};

const length6 = length(6);

const onSubmit = (dispatch, data, action, reset) => {
	dispatch(action(data));
	reset();
};

const TwoFADialog = (props: PropsT) => {
	const {
		handleSubmit,
		classes,
		close2FADialog,
		openRecoveryDialog,
		is2FAOpen,
		showRememberMe,
		action,
		token,
		dispatch,
		userId,
		reset,
	} = props;
	const [checked, setChecked] = useState(false);
	const [t] = useTranslation('translations');
	return (
		<Dialog open={is2FAOpen} disableBackdropClick disableEscapeKeyDown classes={{ paper: classes.paper }}>
			<DialogTitle className={'twoFA--title'}>{t('2FA')}</DialogTitle>
			<DialogContent>
				<p className={'twoFA--text'}>
					{t('2FA_TEXT')}
					<br />
					{t('SUBMIT_6-DIGIT')}
				</p>
				<p className={'twoFA--google'}>{t('GOOGLE_AUT')}</p>
				<form
					onSubmit={handleSubmit((data: TwoFADataT) =>
						onSubmit(dispatch, { ...data, token, userId, wildcard: '' }, action, reset),
					)}
				>
					<div className={'form__field'}>
						<Field
							name="code"
							component={Input}
							label={t('AUTH_CODE')}
							type="text"
							validate={[number, length6]}
							autoFocus
						/>
					</div>
					{showRememberMe && (
						<div className={'form__field--left'}>
							<Field
								name="rememberMe"
								component={Checkbox}
								label={t('REMEMBER_30DAYS')}
								checked={checked}
								onChange={() => setChecked(!checked)}
							/>
						</div>
					)}
					<div className={'cancel-ok__buttons'}>
						<Button
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							name={t('CANCEL')}
							onClick={close2FADialog}
						/>
						<Button type={'submit'} variant={'contained'} color={'primary'} name={t('SUBMIT')} />
					</div>
				</form>
				<div className={'twoFA--recovery'} onClick={() => openRecoveryDialog()}>
					{t('USE_RECOVERY_CODE')}
				</div>
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({
	twoFA: { is2FAOpen, action, token, showRememberMe },
	auth: {
		authentication: { userId },
	},
}) => ({
	is2FAOpen,
	action,
	showRememberMe,
	token,
	userId,
});

export default compose(
	reduxForm({
		form: '2FAForm',
	}),
	connect(
		mapStateToProps,
		{
			close2FADialog,
			openRecoveryDialog,
		},
	),
)(withStyles(styles)(TwoFADialog));
