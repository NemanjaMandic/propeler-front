// @flow

import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Input from '../../../common/input/Input';
import Switch from '../../../common/switch/Switch';
import { required } from '../../../../utilities/validators';
import {
	changeUserProfile,
	deleteProfilePhoto,
	recoveryCode,
	uploadProfilePhoto,
} from '../../../../state/user/profile/actions';
import { openSecretDialog, open2FADialog } from '../../../../state/2FA/actions';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import SelectDropdown from '../../../common/select/Select';
import { countries } from '../../../../constants/countries';
import { usePrevious } from '../../../../services/usePrevious';

export type PersonDataT = {
	address: 'string',
	city: 'string',
	countryForTaxation: 'string',
	countryOfResidence: 'string',
	firstName: 'string',
	lastName: 'string',
	phoneNumber: 'string',
};

type PropsT = {
	invalid: boolean,
	changeUserProfile: Function,
	openSecretDialog: Function,
	handleSubmit: Function,
	uploadProfilePhoto: Function,
	deleteProfilePhoto: Function,
	userId: string,
	profilePhoto: Object,
	info: Object,
	open2FADialog: Function,
};

const onSubmit = (changeUserProfile, taxCountryVisibility, userId, data: *) => {
	const { countryForTaxation, ...submittedData } = data;
	submittedData.countryForTaxation = taxCountryVisibility ? countryForTaxation : submittedData.countryOfResidence;
	changeUserProfile({ userId, submittedData });
};

const Profile = (props: PropsT) => {
	const [taxCountryVisibility, setTaxCountryVisibility] = useState(false);
	const {
		handleSubmit,
		invalid,
		changeUserProfile,
		userId,
		info: { countryForTaxation, countryOfResidence },
		open2FADialog,
		openSecretDialog,
		uploadProfilePhoto,
		deleteProfilePhoto,
		profilePhoto: { fileDto, inProgress },
	} = props;
	const prevTaxCountry = usePrevious(countryForTaxation);
	const [t] = useTranslation('translations');

	useEffect(() => {
		if (prevTaxCountry !== countryForTaxation) {
			setTaxCountryVisibility(countryForTaxation !== countryOfResidence);
		}
	}, [countryForTaxation]);

	return (
		<div className={'change__profile__form'}>
			<UploadPhoto
				name={'profile_image'}
				size={'sm'}
				uploadPhoto={files => uploadProfilePhoto({ userId, files })}
				deletePhoto={() => deleteProfilePhoto(userId)}
				fileDto={fileDto}
				inProgress={inProgress}
				info={{
					maxImageSize: '4MB',
					accepts: 'JPG, PNG',
					tooltip: t('TOOLTIP_PROFILE_PICTURE'),
				}}
			/>
			<form onSubmit={handleSubmit((data: *) => onSubmit(changeUserProfile, taxCountryVisibility, userId, data))}>
				<div className={'form__field'}>
					<Field name={'username'} component={Input} label={t('USERNAME')} type="text" disabled />
				</div>
				<div className={'form__field'}>
					<Field name={'firstName'} component={Input} label={t('FIRST_NAME')} type="text" validate={[required]} />
				</div>
				<div className={'form__field'}>
					<Field name={'lastName'} component={Input} label={t('LAST_NAME')} type="text" validate={[required]} />
				</div>
				<div className={'form__field'}>
					<Field name={'email'} component={Input} label={t('EMAIL')} type="text" disabled />
				</div>
				<div className={'form__field'}>
					<Field name={'phoneNumber'} component={Input} label={t('PHONE_NUMBER_OPTIONAL')} type="text" />
				</div>
				<div className={'form__field'}>
					<Field name={'countryOfResidence'} component={SelectDropdown} label={t('COUNTRY')} options={countries} />
				</div>
				<div className={'tax__country__toggle'}>
					<Switch
						checked={taxCountryVisibility}
						className={`form__field--switch`}
						onChange={() => setTaxCountryVisibility(!taxCountryVisibility)}
					/>
					<div className={'toggle__text'}>{t('TAX_COUNTRY_QUESTION')}</div>
				</div>
				{taxCountryVisibility && (
					<div className={'form__field margin-top-20'}>
						<Field
							name={'countryForTaxation'}
							component={SelectDropdown}
							label={t('TAX_COUNTRY')}
							options={countries}
						/>
					</div>
				)}

				<div className={'form__field'}>
					<Field name="city" component={Input} label={t('CITY')} type="text" />
				</div>
				<div className={'form__field'}>
					<Field name="address" component={Input} label={t('ADDRESS')} type="text" />
				</div>
				<div className={'auth__links margin-bottom-20'}>
					{t('LOST_PHONE')}
					<span className="upload__link" onClick={() => open2FADialog({ action: recoveryCode })}>
						{t('RESET_RECOVERY_CODES')}
					</span>
					{t('OR')}
					<span className="upload__link" onClick={openSecretDialog}>
						{t('CHANGE_SECRET_KEY')}
					</span>
					{t('BACK_TO_PROPELER_ACCOUNT')}
				</div>
				<div className={'auth__links margin-bottom-60'}>
					{t('YOU_CAN_ALSO')}{' '}
					<span className="upload__link" onClick={() => open2FADialog({ action: recoveryCode })}>
						{t('GET_NEW_CODES')}
					</span>{' '}
					{t('ALREADY_USED')}
				</div>
				<div className={'form__field'}>
					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						className={'button__primary'}
						disabled={invalid}
					>
						{t('SAVE_CHANGES')}
					</Button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = ({
	user: {
		profile: { info, getProfilePhoto },
	},
	auth: {
		authentication: { userId, username },
	},
}) => ({
	initialValues: { ...info, username },
	info,
	userId,
	profilePhoto: getProfilePhoto,
});

export default compose(
	connect(
		mapStateToProps,
		{
			changeUserProfile,
			open2FADialog,
			openSecretDialog,
			uploadProfilePhoto,
			deleteProfilePhoto,
		},
	),
	reduxForm({
		form: 'ChangeProfile',
		enableReinitialize: true,
	}),
)(Profile);
