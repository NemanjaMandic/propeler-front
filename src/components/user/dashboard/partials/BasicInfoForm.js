import React from 'react';
import { Field, reduxForm, FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useTranslation } from 'react-i18next';
import diff from 'object-diff';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import SelectDropdown from '../../../common/select/Select';
import { companyCategories } from '../../../../constants/categories';
import { required } from '../../../../utilities/validators';
import { reviewCompany } from '../../../../state/company/actions';

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
	companyIdentificationNumber: string,
	website: string,
	linkedinUrl: string,
	facebookUrl: string,
	twitterUrl: string,
	reviewCompany: Function,
} & FormProps;

const BasicInfoForm = (props: PropsT) => {
	const { handleSubmit, pristine, reviewCompany, initialValues, invalid, id } = props;

	const onSubmit = (reviewCompany, data: *) => {
		const { companyCategory, ...companyDto } = data;
		companyDto.companyCategory = {
			id: companyCategory.id,
			name: companyCategories.find(o => o.value === data.companyCategory.id).label,
		};

		const changedValues = diff(initialValues, companyDto);
		const toSend = { id: initialValues.id };
		Object.keys(initialValues).forEach(k => {
			if (changedValues[k]) {
				if (k === 'companyCategory') {
					if (initialValues.companyCategory.id === companyDto.companyCategory.id) {
						toSend[k] = null;
					} else {
						toSend[k] = changedValues[k];
					}
				} else toSend[k] = changedValues[k];
			} else if (k !== 'id') {
				toSend[k] = null;
			}
		});

		reviewCompany(toSend);
	};

	const [t] = useTranslation('translations');

	return (
		<form
			className={'company-registration-form margin-top-20'}
			onSubmit={handleSubmit((data: *) => onSubmit(reviewCompany, data, id))}
		>
			<div className={'form__field'}>
				<div className={'form-text margin-bottom-20'}>
					<span>{t('BASIC_INFO_COMP')}</span>
				</div>
			</div>
			<div className={'form__field'}>
				<Field name="name" component={Input} label={t('COMPANY_NAME')} type="text" validate={[required]} />
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
					name="companyIdentificationNumber"
					component={Input}
					label={t('COMPANY_ID_NUMBER')}
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
					name={t('SUBMIT_FOR_REVIEW')}
				/>
			</div>
		</form>
	);
};
export default compose(
	connect(
		state => ({ initialValues: state.company.info }),
		{ reviewCompany },
	),
	reduxForm({
		form: 'BasicInfoForm',
		enableReinitialize: true,
	}),
)(BasicInfoForm);
