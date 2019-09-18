// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import Step2 from '../auth/views/TwoFactorAuthentication/partials/Step2';
import { initiateNewSecret, verifyNewSecret } from '../../state/2FA/actions';
import ChangeSecretForm from './partials/ChangeSecretForm';

type PropsT = {
	open: boolean,
	success: boolean,
	initiateInProgress: boolean,
	initiateNewSecret: Function,
	verifyNewSecret: Function,
	userId: number,
	secret: string,
	classes: {
		paper: any,
	},
};

const styles = {
	paper: {
		minWidth: '480px',
		maxWidth: '700px',
		padding: '10px 15px 20px',
		textAlign: 'center',
	},
};

const ChangeSecretDialog = (props: PropsT) => {
	const { classes, open, success, secret, initiateInProgress, initiateNewSecret, verifyNewSecret, userId } = props;

	const handleInitSubmit = values => {
		initiateNewSecret({ userId, ...values });
	};

	const handleVerifySubmit = ({ code }) => {
		verifyNewSecret({ userId, code });
	};

	const [t] = useTranslation('translations');

	return (
		<Dialog open={open} disableBackdropClick disableEscapeKeyDown maxWidth={'md'} classes={{ paper: classes.paper }}>
			<DialogTitle className={'twoFA--title'}>{t('CHANGE_SECRET_KEY')}</DialogTitle>
			<DialogContent className={`change-dialog__${success ? 'verify' : 'init'}`}>
				<p>{t('PLEASE_ENTER_CURR_PASS')}</p>
				{initiateInProgress ? (
					<CircularProgress />
				) : success ? (
					<Step2 secret={secret} onSubmit={handleVerifySubmit} />
				) : (
					<ChangeSecretForm onSubmit={handleInitSubmit} />
				)}
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({
	twoFA: {
		newSecret: { initiateInProgress, success, open, secret },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	open,
	secret,
	initiateInProgress,
	success,
	userId,
});

export default connect(
	mapStateToProps,
	{
		initiateNewSecret,
		verifyNewSecret,
	},
)(withStyles(styles)(ChangeSecretDialog));
