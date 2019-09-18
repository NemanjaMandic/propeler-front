// @flow

import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { GENERATE_TWO_FA_URI } from '../../../../../constants/twoFA';
import Input from '../../../../common/input/Input';
import { required } from '../../../../../utilities/validators';
import Button from '../../../../common/button/Button';

type PropsT = {
	secret: string,
	step: boolean,
	handleSubmit: Function,
};

const Step2 = (props: PropsT) => {
	const [t] = useTranslation('translations');

	return (
		<Fragment>
			{props.step && <p>{t('STEP2')}</p>}
			<p>
				{t('ADD_REALMARKET_ACC')}
				<br />
				{t('TWO_METHODS')}
				<br />
				<strong>{t('ENTER_KEY')}</strong>
				{t('OR')}
				<strong>{t('SCAN_CODE')}</strong>
			</p>
			<form onSubmit={props.handleSubmit}>
				<div className="two-factor--step2_form">
					<div className={'two-factor--qrcode_wrapper'}>
						<QRCode value={GENERATE_TWO_FA_URI(props.secret)} size={150} className={'two-factor--qrcode'} />
					</div>

					<div className="two-factor--step2_form-content">
						<div className="two-factor--step2_form-content--key">
							<div>{t('16DIG_KEY')}</div>
							<strong>{props.secret}</strong>
						</div>
						<div className="two-factor--step2_form-content--form">
							<Field
								name="code"
								size="medium"
								component={Input}
								label={t('AUTH_CODE')}
								type="text"
								validate={[required]}
								autoFocus
							/>
						</div>
					</div>
				</div>
				{!props.step && (
					<div className={'cancel-ok__buttons'}>
						<Button type={'submit'} variant={'contained'} color={'primary'} name={`Submit`} />
					</div>
				)}
			</form>
		</Fragment>
	);
};

export default reduxForm({
	form: 'Tfa',
})(Step2);
