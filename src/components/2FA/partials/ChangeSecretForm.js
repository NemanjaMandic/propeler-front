// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Input from '../../common/input/Input';
import { password, required } from '../../../utilities/validators';
import Button from '../../common/button/Button';
import { closeSecretDialog } from '../../../state/2FA/actions';

type PropsT = {
	handleSubmit: Function,
	closeSecretDialog: Function,
};

const ChangeSecretForm = (props: PropsT) => {
	const { handleSubmit, closeSecretDialog } = props;
	const [t] = useTranslation('translations');
	return (
		<form onSubmit={handleSubmit}>
			<div className={'form__field'}>
				<Field
					name="password"
					component={Input}
					label={t('CURRENT_PASSWORD')}
					type="password"
					validate={[required, password]}
					autoFocus
				/>
			</div>
			<div className={'cancel-ok__buttons'}>
				<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={closeSecretDialog} />
				<Button type={'submit'} variant={'contained'} color={'primary'} name={t('SUBMIT')} />
			</div>
		</form>
	);
};

export default compose(
	connect(
		null,
		{
			closeSecretDialog,
		},
	),
	reduxForm({
		form: 'ChangeSecretForm',
		enableReinitialize: true,
	}),
)(ChangeSecretForm);
