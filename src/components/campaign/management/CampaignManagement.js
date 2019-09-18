// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomExpansionPanel from '../../common/expansionPanel/CustomExpansionPanel';
import SuccessScreen from '../../auth/partials/SuccessScreen';
import Button from '../../common/button/Button';
import { steps } from './constants/steps';
import * as topics from './constants/topics';
import { panelContent } from './constants/general';
import CampaignBasic from './partials/CampaignBasic';
import CampaignBrand from './partials/CampaignBrand';
import CampaignTopic from './partials/CampaignTopic';
import Documents from './partials/Documents';
import SideNavigation from '../../common/sideNavigation/SideNavigation';
import { getUserCompany } from '../../../state/company/actions';
import {
	getCurrentCampaign,
	setStep,
	openCampaignOverview,
	getPlatformSettings,
	campaignSubmitForReview,
} from '../../../state/campaign/actions';
import TeamMembers from './views/TeamMembers';
import ShareHolders from './views/ShareHolders';
import CampaignPreview from './partials/CampaignPreview';
import { states } from '../../../constants/campaignStates';
import { USER_DASHBOARD } from '../../../constants/routes';
import Checkbox from '../../common/checkbox/Checkbox';
import { generateEntrepreneurContract } from '../../../state/documents/actions';
import { openModalCampaignDocumentPreview, closeModalCampaignDocumentPreview } from '../../../state/modals/actions';

const STEPS_NUMBER = 12;

type PropsT = {
	step: number,
	location: any,
	history: any,
	getUserCompany: Function,
	getCurrentCampaign: Function,
	step: number,
	location: any,
	exists: boolean,
	setStep: Function,
	isOpen: boolean,
	openCampaignOverview: Function,
	currentInfo: any,
	getPlatformSettings: Function,
	userId: number,
	campaignSubmitForReview: Function,
	generateEntrepreneurContract: Function,
	openModalCampaignDocumentPreview: Function,
	closeModalCampaignDocumentPreview: Function,
	contract: any,
};

const CampaignManagement = (props: PropsT) => {
	const {
		step,
		location: { hash },
		history,
		getUserCompany,
		getCurrentCampaign,
		exists,
		setStep,
		isOpen,
		openCampaignOverview,
		currentInfo,
		getPlatformSettings,
		userId,
		campaignSubmitForReview,
		contract,
	} = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		getUserCompany();
		getCurrentCampaign(userId);
		props.getPlatformSettings();
		history.push('#about');
	}, []);

	useEffect(() => {
		currentInfo.state &&
			currentInfo.state !== states.INITIAL &&
			currentInfo.state !== states.REVIEW_READY &&
			history.push(USER_DASHBOARD);
	}, [currentInfo.state]);

	useEffect(() => {
		if (contract.success) {
			if (contract.signed) {
				props.campaignSubmitForReview(currentInfo.urlFriendlyName);
				history.push(USER_DASHBOARD);
			} else {
				props.openModalCampaignDocumentPreview({
					title: t('INITIAL_AGREEMENT'),
					signAction: () => {
						props.campaignSubmitForReview(currentInfo.urlFriendlyName);
						props.closeModalCampaignDocumentPreview();
						history.push(USER_DASHBOARD);
					},
				});
			}
		}
	}, [contract.success]);

	const sideOptionClick = step => {
		setStep(step);
	};

	return (
		<Fragment>
			{step === STEPS_NUMBER + 1 ? (
				<SuccessScreen title={t('YOU_ALL_SET_UP')} body={t('YOU_CAN_EDIT_INFO')}>
					<Fragment>
						<div className={'successScreen_content'}>
							<Checkbox
								input={{ name: 'agree' }}
								label={<span className={'checkbox_label'}>{t('CAMPAIGN_SUCCESS_SCREEN_CHECKBOX')}</span>}
								checked
							/>
						</div>
						<div className={'buttons'}>
							<span onClick={() => setStep(step - 1)}>{t('BACK')}</span>
							<Button
								type={'button'}
								variant={'contained'}
								color={'primary'}
								name={t('CAMPAIGN_SUCCESS_SCREEN_BTN')}
								onClick={props.generateEntrepreneurContract}
							/>
						</div>
					</Fragment>
				</SuccessScreen>
			) : (
				<Fragment>
					<div className={'campaign__form'}>
						<div className={'step'}>
							{t('STEP')} {step}/{STEPS_NUMBER}
						</div>
						<div className={'about__company__info'}>
							<span>{t(steps.get(step).title)}</span>
							<pre>{t(steps.get(step).detail)}</pre>
						</div>
						{hash === '#about' && <CampaignBasic update={exists} />}
						{hash === '#brand' && <CampaignBrand />}
						{hash === '#overview' && <CampaignTopic topicType={topics.OVERVIEW} />}
						{hash === '#problem' && <CampaignTopic topicType={topics.PROBLEM} />}
						{hash === '#solution' && <CampaignTopic topicType={topics.SOLUTION} />}
						{hash === '#market' && <CampaignTopic topicType={topics.MARKET} />}
						{hash === '#traction' && <CampaignTopic topicType={topics.TRACTION} />}
						{hash === '#updates' && <CampaignTopic topicType={topics.UPDATES} />}
						{hash === '#team' && <TeamMembers />}
						{hash === '#investors' && <ShareHolders />}
						{hash === '#risks' && <CampaignTopic topicType={topics.RISK_AND_COMPETITION} />}
						{hash === '#documents' && <Documents />}
						<CampaignPreview
							open={isOpen}
							close={() => openCampaignOverview({ open: false, hash: '' })}
							info={currentInfo}
						/>
					</div>
					<SideNavigation action={sideOptionClick} hash={hash} />
					<div className={'panels'}>
						<CustomExpansionPanel options={panelContent} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => {
	const {
		auth: {
			authentication: { userId },
		},
		campaign: {
			createCampaign: { step },
			currentInfo,
			activeCampaign: { exists },
			campaignOverview: { isOpen },
			campaignSubmitForReview: { contract },
		},
	} = state;
	return {
		step,
		currentInfo,
		exists,
		isOpen,
		userId,
		contract,
	};
};

export default connect(
	mapStateToProps,
	{
		getUserCompany,
		getCurrentCampaign,
		setStep,
		openCampaignOverview,
		getPlatformSettings,
		campaignSubmitForReview,
		generateEntrepreneurContract,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
	},
)(CampaignManagement);
