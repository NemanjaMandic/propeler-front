// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UploadPhoto from '../../../../common/uploadPhoto/UploadPhoto';
import RadioButton from '../../../../common/radioButton/RadioButton';
import Button from '../../../../common/button/Button';
import {
	uploadKycBackPhoto,
	uploadKycFrontPhoto,
	submitKYCRequest,
	deleteKYCBackPhoto,
	deleteKYCFrontPhoto,
} from '../../../../../state/user/profile/actions';
import { confirmModal } from '../../../../../state/modals/actions';

type PropsT = {
	kycFrontPhoto: any,
	kycBackPhoto: any,
	uploadKycFrontPhoto: Function,
	uploadKycBackPhoto: Function,
	submitKYCRequest: Function,
	deleteKYCFrontPhoto: Function,
	deleteKYCBackPhoto: Function,
	kycRequestAction: any,
};

const Personal = (props: PropsT) => {
	const {
		kycFrontPhoto,
		kycBackPhoto,
		uploadKycFrontPhoto,
		uploadKycBackPhoto,
		submitKYCRequest,
		deleteKYCFrontPhoto,
		deleteKYCBackPhoto,
		confirmModal,
		kycRequestAction,
	} = props;
	const [t] = useTranslation('translations');
	const [politicallyExposed, setPoliticallyExposed] = useState(null);

	const submit = () => {
		const documentsUrl = [];
		if (kycFrontPhoto.fileDto.url) documentsUrl.push(kycFrontPhoto.fileDto.url);
		if (kycBackPhoto.fileDto.url) documentsUrl.push(kycBackPhoto.fileDto.url);

		submitKYCRequest({ politicallyExposed, documentsUrl });
	};

	return (
		<div className={'change__profile__form verification'}>
			<span>{t('VERIFICATION_TITLE')}</span>
			<div>
				<span>{t('VERIFICATION_INFO')}</span>
				<span>{t('VERIFICATION_REQ')} </span>
				<div>
					<span>• {t('PHOTO')}</span>
					<span>• {t('FULL_NAME')} </span>
					<span>• {t('DOB')}</span>
				</div>
			</div>
			<div className={'upload_photos'}>
				<UploadPhoto
					name={'profile_image'}
					size={'rectangle'}
					uploadPhoto={files => uploadKycFrontPhoto(files)}
					deletePhoto={deleteKYCFrontPhoto}
					fileDto={kycFrontPhoto.fileDto}
					inProgress={kycFrontPhoto.inProgress}
					confirmDelete={confirmModal}
					disable={
						kycRequestAction.response.requestState === 'PENDING' ||
						kycRequestAction.response.requestState === 'UNDER_REVIEW'
					}
				/>
				<UploadPhoto
					name={'profile_image'}
					size={'rectangle'}
					uploadPhoto={files => uploadKycBackPhoto(files)}
					deletePhoto={deleteKYCBackPhoto}
					fileDto={kycBackPhoto.fileDto}
					inProgress={kycBackPhoto.inProgress}
					confirmDelete={confirmModal}
					disable={
						kycRequestAction.response.requestState === 'PENDING' ||
						kycRequestAction.response.requestState === 'UNDER_REVIEW'
					}
				/>
			</div>
			<div className={'upload_photos_info'}>{t('PHOTO_INFO')}</div>
			<span>{t('POLITICAL_QUESTION')}</span>
			<div className={'political_info'}>
				<span>{t('POLITICAL_INFO')}</span>
				<span>{t('HERE')}</span>
				<div>
					<RadioButton
						label={'Yes'}
						checked={politicallyExposed === true}
						onChange={() => setPoliticallyExposed(true)}
						disabled={
							kycRequestAction.response.requestState === 'PENDING' ||
							kycRequestAction.response.requestState === 'UNDER_REVIEW'
						}
					/>
					<RadioButton
						label={'No'}
						checked={politicallyExposed === false}
						onChange={() => setPoliticallyExposed(false)}
						disabled={
							kycRequestAction.response.requestState === 'PENDING' ||
							kycRequestAction.response.requestState === 'UNDER_REVIEW'
						}
					/>
				</div>
			</div>
			<div className={'verification_button'}>
				<Button
					onClick={submit}
					variant="contained"
					color={'primary'}
					name={t('SUBMIT')}
					disabled={
						politicallyExposed === null ||
						(!kycFrontPhoto.fileDto.url && !kycBackPhoto.fileDto.url) ||
						(kycRequestAction.response.requestState === 'PENDING' ||
							kycRequestAction.response.requestState === 'UNDER_REVIEW')
					}
				/>
			</div>
		</div>
	);
};
const mapStateToProps = ({
	user: {
		profile: { kycFrontPhoto, kycBackPhoto, kycRequestAction },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	userId,
	kycFrontPhoto,
	kycBackPhoto,
	kycRequestAction,
});

export default connect(
	mapStateToProps,
	{
		uploadKycFrontPhoto,
		uploadKycBackPhoto,
		submitKYCRequest,
		deleteKYCFrontPhoto,
		deleteKYCBackPhoto,
		confirmModal,
	},
)(Personal);
