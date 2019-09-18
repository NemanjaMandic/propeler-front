// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import UpdateCard from './UpdateCard';
import { openUpdatesDialog } from '../../../state/modals/actions';
import Pagination from '../../common/pagination/Pagination';
import { getAllCampaignUpdatesPageable } from '../../../state/campaign/actions';

type PropsT = {
	preview: boolean,
	openUpdatesDialog: Function,
	campaignUpdates: any,
	getAllCampaignUpdatesPageable: Function,
	urlFriendlyName: string,
	editable: boolean,
	ownerId: number,
	userId: number,
};

const Updates = (props: PropsT) => {
	const {
		openUpdatesDialog,
		campaignUpdates: { updates },
		preview,
		getAllCampaignUpdatesPageable,
		urlFriendlyName,
		editable,
		userId,
		ownerId,
	} = props;
	const [t] = useTranslation('translations');
	const isOwner = userId === ownerId;
	return (
		<div className="overview-campaignInfo--content-campaign">
			<h1>{t('LATEST_UPDATES')}</h1>
			{!preview && editable && isOwner ? (
				<div className="overview-campaign-updates-new-update-button-wrapper">
					<Button
						className="overview-campaign-updates-new-update-button"
						onClick={() => openUpdatesDialog({ create: true, update: null })}
					>
						{t('WRITE_A_NEW_UPDATE')}
					</Button>
				</div>
			) : null}
			{updates.content.length > 0 && (
				<Fragment>
					<div className="overview-campaign-updates-container">
						{updates.content.map(update => {
							return (
								<UpdateCard
									preview={preview}
									update={update}
									key={update.id}
									urlFriendlyName={urlFriendlyName}
									edit={editable && isOwner}
								/>
							);
						})}
					</div>
					<Pagination
						currentPage={updates.number}
						totalPages={updates.totalPages}
						first={updates.first}
						last={updates.last}
						next={getAllCampaignUpdatesPageable}
						previous={getAllCampaignUpdatesPageable}
						actionParams={{ pageSize: 5, campaignName: urlFriendlyName }}
					/>
				</Fragment>
			)}
		</div>
	);
};
const mapStateToProps = ({
	campaign: {
		campaignUpdates,
		info: { urlFriendlyName },
	},
	company: {
		info: { ownerId },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	campaignUpdates,
	urlFriendlyName,
	ownerId,
	userId,
});

export default connect(
	mapStateToProps,
	{ openUpdatesDialog, getAllCampaignUpdatesPageable },
)(Updates);
