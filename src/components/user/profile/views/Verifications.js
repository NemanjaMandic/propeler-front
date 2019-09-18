// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from '@material-ui/core/Icon';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import RadioButton from '../../../common/radioButton/RadioButton';
import Button from '../../../common/button/Button';
import {
	uploadKycBackPhoto,
	uploadKycFrontPhoto,
	submitKYCRequest,
	deleteKYCBackPhoto,
	deleteKYCFrontPhoto,
	uploadKYCCompanyInvestorDocument,
	removeUploadedKYCCompanyDocument,
} from '../../../../state/user/profile/actions';
import { confirmModal } from '../../../../state/modals/actions';
import UploadDocument from '../../../common/uploadDocument/UploadDocument';
import * as colors from '../../../../styles/modules/colors.scss';
import { ROLE_CORPORATE_INVESTOR } from '../../../../constants/roles';
import CustomSnackbar from '../../../common/snackbar/CustomSnackbar';

type PropsT = {
	kycFrontPhoto: any,
	kycBackPhoto: any,
	uploadKycFrontPhoto: Function,
	uploadKycBackPhoto: Function,
	submitKYCRequest: Function,
	deleteKYCFrontPhoto: Function,
	deleteKYCBackPhoto: Function,
	uploadKYCCompanyInvestorDocument: Function,
	removeUploadedKYCCompanyDocument: Function,
	confirmModal: Function,
	role: string,
	kycCurrentUser: any,
};

const Verifications = (props: PropsT) => {
	const {
		kycFrontPhoto,
		kycBackPhoto,
		uploadKycFrontPhoto,
		uploadKycBackPhoto,
		submitKYCRequest,
		deleteKYCFrontPhoto,
		deleteKYCBackPhoto,
		confirmModal,
		uploadKYCCompanyInvestorDocument,
		kycCompanyInvestorDocument,
		removeUploadedKYCCompanyDocument,
		role,
		kycCurrentUser,
	} = props;
	const [t] = useTranslation('translations');

	const [politicallyExposed, setPoliticallyExposed] = useState(null);

	useEffect(() => {
		setPoliticallyExposed(kycCurrentUser.politicallyExposed);
	}, [kycCurrentUser.politicallyExposed]);

	const show = role === ROLE_CORPORATE_INVESTOR || false;

	const uploadDocumentVerification = inProgress => {
		return (
			kycCurrentUser.requestState !== 'PENDING' && (
				<UploadDocument
					title={t('UPLOAD_DOCUMENT')}
					backgroundColor={colors.white}
					border={'dashed'}
					inProgress={inProgress}
					textColor={colors.lightBlue}
					width={180}
					upload={uploadKYCCompanyInvestorDocument}
				/>
			)
		);
	};

	const renderSubmitedDocuments = files => {
		return (
			files.length > 0 &&
			files.map(doc => (
				<div className={'submitted__doc'} key={files.indexOf(doc)}>
					<div className={'submitted__doc__name'}>{doc.title}</div>
					{kycCurrentUser.requestState !== 'PENDING' && (
						<div>
							<Icon
								className={'icon_class'}
								onClick={() =>
									confirmModal({
										open: true,
										title: t('DOCUMENT_DELETION'),
										subtitle: t('CONFIRM_DOC_DELETION'),
										actionLabel: t('DELETE'),
										cancelLabel: t('CANCEL'),
										actionMethod: removeUploadedKYCCompanyDocument,
										actionParams: doc,
									})
								}
							>
								close
							</Icon>
						</div>
					)}
				</div>
			))
		);
	};

	const submit = () => {
		const documents = [];
		if (kycFrontPhoto.fileDto.url)
			documents.push({
				url: kycFrontPhoto.fileDto.url,
				type: 'USER_KYC',
				name: 'KycFrontPhoto',
			});
		if (kycBackPhoto.fileDto.url)
			documents.push({
				url: kycBackPhoto.fileDto.url,
				type: 'USER_KYC',
				name: 'KycBackPhoto',
			});
		if (kycCompanyInvestorDocument.files.length > 0)
			kycCompanyInvestorDocument.files.map(doc =>
				documents.push({
					url: doc.url,
					type: 'CORPORATE_INVESTOR_KYC',
					name: doc.title,
				}),
			);

		submitKYCRequest({ politicallyExposed, documents });
	};

	const renderCompanyDocuments = () => {
		return (
			<div className={'change__profile__form verification'}>
				<span>{t('COMPANY_DOCUMENTS').toUpperCase()}</span>
				<div>
					<span>{t('VERIFICATION_COMPANY_INFO')}</span>
					<span>{t('VERIFICATION_COMPANY_REQ')} </span>
				</div>

				<div className={'verification_upload'}>
					{uploadDocumentVerification(false)}
					{renderSubmitedDocuments(kycCompanyInvestorDocument.files)}
				</div>
			</div>
		);
	};

	return (
		<div className={'change__profile__form verification'}>
			<span>{t('PERSONAL_DOCUMENTS')}</span>
			<div>
				<span>{t('VERIFICATION_INFO')}</span>
				<span>{t('VERIFICATION_REQ')} </span>
				<div>
					<span>• {t('PHOTO')}</span>
					<span>• {t('FULL_NAME')} </span>
					<span>• {t('DOB')}</span>
					<span>• {t('PERMANENT_RESIDENTIAL')}</span>
				</div>
			</div>
			<div className={'upload_photos'}>
				<UploadPhoto
					name={'profile_image'}
					size={'rectangle'}
					uploadPhoto={uploadKycFrontPhoto}
					deletePhoto={deleteKYCFrontPhoto}
					fileDto={kycFrontPhoto.fileDto}
					inProgress={kycFrontPhoto.inProgress}
					confirmDelete={confirmModal}
					disable={kycCurrentUser.requestState === 'PENDING'}
				/>
				<UploadPhoto
					name={'profile_image'}
					size={'rectangle'}
					uploadPhoto={uploadKycBackPhoto}
					deletePhoto={deleteKYCBackPhoto}
					fileDto={kycBackPhoto.fileDto}
					inProgress={kycBackPhoto.inProgress}
					confirmDelete={confirmModal}
					disable={kycCurrentUser.requestState === 'PENDING'}
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
						disabled={kycCurrentUser.requestState === 'PENDING'}
					/>
					<RadioButton
						label={'No'}
						checked={politicallyExposed === false}
						onChange={() => setPoliticallyExposed(false)}
						disabled={kycCurrentUser.requestState === 'PENDING'}
					/>
				</div>
			</div>
			{role === ROLE_CORPORATE_INVESTOR && renderCompanyDocuments()}

			<div className={'verification_button'}>
				<Button
					onClick={submit}
					variant="contained"
					color={'primary'}
					name={t('SUBMIT')}
					disabled={
						politicallyExposed === null ||
						(!kycFrontPhoto.fileDto.url && !kycBackPhoto.fileDto.url) ||
						(kycCurrentUser.requestState === 'PENDING' ||
							(kycCurrentUser.requestState === 'PENDING' && kycCurrentUser.auditorId != null)) ||
						(show && kycCompanyInvestorDocument.files.length === 0)
					}
				/>
			</div>
			<div>
				<CustomSnackbar />
			</div>
		</div>
	);
};
const mapStateToProps = ({
	user: {
		profile: { kycFrontPhoto, kycBackPhoto, kycCompanyInvestorDocument, kycCurrentUser },
	},
	auth: {
		authentication: { userId, isAuthenticated, role },
	},
}) => ({
	userId,
	isAuthenticated,
	role,
	kycFrontPhoto,
	kycBackPhoto,
	kycCompanyInvestorDocument,
	kycCurrentUser,
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
		uploadKYCCompanyInvestorDocument,
		removeUploadedKYCCompanyDocument,
	},
)(Verifications);
