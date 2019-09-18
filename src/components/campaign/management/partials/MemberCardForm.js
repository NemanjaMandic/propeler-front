// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../common/input/Input';
import Button from '../../../common/button/Button';
import { required } from '../../../../utilities/validators';

type PropsT = {
	handleSubmit: Function,
	toggleForm: Function,
	updateItem: Function,
	pristine: boolean,
	invalid: boolean,
	removeItem: Function,
	initialValues: any,
};

const MemberCardForm = (props: PropsT) => {
	const { handleSubmit, updateItem, pristine, invalid, removeItem, toggleForm, initialValues } = props;

	const discard = () => {
		if (initialValues.initial) {
			removeItem();
		}
		toggleForm();
	};

	const submit = data => {
		if (!pristine && !invalid) {
			updateItem(data);
		}
		toggleForm();
	};

	const [t] = useTranslation('translations');

	return (
		<form autoComplete="off" onSubmit={handleSubmit(submit)}>
			<div className={'member_container'}>
				<div>
					<Field name={`name`} component={Input} label={t('MEMBER_NAME')} type="text" validate={[required]} autoFocus />
					<Field name={`title`} component={Input} label={t('MEMBER_TITLE')} type="text" />
					<Field
						name={`description`}
						component={Input}
						multiline
						rows="4"
						label={t('MEMBER_DESCRIPTION')}
						type="text"
					/>
				</div>
				<div style={{ marginBottom: 56 }}>
					<Field name={`linkedinUrl`} component={Input} label={t('LINKEDIN_PROFILE_URL')} type="text" />
					<Field name={`twitterUrl`} component={Input} label={t('TWITTER_PROFILE_URL')} type="text" />
					<Field name={`facebookUrl`} component={Input} label={t('FACEBOOK_PROFILE_URL')} type="text" />
					<Field name={`customProfileUrl`} component={Input} label={t('ADD_CUSTOM_PROFILE_URL')} type="text" />
					<div className={'buttons'}>
						<span onClick={discard}>{t('DISCARD')}</span>
						<Button type={'submit'} variant={'contained'} color={'primary'} name={t('SAVE')} />
					</div>
				</div>
			</div>
		</form>
	);
};

export default reduxForm({
	form: 'MemberCardForm',
})(MemberCardForm);
