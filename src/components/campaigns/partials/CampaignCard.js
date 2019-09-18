// @flow

import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { history } from '../../../store/configureStore';
import { getDaysLeft } from '../../../utilities/campaignUtils';
import * as routes from '../../../constants/routes';
import { ROLE_CORPORATE_INVESTOR, ROLE_ENTREPRENEUR, ROLE_INDIVIDUAL_INVESTOR } from '../../../constants/roles';
import { investDialog, confirmModal } from '../../../state/modals/actions';
import { getPlatformSettings } from '../../../state/campaign/actions';
import { states } from '../../../constants/campaignStates';
import Tooltip from '../../common/tooltip/Tooltip';

type PropsT = {
	info: Object,
	platformCurrency: Object,
	getPlatformSettings: Function,
	isAuthenticated: boolean,
	role: any,
	investDialog: Function,
	confirmModal: Function,
	kycCurrentUser: any,
};

const CampaignCard = (props: PropsT) => {
	const {
		info,
		isAuthenticated,
		role,
		investDialog,
		confirmModal,
		platformCurrency,
		getPlatformSettings,
		kycCurrentUser,
	} = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		getPlatformSettings();
	}, []);

	const coverImage = info.coverImage ? `data:image/jpeg;base64,${info.coverImage}` : '';
	const logoImage = info.logoImage ? `data:image/jpeg;base64,${info.logoImage}` : '';

	const { symbol } = platformCurrency;
	const kycApproved =
		kycCurrentUser && (kycCurrentUser.requestState === 'KYC_APPROVAL' || kycCurrentUser.requestState === 'APPROVED');
	const disableInvestButton = !kycApproved && (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR);

	const getTooltipText = () => {
		let text = '';
		if (kycCurrentUser && kycCurrentUser.requestState === 'PENDING') text = t('USER_KYC_PENDING');
		else text = t('USER_KYC');

		return text;
	};

	const invest = () => {
		if (isAuthenticated) {
			if (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR) {
				if (kycApproved) investDialog({ open: true, campaign: info });
			} else {
				confirmModal({
					open: true,
					title: t('ATTENTION'),
					subtitle: t('ATTENTION_INFO'),
					cancelLabel: t('OK'),
				});
			}
		} else {
			history.push(routes.REGISTER);
		}
	};

	return (
		<Fragment>
			<div>
				<div className="campaigns-cards--project-card">
					<div
						className="campaigns-cards--project-card-image"
						style={info.coverImage ? { backgroundImage: `url(${coverImage})` } : {}}
					>
						<div className="campaigns-cards--project-card-tag">{info.tag}</div>
						<div
							className="campaigns-cards--project-card-project-icon"
							style={info.logoImage ? { backgroundImage: `url(${logoImage})` } : {}}
						/>
					</div>
					<div className="campaigns-cards--project-card-project-info">
						<span className="campaigns-cards--project-card-location">{info.location}</span>
						<span className="campaigns-cards--project-card-title">{info.name}</span>
						<p className="campaigns-cards--project-card-info-text">{info.tagLine}</p>
						<div className="campaigns-cards--project-card-row">
							<div className="campaigns-cards--project-card-statistic">
								<span>
									{info.fundingGoals}
									{symbol}
								</span>
								<span>{t('TARGET')}</span>
							</div>
							<div className="campaigns-cards--project-card-statistic">
								<span>
									{info.collectedAmount}
									{symbol}
								</span>
								<span>{t('RAISED')}</span>
							</div>
							<div className="campaigns-cards--project-card-statistic">
								<span>{getDaysLeft(info)}</span>
							</div>
						</div>
					</div>
					<div
						className="campaigns-cards--project-card-clicker"
						onClick={() => history.push({ pathname: `/overview/${info.urlFriendlyName}` })}
					/>
					{info.state !== states.SUCCESSFUL ? (
						<button className="campaigns-cards--project-card_btn-invest" onClick={invest}>
							{t('INVEST_IN_THIS_OFFER')}
						</button>
					) : (
						<button
							className="campaigns-cards--project-card_btn-invest-completed"
							onClick={() => history.push({ pathname: `/overview/${info.urlFriendlyName}` })}
						>
							{t('VIEW_OFFER')}
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { isAuthenticated, role },
	},
	campaign: {
		platformSettings: {
			settings: { platformCurrency },
		},
	},
	user: {
		profile: { kycCurrentUser },
	},
}) => ({
	isAuthenticated,
	role,
	platformCurrency,
	kycCurrentUser,
});
export default connect(
	mapStateToProps,
	{ investDialog, confirmModal, getPlatformSettings },
)(CampaignCard);
