// @flow

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { rejectionDialog } from '../../state/modals/actions';
import Input from '../common/input/Input';
import { maxLength, required } from '../../utilities/validators';

type PropsT = {
	classes: any,
	open: boolean,
	title: string,
	fieldName: string,
	actionLabel: string,
	cancelLabel: string,
	rejectionDialog: Function,
	actionMethod: Function,
	handleSubmit: Function,
	invalid: boolean,
};

const styles = {
	paper: {
		width: '700px',
		maxWidth: '700px',
		textAlign: 'center',
	},
};

const maxLength250 = maxLength(250);

const ConfirmModal = ({
	open,
	title,
	fieldName,
	actionLabel,
	cancelLabel,
	rejectionDialog,
	actionMethod,
	handleSubmit,
	classes,
	invalid,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const confirm = data => {
		actionMethod && actionMethod(data);
		rejectionDialog({ open: false, actionMethod: null });
	};

	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={open} classes={{ paper: classes.paper }}>
			<div className="overview-confirm-dialog-title">{title}</div>
			<form onSubmit={handleSubmit(confirm)}>
				<DialogContent>
					<Field
						name={fieldName}
						component={Input}
						multiline
						rows="8"
						label={t('REJECT_EXPLANATION')}
						type="text"
						validate={[required, maxLength250]}
					/>
				</DialogContent>
				<DialogActions className="overview-confirm-dialog-footer">
					{cancelLabel && (
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'overview-confirm-dialog-cancel-button'}
							onClick={() => rejectionDialog({ open: false })}
						>
							{cancelLabel}
						</Button>
					)}
					{actionLabel && (
						<Button
							type={'submit'}
							className={'overview-confirm-dialog-cancel-button'}
							variant={'contained'}
							color={'primary'}
							disabled={invalid}
						>
							{actionLabel}
						</Button>
					)}
				</DialogActions>
			</form>
		</Dialog>
	);
};
const mapStateToProps = ({
	modals: {
		rejectionDialog: { open, title, fieldName, actionLabel, cancelLabel, actionMethod },
	},
}) => ({
	open,
	title,
	fieldName,
	actionLabel,
	cancelLabel,
	actionMethod,
});

export default compose(
	connect(
		mapStateToProps,
		{ rejectionDialog },
	),
	reduxForm({
		form: 'RejectionDialogForm',
	}),
)(withStyles(styles)(ConfirmModal));
