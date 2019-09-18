// @flow

import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { required } from '../../../../utilities/validators';
import SelectDropdown from '../../../common/select/Select';
import * as colors from '../../../../styles/modules/colors.scss';
import UploadDocument from '../../../common/uploadDocument/UploadDocument';
import { submitCampaignDocument, uploadDocument, removeUploadedDocument } from '../../../../state/campaign/actions';
import { submitCompanyDocument } from '../../../../state/company/actions';
import { closeModalCampaignDocument } from '../../../../state/modals/actions';
import { CAMPAIGNS, COMPANIES, FUNDRISING_PROPOSALS } from '../../../../constants/documentEntity';
import { accessLevel } from '../../management/constants/accessLevel';

type PropsT = {
	classes: {
		paper: any,
		title: any,
	},
	dialogInfo: any,
	currentUpload: any,
	submitCampaignDocument: Function,
	uploadDocument: Function,
	handleSubmit: Function,
	urlFriendlyName: string,
	invalid: boolean,
	removeUploadedDocument: Function,
	reset: Function,
	userId: any,
	closeModalCampaignDocument: Function,
	submitCompanyDocument: Function,
	companyId: number,
};

const styles = {
	paper: {
		width: '700px',
		minHeight: '500px',
		textAlign: 'center',
	},
	title: {
		color: colors.darkBlue,
	},
};

const DocumentDialog = (props: PropsT) => {
	const {
		classes,
		dialogInfo: { dialogTitle, type, documentEntity, open, accessLevels },
		submitCampaignDocument,
		uploadDocument,
		handleSubmit,
		urlFriendlyName,
		companyId,
		invalid,
		removeUploadedDocument,
		reset,
		userId,
		closeModalCampaignDocument,
		currentUpload: { docName, inProgress },
		submitCompanyDocument,
	} = props;
	const [t] = useTranslation('translations');

	const onSubmit = (data: any) => {
		const submitData = {
			accessLevel: data.accessLevel,
			title: data.title,
			type,
			url: docName,
		};

		if (documentEntity === CAMPAIGNS) {
			console.log(urlFriendlyName);
			submitCampaignDocument({
				name: urlFriendlyName,
				data: submitData,
				userId,
			});
		} else if (documentEntity === COMPANIES) submitCompanyDocument({ companyId, data: submitData, userId });

		removeUploadedDocument();
		reset();
		closeModalCampaignDocument();
	};

	const onClose = () => {
		reset();
		removeUploadedDocument();
		closeModalCampaignDocument();
	};

	const renderSubmittedDoc = () => {
		return (
			<div className={'submitted__doc'}>
				<div className={'submitted__doc__name'}>{docName}</div>
				<div>
					<Icon className={'icon_class'} onClick={() => removeUploadedDocument()}>
						close
					</Icon>
				</div>
			</div>
		);
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
					{!docName && (
						<div className={'form__field upload__doc_btn'}>
							<UploadDocument
								title={t('UPLOAD_DOCUMENT')}
								backgroundColor={colors.lightGray}
								border={'dashed'}
								borderColor={colors.gray1}
								inProgress={inProgress}
								upload={uploadDocument}
								textColor={colors.lightBlue}
							/>
						</div>
					)}
					<div className={'form__field'}>
						<Field
							name="title"
							component={Input}
							label={t('SUBMISSION_TITLE')}
							type="text"
							end_icon="info"
							validate={[required]}
						/>
					</div>
					<div className={'form__field'}>
						<Field name="type" component={Input} label={t('TYPE_OF_DOC')} disabled />
					</div>
					{documentEntity !== FUNDRISING_PROPOSALS && (
						<div className={'form__field'}>
							<Field
								name="accessLevel"
								component={SelectDropdown}
								label={t('DOC_ACCESS_LEVEL')}
								options={accessLevels || accessLevel}
								validate={[required]}
							/>
						</div>
					)}

					<div className={'form__field list__sub__doc'}>{docName && renderSubmittedDoc()}</div>
					<div className={'buttons__upload__doc'}>
						<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={onClose} />
						<Button
							type={'submit'}
							variant={'contained'}
							color={'primary'}
							name={t('SUBMIT')}
							disabled={invalid || !docName}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default compose(
	connect(
		state => ({
			initialValues: { type: state.modals.submitDocumentDialog.type },
			currentUpload: state.campaign.documentActions,
			userId: state.auth.authentication.userId,
			dialogInfo: state.modals.submitDocumentDialog,
			urlFriendlyName: state.campaign.info.urlFriendlyName,
			companyId: state.company.info.id,
		}),
		{
			uploadDocument,
			submitCampaignDocument,
			removeUploadedDocument,
			closeModalCampaignDocument,
			submitCompanyDocument,
		},
	),
	reduxForm({
		form: 'DocumentUpload',
		enableReinitialize: true,
	}),
)(withStyles(styles)(DocumentDialog));
