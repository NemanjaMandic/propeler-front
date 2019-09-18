// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import SelectDropdown from '../../../common/select/Select';
import { companyCategories } from '../../../../constants/categories';
import { required, url } from '../../../../utilities/validators';
import { createCompany, stepNext, updateCompany } from '../../../../state/company/actions';

export type CompanyDataT = {
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
	companyIdentificationNumber: string,
	website: string,
	linkedinUrl: string,
	facebookUrl: string,
	twitterUrl: string,
};

type PropsT = {
	invalid: boolean,
	createCompany: Function,
	handleSubmit: Function,
	stepNext: Function,
	id: string,
	pristine: boolean,
	updateCompany: Function,
};

const onSubmit = (
	createCompany,
	data: *,
	id: string,
	stepNext: Function,
	pristine: boolean,
	updateCompany: Function,
) => {
	const { companyCategory, ...companyDto } = data;
	companyDto.companyCategory = {
		id: companyCategory.id,
		name: companyCategories.find(o => o.value === data.companyCategory.id).label,
	};
	if (id) {
		if (!pristine) {
			updateCompany({ id, companyDto });
		}
		stepNext();
	} else {
		createCompany(companyDto);
	}
};

const AboutCompany = (props: PropsT) => {
	const { invalid, createCompany, handleSubmit, id, stepNext, pristine, updateCompany } = props;

	const [t] = useTranslation('translations');

	return (
		<form
			onSubmit={handleSubmit((data: *) => onSubmit(createCompany, data, id, stepNext, pristine, updateCompany))}
			className={'company-registration-form'}
		>
			<div className={'form__field'}>
				<Field
					name="name"
					component={Input}
					label={t('COMPANY_LONG_FORM_NAME')}
					type="text"
					end_icon="info"
					validate={[required]}
					autoFocus
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="companyIdentificationNumber"
					component={Input}
					label={t('COMPANY_ID_NUMBER')}
					type="text"
					validate={[required]}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="taxIdentifier"
					component={Input}
					label={t('COMPANY_TAX_IDENTIFIER')}
					type="text"
					validate={[required]}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="bankAccount"
					component={Input}
					label={t('COMPANY_BANK_ACCOUNT')}
					type="text"
					validate={[required]}
				/>
			</div>
			<div className={'form__field'}>
				<Field name="county" component={Input} label={t('COMPANY_COUNTY')} type="text" validate={[required]} />
			</div>
			<div className={'form__field'}>
				<Field name="city" component={Input} label={t('COMPANY_CITY')} type="text" validate={[required]} />
			</div>
			<div className={'form__field'}>
				<Field name="address" component={Input} label={t('COMPANY_ADDRESS')} type="text" validate={[required]} />
			</div>
			<div className={'form__field'}>
				<Field
					name={'companyCategory.id'}
					component={SelectDropdown}
					options={companyCategories}
					label={t('SET_COMPANY_CATEGORY')}
					validate={[required]}
				/>
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
				<Button
					type={'submit'}
					variant="contained"
					color={'primary'}
					name={t('SAVE_AND_CONTINUE')}
					disabled={invalid}
				/>
			</div>
		</form>
	);
};

export default compose(
	connect(
		state => ({ initialValues: state.company.info }),
		{ createCompany, stepNext, updateCompany },
	),
	reduxForm({
		form: 'AboutCompany',
		enableReinitialize: true,
	}),
)(AboutCompany);
