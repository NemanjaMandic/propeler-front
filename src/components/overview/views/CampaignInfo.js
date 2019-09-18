// @flow

import React, { useState, Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../../../constants/routes';
import Campaign from '../partials/Campaign';
import Documents from '../partials/Documents';
import Investors from '../partials/Investors';
import Updates from '../partials/Updates';
import SingleUpdate from '../partials/SingleUpdate';
import { history } from '../../../store/configureStore';
import { ROLE_ENTREPRENEUR } from '../../../constants/roles';
import { states } from '../../../constants/campaignStates';
import Tooltip from '../../common/tooltip/Tooltip';

type PropsT = {
	isInvestCtaVisible: boolean,
	openInvestmentDialog?: Function,
	preview?: boolean,
	campaign: Object,
	role: string,
	isOwner: boolean,
	kycApproved: boolean,
	investTooltip: string,
};

const CampaignInfo = ({
	isInvestCtaVisible,
	openInvestmentDialog,
	preview,
	campaign,
	role,
	pathname,
	isOwner,
	kycApproved,
	investTooltip,
}: PropsT) => {
	const campaignEditable =
		role === ROLE_ENTREPRENEUR && (campaign.state === states.INITIAL || campaign.state === states.REVIEW_READY);
	const updateEditable = role === ROLE_ENTREPRENEUR && campaign.state === states.ACTIVE;

	const [active, setActive] = useState('');
	const [t] = useTranslation('translations');

	const navHandler = (location = '') => {
		setActive(location);
		if (!preview) {
			history.push(`/overview/${campaign.urlFriendlyName}/${location}`);
		}
	};

	useEffect(() => {
		if (!preview) {
			const location = pathname.split('/').slice(-1)[0];
			if (['', 'documents', 'investors'].indexOf(location) !== -1) {
				setActive(location);
			}
		}
	});

	return (
		<section className="overview-campaignInfo">
			<div className="overview-campaignInfo--navigation">
				<ul>
					<li
						className={active === '' ? 'overview-campaignInfo--navigation_active' : undefined}
						onClick={() => navHandler('')}
					>
						{t('CAMPAIGN')}
					</li>
					<li
						className={active === 'documents' ? 'overview-campaignInfo--navigation_active' : undefined}
						onClick={() => navHandler('documents')}
					>
						{t('Documents')}
					</li>
					<li
						className={active === 'investors' ? 'overview-campaignInfo--navigation_active' : undefined}
						onClick={() => navHandler('investors')}
					>
						{t('INVESTORS')}
					</li>
					{(campaign.state === 'ACTIVE' || campaign.state === 'LEAD_INVESTMENT') && (
						<li
							className={active === 'updates' ? 'overview-campaignInfo--navigation_active' : undefined}
							onClick={() => navHandler('updates')}
						>
							{t('UPDATES')}
						</li>
					)}
				</ul>
				{!isInvestCtaVisible && campaign.state !== states.COMPLETED && !isOwner && (
					<Tooltip title={!kycApproved ? investTooltip : ''} placement={'bottom'}>
						<button
							onClick={() => (kycApproved ? openInvestmentDialog() : {})}
							className={!kycApproved ? 'disabled_invest_btn' : ''}
						>
							Invest
						</button>
					</Tooltip>
				)}
			</div>
			<div className="overview-campaignInfo--content">
				{!preview ? (
					<Switch>
						<Route
							exact
							path={routes.OVERVIEW}
							render={() => <Campaign preview={preview} editable={campaignEditable} />}
						/>
						<Route
							exact
							path={routes.OVERVIEW_DOCUMENTS}
							render={() => <Documents preview={preview} editable={campaignEditable} />}
						/>
						<Route
							exact
							path={routes.OVERVIEW_INVESTORS}
							render={() => <Investors preview={preview} editable={campaignEditable} />}
						/>
						<Route
							exact
							path={routes.OVERVIEW_UPDATES}
							render={() => <Updates preview={preview} editable={updateEditable} />}
						/>
						<Route
							exact
							path={routes.OVERVIEW_UPDATES_SINGLE}
							render={props => (
								<SingleUpdate campaign={campaign} preview={preview} {...props} editable={updateEditable} />
							)}
						/>
					</Switch>
				) : (
					<Fragment>
						{active === '' && <Campaign preview={preview} />}
						{active === 'documents' && <Documents preview={preview} />}
						{active === 'investors' && <Investors preview={preview} />}
						{active === 'updates' && <Updates preview={preview} />}
					</Fragment>
				)}
			</div>
		</section>
	);
};

export default CampaignInfo;
