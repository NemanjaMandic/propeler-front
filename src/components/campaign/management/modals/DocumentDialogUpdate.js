// @flow

import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { required } from '../../../../utilities/validators';
import SelectDropdown from '../../../common/select/Select';
import * as colors from '../../../../styles/modules/colors.scss';
import { updateCampaignDocument } from '../../../../state/campaign/actions';
import { updateCompanyDocument } from '../../../../state/company/actions';
import { closeModalCampaignDocumentUpdate } from '../../../../state/modals/actions';
import { CAMPAIGNS } from '../../../../constants/documentEntity';

type PropsT = {
	classes: {
		paper: any,
		title: any,
	},
	updateCampaignDocument: Function,
	handleSubmit: Function,
	urlFriendlyName: string,
	invalid: boolean,
	reset: Function,
	userId: any,
	closeModalCampaignDocumentUpdate: Function,
	updateDocumentDialog: any,
	updateCompanyDocument: Function,
};

const styles = {
	paper: {
		width: '700px',
		minHeight: '450px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
	},
};

const DocumentDialogUpdate = (props: PropsT) => {
	const {
		classes,
		updateCampaignDocument,
		handleSubmit,
		urlFriendlyName,
		invalid,
		reset,
		userId,
		updateDocumentDialog: { dialogTitle, documentEntity, type, url, accessLevels, open, id },
		closeModalCampaignDocumentUpdate,
		updateCompanyDocument,
	} = props;

	const [t] = useTranslation('translations');

	const onClose = () => {
		closeModalCampaignDocumentUpdate();
		reset();
	};

	const onSubmit = (data: any) => {
		const submitData = {
			accessLevel: data.accessLevel,
			title: data.title,
			url,
			type,
		};
		if (documentEntity === CAMPAIGNS)
			updateCampaignDocument({
				campaignName: urlFriendlyName,
				documentId: id,
				data: submitData,
				userId,
			});
		else updateCompanyDocument({ documentId: id, data: submitData, userId });

		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle className={'twoFA--title'}>{dialogTitle}</DialogTitle>
			<DialogContent>
				<span className={'dialog__content'}> {t('DRAG_AND_DROP_FILE')} </span>
				<form className={'dialog__form'} onSubmit={handleSubmit((data: *) => onSubmit(data))}>
					<div className={'form__field margin-bottom-5'}>
						<Field
							name="title"
							component={Input}
							label={t('SUBMISSION_TITLE')}
							type="text"
							end_icon="info"
							validate={[required]}
							autoFocus
						/>
					</div>
					<div className={'form__field'}>
						<Field name="type" component={Input} label={t('TYPE_OF_DOC')} disabled />
					</div>

					<div className={'form__field'}>
						<Field
							name="accessLevel"
							component={SelectDropdown}
							label={t('DOC_ACCESS_LEVEL')}
							options={accessLevels}
							validate={[required]}
						/>
					</div>
					<div className={'buttons__upload__doc padding-top-25'}>
						<Button
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							name={t('CANCEL')}
							onClick={() => {
								closeModalCampaignDocumentUpdate();
								reset();
							}}
						/>
						<Button type={'submit'} variant={'contained'} color={'primary'} name={t('SUBMIT')} disabled={invalid} />
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default compose(
	connect(
		state => ({
			initialValues: state.modals.updateDocumentDialog,
			oldData: state.campaign.updateCampaignDocument,
			userId: state.auth.authentication.userId,
			urlFriendlyName: state.campaign.info.urlFriendlyName,
			updateDocumentDialog: state.modals.updateDocumentDialog,
		}),
		{
			updateCampaignDocument,
			closeModalCampaignDocumentUpdate,
			updateCompanyDocument,
		},
	),
	reduxForm({
		form: 'CampaignDocumentUpdate',
		enableReinitialize: true,
	}),
)(withStyles(styles)(DocumentDialogUpdate));
