// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import { close2FADialog } from '../../state/2FA/actions';

type PropsT = {
	isRecoveryOpen: boolean,
	close2FADialog: Function,
	handleSubmit: Function,
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
	wildcard: string,
};

const styles = {
	paper: {
		width: '480px',
		padding: '25px 15px',
		textAlign: 'center',
	},
};

const onSubmit = (dispatch, data, action, reset) => {
	dispatch(action(data));
	reset();
};

const RecoveryCodesDialog = (props: PropsT) => {
	const { handleSubmit, classes, close2FADialog, isRecoveryOpen, action, token, dispatch, reset, userId } = props;
	const [t] = useTranslation('translations');
	return (
		<Dialog open={isRecoveryOpen} disableBackdropClick disableEscapeKeyDown classes={{ paper: classes.paper }}>
			<DialogTitle className={'twoFA--title'}>{t('SUBMIT_RECOVERY_CODE')}</DialogTitle>
			<DialogContent>
				<p className={'twoFA--text'}>
					{t('ENTER_RECOVERY_CODE')}
					<br />
					{t('WITHOUT_THESE_CODE')}
					<span className="twoFA--recovery">{t('SUPPORT_SERVICE')}</span>.
				</p>
				<p className={'twoFA--google'}>{t('GOOGLE_AUT')}</p>
				<form
					onSubmit={handleSubmit((data: TwoFADataT) =>
						onSubmit(dispatch, { ...data, token, userId, code: '' }, action, reset),
					)}
				>
					<Field name="wildcard" component={Input} label={t('RECOVERY_CODE')} type="text" autoFocus />
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
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({
	twoFA: { isRecoveryOpen, action, token },
	auth: {
		authentication: { userId },
	},
}) => ({
	isRecoveryOpen,
	action,
	token,
	userId,
});

export default compose(
	reduxForm({
		form: 'RecoveryForm',
	}),
	connect(
		mapStateToProps,
		{
			close2FADialog,
		},
	),
)(withStyles(styles)(RecoveryCodesDialog));
