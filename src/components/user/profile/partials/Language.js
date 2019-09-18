// @flow

import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import SelectDropdown from '../../../common/select/Select';
import i18n from '../../../../i18n';

const Language = () => {
	const [t] = useTranslation('translations');

	const languages = [{ label: t('ENGLISH'), value: 'en' }, { label: t('SERBIAN'), value: 'sr' }];

	const lang = localStorage.getItem('language') || 'en';

	const [language, setLanguage] = useState(lang);

	const handleChange = event => {
		setLanguage(event.target.value);
	};
	const changeLanguage = event => {
		event.preventDefault();

		localStorage.setItem('language', language);
		const lng = localStorage.getItem('language');
		i18n.changeLanguage(lng);
	};

	return (
		<form className={'company-registration-form margin-top-20'} onSubmit={changeLanguage}>
			<div className={'form__field'}>
				<div className={'form-text margin-bottom-20'}>
					<span>{t('CHANGE_LANGUAGE_INFO')}</span>
				</div>
			</div>
			<div className={'form__field'}>
				<Field
					name="language"
					value="English"
					component={SelectDropdown}
					label={t('DEFAULT_LANGUAGE_LABEL')}
					onChange={handleChange}
					options={languages}
				/>
			</div>

			<div className={'form__field'}>
				<Button type={'submit'} variant="contained" color={'primary'} name={t('SAVE_CHANGES')} />
			</div>
		</form>
	);
};
export default reduxForm({
	form: 'changeLanguage',
})(Language);
