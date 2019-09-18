// @flow

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, change } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Icon from '@material-ui/core/Icon';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import { required, email } from '../../../utilities/validators';
import SelectDropdown from '../../common/select/Select';
import Checkbox from '../../common/checkbox/Checkbox';
import * as colors from '../../../styles/modules/colors.scss';
import { submitFundraisingProposal } from '../../../state/auth/actions';
import UploadDocument from '../../common/uploadDocument/UploadDocument';
import { history } from '../../../store/configureStore';
import { USER_DASHBOARD } from '../../../constants/routes';
import * as documentEntity from '../../../constants/documentEntity';
import {
	getDocumentTypes,
	clearDynamicDocumentsForEntity,
	removeDynamicDocumentForEntity,
	uploadDynamicDocument,
} from '../../../state/documents/actions';

export type RegisterBodyT = {
	firstName: string,
	lastName: string,
	companyName: string,
	companyIdentificationNumber: string,
	taxIdentifier: string,
	website: string,
	email: string,
	phoneNumber?: string,
	previouslyRaised: string,
	fundingGoals: string,
};

export type RegisterDataT = {
	body: RegisterBodyT,
	header: {
		captcha_response: String,
	},
};

type PropsT = {
	successFP: boolean,
	handleSubmit: Function,
	invalid: boolean,
	review?: boolean,
	reset: Function,
	documents: any,
	submitFundraisingProposal: Function,
	uploadDynamicDocument: Function,
	change: Function,
	getDocumentTypes: Function,
	documentTypes: any,
	clearDynamicDocumentsForEntity: Function,
	removeDynamicDocumentForEntity: Function,
};

function ApplicationForm(props: PropsT) {
	const prevRaised = [
		{ label: '<100K', value: '<100K' },
		{ label: '100K-500K', value: '100K-500K' },
		{ label: '1M+', value: '1M+' },
	];

	const wantToRaise = [
		{ label: '<100K', value: '<100K' },
		{ label: '100K-500K', value: '100K-500K' },
		{ label: '1M+', value: '1M+' },
	];

	const {
		successFP,
		handleSubmit,
		invalid,
		review,
		reset,
		submitFundraisingProposal,
		uploadDynamicDocument,
		getDocumentTypes,
		change,
		documentTypes,
		dynamicUploads,
		clearDynamicDocumentsForEntity,
		removeDynamicDocumentForEntity,
		tweaker,
	} = props;
	const [recaptcha, setRecaptcha] = useState('');
	const [t] = useTranslation('translations');

	const recaptchaCallback = (recapthaCode: String) => {
		setRecaptcha(recapthaCode);
	};

	const [checked, setChecked] = useState(false);
	const cancel = () => {
		reset();
		clearDynamicDocumentsForEntity({
			entity: documentEntity.FUNDRISING_PROPOSALS,
		});
		history.push(USER_DASHBOARD);
	};

	const sendApplication = (data: RegisterDataT) => {
		const docData = [];
		documentTypes[documentEntity.FUNDRISING_PROPOSALS].documents.forEach(doc => {
			doc.uploads.forEach(upld => {
				docData.push({
					title: `${data.body.companyName}${t(`SUBMITED_DOC_SUFIX_${doc.type}`)}`,
					type: doc.type,
					url: upld.url,
				});
			});
		});

		const submittedData = {
			body: data.body,
			header: { captcha_response: recaptcha },
		};
		submitFundraisingProposal({ data: submittedData, docData });
		clearDynamicDocumentsForEntity({
			entity: documentEntity.FUNDRISING_PROPOSALS,
		});
	};

	const renderSubmittedDoc = (url, docType, name) => {
		return (
			<div className={'submitted__doc'} key={url}>
				<div className={'submitted__doc__name'}>{name}</div>
				<div>
					<Icon
						className={'icon_class'}
						onClick={() =>
							removeDynamicDocumentForEntity({
								docType,
								entity: documentEntity.FUNDRISING_PROPOSALS,
								url,
							})
						}
					>
						close
					</Icon>
				</div>
			</div>
		);
	};

	const renderUploadDoc = (docType, inProgress) => {
		return (
			<UploadDocument
				title={`${t(`SUBMIT_DOCUMENT_TYPE_${docType.type}`)}*`}
				backgroundColor={colors.white}
				border={'dashed'}
				borderColor={colors.gray1}
				inProgress={inProgress}
				upload={uploadDynamicDocument}
				params={{
					docType: docType.type,
					entity: documentEntity.FUNDRISING_PROPOSALS,
				}}
				textColor={colors.lightBlue}
				key={docType.type}
			/>
		);
	};

	useEffect(() => {
		getDocumentTypes(documentEntity.FUNDRISING_PROPOSALS);
	}, []);

	return (
		<div className={'app_form'}>
			<form onSubmit={handleSubmit((data: RegisterDataT) => sendApplication(data))}>
				<div className={'form__field'}>
					<Field
						name="body.firstName"
						component={Input}
						label={`${t('FIRST_NAME')}*`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.lastName"
						component={Input}
						label={`${t('LAST_NAME')}*`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.companyName"
						component={Input}
						label={`${t('FULL_COMPANY_NAME')}*`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.companyIdentificationNumber"
						component={Input}
						label={`${t('COMPANY_ID_NUMBER')}`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.taxIdentifier"
						component={Input}
						label={`${t('COMPANY_VAT_NUMBER')}`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.website"
						component={Input}
						label={`${t('COMPANY_WEBSITE')}*`}
						type="text"
						validate={[required]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.email"
						component={Input}
						label={`${t('COMPANY_EMAIL')}*`}
						type="text"
						validate={[required, email]}
						disabled={review}
					/>
				</div>
				<div className={'form__field'}>
					<Field name="body.phoneNumber" component={Input} label={t('PHONE_NUMBER')} type="text" disabled={review} />
				</div>
				<div className={'form__field'}>
					<Field
						name="body.previouslyRaised"
						component={SelectDropdown}
						label={`${t('PREV_RAISED')}*`}
						options={prevRaised}
						validate={[required]}
						disabled={review}
						type="number"
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="body.fundingGoals"
						component={SelectDropdown}
						label={`${t('WANT_TO_RAISE')}*`}
						options={wantToRaise}
						validate={[required]}
						disabled={review}
					/>
				</div>
				{!review && (
					<Fragment>
						<div className={'form__field app_form_doc'}>
							{documentTypes[documentEntity.FUNDRISING_PROPOSALS] &&
								documentTypes[documentEntity.FUNDRISING_PROPOSALS].documents.map(docType => {
									const { uploads } = docType;
									if (uploads.length > 0) {
										return renderSubmittedDoc(uploads[0].url, docType.type, uploads[0].name);
									}
									return renderUploadDoc(docType, false);
								})}
						</div>
						<div className={'app_form_checkbox'}>
							<Field
								name="agree"
								component={Checkbox}
								label={
									<span className={'checkbox_label'}>
										{t('APP_FORM_CHECKBOX_P1')}
										<span style={{ color: colors.lightBlue }}>dataprotection@propeler.co</span>
										{t('APP_FORM_CHECKBOX_P2')}
										<span style={{ color: colors.lightBlue }}> {t('APP_FORM_CHECKBOX_P3')}</span>
										{t('APP_FORM_CHECKBOX_P4')}
									</span>
								}
								checked={checked}
								onChange={() => setChecked(!checked)}
							/>
						</div>
						<div className={'form__field--recaptcha'}>
							<ReCAPTCHA sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY} onChange={recaptchaCallback} />
						</div>
						<div className={'app_form_buttons'}>
							<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={cancel} />
							<Button
								type={'submit'}
								variant="contained"
								color={'primary'}
								name={t('SUBMIT')}
								disabled={
									invalid || !recaptcha || !documentTypes[documentEntity.FUNDRISING_PROPOSALS].mandatoriesForEntity
								}
							/>
						</div>
					</Fragment>
				)}
			</form>
		</div>
	);
}

const mapStateToProps = ({
	auth: {
		registerUser: { success, inProgress },
		fundRaisingProposal: { successFP },
	},
	modals: { fundraisingAppReview },
	documents: {
		documentTypes: { data },
		tweaker,
	},
}) => ({
	success,
	successFP,
	inProgress,
	initialValues: {
		body: {
			...fundraisingAppReview.review,
		},
	},

	documentTypes: data,
	tweaker,
});

export default compose(
	connect(
		mapStateToProps,
		{
			submitFundraisingProposal,
			uploadDynamicDocument,
			change,
			getDocumentTypes,
			clearDynamicDocumentsForEntity,
			removeDynamicDocumentForEntity,
		},
	),
	reduxForm({
		form: 'FundrisingApplication',
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	}),
)(ApplicationForm);
