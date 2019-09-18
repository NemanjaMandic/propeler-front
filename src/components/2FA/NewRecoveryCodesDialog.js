// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import Step3 from '../auth/views/TwoFactorAuthentication/partials/Step3';
import { closeNewRecoveryCodeDialog } from '../../state/2FA/actions';
import Button from '../common/button/Button';

type PropsT = {
	isNewRecoveryCodeOpen: boolean,
	recoveryCode: Object,
	classes: {
		paper: any,
	},
	closeNewRecoveryCodeDialog: Function,
};

const styles = {
	paper: {
		width: '700px',
		padding: '10px 70px 50px',
		'@media print': {
			height: '100%',
		},
	},
};

const NewRecoveryCodesDialog = (props: PropsT) => {
	const { classes, isNewRecoveryCodeOpen, recoveryCode, closeNewRecoveryCodeDialog } = props;

	const [t] = useTranslation('translations');

	return (
		<Dialog
			open={isNewRecoveryCodeOpen}
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth={'md'}
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title'}>{t('GET_NEW_CODES_RECOVERY')}</DialogTitle>
			<DialogContent className={`change-dialog`}>
				<Step3 wildcards={recoveryCode.wildcards} />
			</DialogContent>
			<div className="cancel-ok__buttons">
				<Button
					type={'submit'}
					variant={'outlined'}
					color={'primary'}
					name={t('CLOSE')}
					onClick={() => closeNewRecoveryCodeDialog()}
				/>
			</div>
		</Dialog>
	);
};

const mapStateToProps = ({
	twoFA: { isNewRecoveryCodeOpen },
	user: {
		profile: { recoveryCode },
	},
}) => ({
	recoveryCode,
	isNewRecoveryCodeOpen,
});

export default connect(
	mapStateToProps,
	{
		closeNewRecoveryCodeDialog,
	},
)(withStyles(styles)(NewRecoveryCodesDialog));
