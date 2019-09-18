// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import {
	uploadCampaignMarketImage,
	getCampaignMarketImage,
	deleteCampaignMarketImage,
	setStep,
} from '../../../../state/campaign/actions';
import Button from '../../../common/button/Button';

type PropsT = {
	uploadCampaignMarketImage: Function,
	getCampaignMarketImage: Function,
	deleteCampaignMarketImage: Function,
	info: Object,
	marketImage: Object,
	setStep: Function,
	step: number,
};

const CampaignBrand = (props: PropsT) => {
	const {
		uploadCampaignMarketImage,
		deleteCampaignMarketImage,
		getCampaignMarketImage,
		info: { urlFriendlyName, marketImageUrl },
		marketImage,
		setStep,
		step,
	} = props;

	useEffect(() => {
		if (!marketImage.fileDto.file && marketImageUrl) {
			getCampaignMarketImage(urlFriendlyName);
		}
	}, []);

	const [t] = useTranslation('translations');

	return (
		<div className={'campaign__brand'}>
			<UploadPhoto
				name={'featured_image'}
				size={'md'}
				uploadPhoto={files => uploadCampaignMarketImage({ name: urlFriendlyName, files })}
				deletePhoto={() => deleteCampaignMarketImage(urlFriendlyName)}
				fileDto={marketImage.fileDto}
				inProgress={marketImage.inProgress}
				helperText={t('IMAGE_SIZE800x450')}
			/>
			<div className={'buttons'}>
				<span onClick={() => setStep(step - 1)}>{t('BACK')}</span>
				<span className={'skip__step'} onClick={() => setStep(step + 1)}>
					{t('SKIP_THIS_STEP')}
				</span>
				<Button
					type={'button'}
					variant={'contained'}
					color={'primary'}
					name={t('SAVE_AND_CONTINUE')}
					onClick={() => setStep(step + 1)}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const {
		campaign: {
			info,
			marketImage,
			createCampaign: { step },
		},
	} = state;
	return {
		info,
		marketImage,
		step,
	};
};

export default connect(
	mapStateToProps,
	{
		uploadCampaignMarketImage,
		getCampaignMarketImage,
		deleteCampaignMarketImage,
		setStep,
	},
)(CampaignBrand);
