// @flow

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { confirmModal } from '../../../state/modals/actions';

type PropsT = {
	open: boolean,
	title: string,
	subtitle: string,
	actionLabel: string,
	cancelLabel: string,
	confirmModal: Function,
	actionMethod: Function,
	actionParams: any,
	buttonClass?: any,
};

const ConfirmModal = ({
	open,
	title,
	subtitle,
	actionLabel,
	cancelLabel,
	confirmModal,
	actionMethod,
	actionParams,
	buttonClass,
}: PropsT) => {
	const confirm = action => {
		action && actionMethod && actionMethod(actionParams);
		confirmModal({ open: false, actionMethod: null, actionParams: null });
	};

	return (
		<Dialog disableBackdropClick disableEscapeKeyDown open={open} className="overview-confirm-dialog">
			<div className="overview-confirm-dialog-title">{title}</div>
			<DialogContent className="overview-confirm-dialog-content">{subtitle}</DialogContent>
			<DialogActions className="overview-confirm-dialog-footer">
				{cancelLabel && (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'overview-confirm-dialog-cancel-button'}
						onClick={() => confirm(false)}
					>
						{cancelLabel}
					</Button>
				)}
				{actionLabel && (
					<Button className={buttonClass || 'overview-confirm-dialog-action-button'} onClick={() => confirm(true)}>
						{actionLabel}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};
const mapStateToProps = ({
	modals: {
		confirmModal: { open, title, subtitle, actionLabel, cancelLabel, actionMethod, actionParams, buttonClass },
	},
}) => ({
	open,
	title,
	subtitle,
	actionLabel,
	cancelLabel,
	actionMethod,
	actionParams,
	buttonClass,
});

export default connect(
	mapStateToProps,
	{
		confirmModal,
	},
)(ConfirmModal);
