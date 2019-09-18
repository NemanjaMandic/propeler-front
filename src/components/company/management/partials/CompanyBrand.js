// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import {
	getCompanyLogo,
	uploadCompanyLogo,
	deleteCompanyLogo,
	getFeaturedImage,
	uploadFeaturedImage,
	deleteFeaturedImage,
	stepBack,
	stepNext,
} from '../../../../state/company/actions';
import Button from '../../../common/button/Button';

type PropsT = {
	getCompanyLogo: Function,
	uploadCompanyLogo: Function,
	deleteCompanyLogo: Function,
	getFeaturedImage: Function,
	uploadFeaturedImage: Function,
	deleteFeaturedImage: Function,
	id: number,
	logo: {
		inProgress: boolean,
		fileDto: Object,
	},
	featuredImage: {
		inProgress: boolean,
		fileDto: Object,
	},
	featuredImageUrl?: string,
	logoUrl?: string,
	stepBack: Function,
	stepNext: Function,
};

const CompanyBrand = (props: PropsT) => {
	const {
		getCompanyLogo,
		uploadCompanyLogo,
		deleteCompanyLogo,
		getFeaturedImage,
		uploadFeaturedImage,
		deleteFeaturedImage,
		id,
		logo,
		featuredImage,
		logoUrl,
		featuredImageUrl,
		stepBack,
		stepNext,
	} = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		if (!featuredImage.fileDto.file && featuredImageUrl) {
			getFeaturedImage(id);
		}
		if (!logo.fileDto.file && logoUrl) {
			getCompanyLogo(id);
		}

		// addSnackbarOption({key: COMPANY_BRAND, content: {variant: "warning", message: t("WARNING_COMPANY_BRAND")}});
		//
		// return function cleanup() {
		//   removeSnackbarOption({ key: COMPANY_BRAND});
		// };
	}, []);

	return (
		<div>
			<div className={'company__wizard-images'}>
				<UploadPhoto
					name={'featured_image'}
					size={'lg'}
					uploadPhoto={files => uploadFeaturedImage({ id, files })}
					deletePhoto={() => deleteFeaturedImage(id)}
					fileDto={featuredImage.fileDto}
					inProgress={featuredImage.inProgress}
					helperText={t('IMAGE_SIZE_BRAND_COMPANY_1160')}
					gradient={'rgba(0, 0, 0, 0.25)'}
				/>
				<div className={'company__wizard-logo'}>
					<UploadPhoto
						name={'logo'}
						uploadPhoto={files => uploadCompanyLogo({ id, files })}
						deletePhoto={() => deleteCompanyLogo(id)}
						fileDto={logo.fileDto}
						inProgress={logo.inProgress}
						helperText={t('IMAGE_SIZE_BRAND_COMPANY_180')}
					/>
				</div>
			</div>
			<div className={'buttons'}>
				<span onClick={stepBack}>{t('BACK')}</span>
				<Button
					type={'button'}
					variant={'contained'}
					color={'primary'}
					name={t('SAVE_AND_CONTINUE')}
					onClick={stepNext}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = ({
	company: {
		info: { id, featuredImageUrl, logoUrl },
		logo,
		featuredImage,
	},
}) => ({
	id,
	logo,
	featuredImage,
	featuredImageUrl,
	logoUrl,
});

export default connect(
	mapStateToProps,
	{
		getCompanyLogo,
		uploadCompanyLogo,
		deleteCompanyLogo,
		getFeaturedImage,
		uploadFeaturedImage,
		deleteFeaturedImage,
		stepBack,
		stepNext,
	},
)(CompanyBrand);
