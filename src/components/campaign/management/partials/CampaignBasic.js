// @flow

import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import SelectDropdown from '../../../common/select/Select';
import { required, url, makeFriendlyUrl } from '../../../../utilities/validators';
import {
	createCampaign,
	setStep,
	createFriendlyUrl,
	updateCampaignInfo,
	checkCampaignName,
	setCurrentInfo,
} from '../../../../state/campaign/actions';
import { basicUrl } from '../constants/general';

export type CampaignDataT = {
	companyId: number,
	fundingGoals: number,
	marketImageUrl: string,
	maxEquityOffered: number,
	minEquityOffered: number,
	name: string,
	timeToRaiseFunds: number,
	urlFriendlyName: string,
};

type PropsT = {
	invalid: boolean,
	createCampaign: Function,
	handleSubmit: Function,
	createFriendlyUrl: Function,
	setStep: Function,
	campaignName: string,
	tagLine: boolean,
	pristine: boolean,
	companyId: number,
	updateCampaignInfo: Function,
	checkCampaignName: Function,
	available: boolean,
	urlFriendlyName: string,
	update: boolean,
	campaignName: string,
	step: number,
	setCurrentInfo: Function,
	currentInfo: any,
	platformSettings: any,
	modal: boolean,
	closeModal: Function,
};

const timeToRaiseFunds = [{ label: 30, value: 30 }, { label: 60, value: 60 }, { label: 90, value: 90 }];

const helperText = 'HELPER_TEXT_CAMPAIGN';

const onSubmit = (
	createCampaign,
	data: *,
	campaignName: string,
	setStep: Function,
	pristine: boolean,
	companyId: number,
	updateCampaignInfo,
	update,
	step,
	modal,
	closeModal,
) => {
	const { urlFriendlyName, ...campaignData } = data;
	campaignData.companyId = companyId;
	campaignData.urlFriendlyName = urlFriendlyName.substring(basicUrl.length, urlFriendlyName.length);

	if (update) {
		if (!pristine) {
			updateCampaignInfo(campaignData);
		}
	} else {
		createCampaign(campaignData);
	}
	if (!modal) {
		setStep(step + 1);
	}
	if (closeModal) {
		closeModal();
	}
};

const CampaignBasic = (props: PropsT) => {
	const {
		invalid,
		modal,
		closeModal,
		createCampaign,
		handleSubmit,
		setStep,
		pristine,
		companyId,
		updateCampaignInfo,
		available,
		urlFriendlyName,
		campaignName,
		setCurrentInfo,
		currentInfo,
		update,
		step,
		platformSettings,
	} = props;
	const [helper, setHelperText] = useState(false);
	const [friendlyUrl, setFriendlyUrl] = useState('');
	const { platformMinInvestment } = platformSettings;
	const [t] = useTranslation('translations');
	let type = 0;

	const copyToClipboard = () => {
		const content = friendlyUrl !== '' ? friendlyUrl : urlFriendlyName;
		navigator.clipboard.writeText(content).then(NotificationManager.success('Friendly url is copied', '', 3000));
	};

	const nameChanged = (event: any) => {
		const shortName = event.target.value;
		let url = {
			url: '',
			name: '',
		};

		if (type) clearTimeout(type);

		type = setTimeout(() => props.checkCampaignName(shortName), 500);

		if (shortName !== '') {
			setHelperText(true);
			url = { name: shortName, url: makeFriendlyUrl(shortName) };
			setFriendlyUrl(`${basicUrl}${url.url}`);
			const info = {
				...currentInfo,
				name: shortName,
				urlFriendlyName: url.name,
			};
			setCurrentInfo(info);
			props.createFriendlyUrl(url);
		} else {
			setHelperText(false);
			url = { url: '', name: '' };
			setFriendlyUrl('');
			props.createFriendlyUrl(url);
		}
	};

	const onChange = (event: any) => {
		const info = {
			...currentInfo,
			[event.target.name]: event.target.value,
		};
		setCurrentInfo(info);
	};

	return (
		<form
			onSubmit={handleSubmit((data: *) =>
				onSubmit(
					createCampaign,
					data,
					campaignName,
					setStep,
					pristine,
					companyId,
					updateCampaignInfo,
					update,
					step,
					modal,
					closeModal,
				),
			)}
			className="campaign-basic--form"
		>
			<div className={'form__field'}>
				<Field
					name="name"
					component={Input}
					label={t('CAMPAIGN_SERVICE_PRODUCT_NAME')}
					type="text"
					onChange={nameChanged}
					validate={[required]}
					errorMessage={!available && !update ? t('CAMPAIGN_ALREADY_EXISTS') : ''}
					disabled={update}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="urlFriendlyName"
					component={Input}
					label={basicUrl}
					type="text"
					end_icon="file_copy"
					iconAction={copyToClipboard}
					helperText={helper ? t(helperText) : ''}
					validate={[url, required]}
					disabled
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name={'tagLine'}
					component={Input}
					multiline
					rows="4"
					label={t('SET_CAMPAIGN_BRAND_TEXT')}
					type="text"
					maxLength={230}
					end_icon="info"
					validate={[required]}
					tooltip={t('TOOLTIP_CAMPAIGN_BRAND_TEXT')}
					autoFocus={props.tagLine}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="fundingGoals"
					component={Input}
					label={t('SET_FUNDING_GOALS')}
					type="number"
					min={0}
					firstLetter
					onChange={onChange}
					validate={[required]}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="minInvestment"
					component={Input}
					label={t('SET_MINIMAL_INVESTMENT_LEVEL')}
					type="number"
					min={platformMinInvestment}
					end_icon="info"
					firstLetter
					onChange={onChange}
					validate={[required]}
					tooltip={t('TOOLTIP_CAMPAIGN_BRAND_TEXT')}
				/>
			</div>
			<div className={'form__field'}>
				<Field
					name="timeToRaiseFunds"
					component={SelectDropdown}
					label={t('SET_TIME_TO_RAISE_FUNDS')}
					options={timeToRaiseFunds}
					onChange={onChange}
					validate={[required]}
				/>
			</div>
			<div className={'form__field__inline'}>
				<Field
					name="minEquityOffered"
					component={Input}
					label={t('MIN_OFFERED')}
					type="number"
					size={'small'}
					min={0}
					max={100}
					firstLetter
					onChange={onChange}
					validate={[required]}
				/>
				<Field
					name="maxEquityOffered"
					component={Input}
					label={t('MAX_OFFERED')}
					type="number"
					size={'small'}
					min={0}
					max={100}
					firstLetter
					onChange={onChange}
					validate={[required]}
				/>
			</div>
			{!modal ? (
				<div className={'form__field'} style={{ marginTop: '50px' }}>
					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						name={t('SAVE_AND_CONTINUE')}
						disabled={invalid || (!update && (campaignName === '' || !available))}
					/>
				</div>
			) : (
				<div className={'cards__buttons edit'}>
					<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={closeModal} />
					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						name={t('SAVE')}
						disabled={invalid || (!update && (campaignName === '' || !available))}
					/>
				</div>
			)}
		</form>
	);
};

export default compose(
	connect(
		({
			company,
			campaign: {
				info,
				currentInfo,
				checkName: { available },
				createCampaign: { step },
				platformSettings,
			},
		}) => ({
			initialValues: {
				...info,
				urlFriendlyName: `${info.name ? basicUrl : ''}${info.urlFriendlyName}`,
			},
			companyId: company.info.id,
			urlFriendlyName: info.urlFriendlyName,
			campaignName: info.name,
			platformSettings: platformSettings.settings,
			currentInfo,
			step,
			available,
		}),
		{
			createCampaign,
			setStep,
			createFriendlyUrl,
			updateCampaignInfo,
			checkCampaignName,
			setCurrentInfo,
		},
	),
	reduxForm({
		form: 'CampaignBasic',
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	}),
)(CampaignBasic);
