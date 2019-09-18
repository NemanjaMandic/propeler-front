// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit';
import InvestorCard from './InvestorCard';
import { getShareHolders, getShareHolderPhoto } from '../../../state/company/actions';
import { openEditCampaignDialog } from '../../../state/modals/actions';
import Tooltip from '../../common/tooltip/Tooltip';

type PropsT = {
	shareHolders: Array<{
		customProfileUrl: string,
		description: string,
		facebookUrl: string,
		id: number,
		investedAmount: number,
		linkedinUrl: string,
		location: string,
		name: string,
		photoUrl: string,
		twitterUrl: string,
		fileDto: {
			file: string,
			type: string,
		},
	}>,
	info: {
		companyId: any,
	},
	getShareHolders: Function,
	getShareHolderPhoto: Function,
	openEditCampaignDialog: Function,
	inProgress: boolean,
	editCampaign: { key: string },
	preview: boolean,
	editable: boolean,
	platformCurrency: any,
};

const Investors = ({
	info: { companyId },
	shareHolders,
	getShareHolders,
	getShareHolderPhoto,
	openEditCampaignDialog,
	inProgress,
	preview,
	editable,
	platformCurrency,
	editCampaign: { key },
}: PropsT) => {
	useEffect(() => {
		companyId && getShareHolders({ companyId });
	}, [companyId]);

	const [t] = useTranslation('translations');
	const shareHoldersFiltered = shareHolders ? shareHolders.filter(sh => sh.investedAmount > 0) : [];

	return (
		<div className="overview-campaignInfo--content-campaign">
			<div className={`overview-campaignInfo--content-section ${editable ? 'editable' : ''}`}>
				<div className={'overview-campaignInfo--content-title'}>
					<h1>{t('SHAREHOLDERS')}</h1>
					{editable && !preview && (
						<Tooltip title={t('EDIT_SECTION')} placement="right">
							<IconButton
								onClick={() => openEditCampaignDialog('investors')}
								className={key === 'investors' ? 'active-icon' : ''}
							>
								<Edit style={{ color: '#ACB6BF' }} />
							</IconButton>
						</Tooltip>
					)}
				</div>
				{inProgress && <CircularProgress />}
				<section className="overview-campaignInfo--content-investors">
					{shareHoldersFiltered.length > 0 ? (
						shareHoldersFiltered.map(investor => (
							<InvestorCard
								key={investor.id}
								person={investor}
								getShareHolderPhoto={() => getShareHolderPhoto({ companyId, id: investor.id })}
								preview={preview}
								platformCurrency={platformCurrency}
							/>
						))
					) : (
						<div style={{ paddingBottom: '20px' }}>{t('NO_INVESTORS_YET')}</div>
					)}
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = ({
	company: {
		shareHolders: { shareHolders, inProgress },
	},
	campaign: {
		info,
		platformSettings: {
			settings: { platformCurrency },
		},
	},
	modals: { editCampaign },
}) => ({
	shareHolders,
	info,
	inProgress,
	editCampaign,
	platformCurrency,
});

export default connect(
	mapStateToProps,
	{
		getShareHolders,
		getShareHolderPhoto,
		openEditCampaignDialog,
	},
)(Investors);
