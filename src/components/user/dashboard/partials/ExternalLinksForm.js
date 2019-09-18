import React from 'react';
import { Field, reduxForm, FormProps } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import diff from 'object-diff';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { url } from '../../../../utilities/validators';
import { updateExternalLinks } from '../../../../state/company/actions';

type PropsT = {
	address: string,
	bankAccount: string,
	city: string,
	companyCategory: {
		id: number,
		name: string,
	},
	county: string,
	name: string,
	ownerId: 0,
	taxIdentifier: string,
	website: string,
	linkedinUrl: string,
	facebookUrl: string,
	twitterUrl: string,
	updateExternalLinks: Function,
} & FormProps;

const ExternalLinksForm = (props: PropsT) => {
	const { pristine, invalid, handleSubmit, updateExternalLinks, initialValues, companyId } = props;

	const [t] = useTranslation('translations');

	const onSubmit = (updateExternalLinks, data: *) => {
		const changedValues = diff(initialValues, data);
		const toSend = { id: initialValues.id };

		Object.keys(initialValues).forEach(k => {
			if (k !== 'id') toSend[k] = changedValues[k];
		});
		updateExternalLinks(toSend);
	};

	return (
		<form
			className={'company-registration-form margin-top-20'}
			onSubmit={handleSubmit((data: *) => onSubmit(updateExternalLinks, data, companyId))}
		>
			<div className={'form__field'}>
				<div className={'form-text margin-bottom-20'}>
					<span>{t('BASIC_INFO_COMP')}</span>
				</div>
			</div>
			<div className={'form__field'}>
				<Field name="website" component={Input} label={t('COMPANY_PAGE_URL')} type="text" validate={[url]} />
			</div>
			<div className={'form__field'}>
				<Field name="linkedinUrl" component={Input} label={t('LINKEDIN_URL')} type="text" validate={[url]} />
			</div>
			<div className={'form__field'}>
				<Field name="twitterUrl" component={Input} label={t('TWITTER_URL')} type="text" validate={[url]} />
			</div>
			<div className={'form__field'}>
				<Field name="facebookUrl" component={Input} label={t('FACEBOOK_URL')} type="text" validate={[url]} />
			</div>
			<div className={'form__field'}>
				<Field name="customUrl" component={Input} label={t('CUSTOM_URL')} type="text" validate={[url]} />
			</div>

			<div className={'form__field'}>
				<div className={'form-text margin-bottom-20'}>
					{t('LOST_PHONE_COMPANY')}
					<span className="upload__link">{t('RESET')}</span>
					{`, `}
					<span className="upload__link" onClick={() => alert(t('GENERATE'))}>
						{t('GENERATE')}
					</span>
					{t('OR')}
					<span className="upload__link" onClick={() => alert(t('REGENERATE'))}>
						{t('REGENERATE')}
					</span>
					{t('NEW_CODES_COMPANY')}
				</div>
			</div>

			<div className={'form__field'}>
				<Button
					type={'submit'}
					variant="contained"
					color={'primary'}
					disabled={pristine || invalid}
					name={t('SAVE_CHANGES')}
				/>
			</div>
		</form>
	);
};

const mapStateToProps = state => {
	const {
		company: {
			info: { id },
		},
	} = state;
	return {
		initialValues: state.company.info,
		companyId: id,
	};
};
export default compose(
	connect(
		mapStateToProps,
		{ updateExternalLinks },
	),
	reduxForm({
		form: 'ExternalLinksForm',
		enableReinitialize: true,
	}),
)(ExternalLinksForm);
