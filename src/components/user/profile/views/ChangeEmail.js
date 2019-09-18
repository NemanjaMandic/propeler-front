// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import { email, required } from '../../../../utilities/validators';
import { changeEmailProfile } from '../../../../state/user/profile/actions';

export type ChangeEmailT = {
	email: string,
};

type PropsT = {
	userId: number,
	invalid: boolean,
	handleSubmit: Function,
	changeEmailProfile: Function,
	inProgress: boolean,
};

const ChangeEmail = (props: PropsT) => {
	const { handleSubmit, invalid, changeEmailProfile, userId, inProgress } = props;
	const [t] = useTranslation('translations');

	return (
		<div className={'change__password__form'}>
			<form onSubmit={handleSubmit((data: ChangeEmailT) => changeEmailProfile({ userId, data }))}>
				<div className={'form__field'}>
					<Field
						name="email"
						component={Input}
						label={t('TYPE_EMAIL')}
						type="email"
						validate={[required, email]}
						autoFocus
					/>
				</div>
				<div className={'form__field'}>
					<Button
						type={'submit'}
						variant={'contained'}
						color={'primary'}
						disabled={invalid || inProgress}
						name={t('SAVE_CHANGES')}
					/>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = ({
	user: {
		profile: {
			info: { email },
			changeEmail: { inProgress },
		},
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	initialValues: { email },
	userId,
	inProgress,
});

export default compose(
	connect(
		mapStateToProps,
		{
			changeEmailProfile,
		},
	),
	reduxForm({
		form: 'ChangeEmail',
		enableReinitialize: true,
	}),
)(ChangeEmail);
