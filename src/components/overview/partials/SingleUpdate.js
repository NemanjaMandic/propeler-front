// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import draftToHtml from 'draftjs-to-html';
import CircularProgress from '@material-ui/core/CircularProgress';
import ModeComment from '@material-ui/icons/ModeComment';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '../../common/tooltip/Tooltip';
import { history } from '../../../store/configureStore';
import { getCampaignUpdate, clearCurrentCampaignUpdate } from '../../../state/campaign/actions';
import { openUpdatesDialog } from '../../../state/modals/actions';

type PropsT = {
	openUpdatesDialog: Function,
	preview: boolean,
	editable: boolean,
	currentUpdate: any,
	clearCurrentCampaignUpdate: Function,
};

const SingleUpdate = (props: PropsT) => {
	const { preview, editable, openUpdatesDialog, currentUpdate, getCampaignUpdate, clearCurrentCampaignUpdate } = props;
	const { name, id } = props.match.params;
	useEffect(() => {
		getCampaignUpdate({ updateId: id });
	}, []);

	const goBack = () => {
		history.push(history.push(`/overview/${name}/updates`));
		clearCurrentCampaignUpdate();
	};

	const [t] = useTranslation('translations');

	return currentUpdate ? (
		<div className="overview-campaignInfo--content-singleUpdate">
			<div onClick={goBack} className="overview-campaignInfo--content-singleUpdate--readMore">
				<i className="material-icons">chevron_left</i>
				{t('BACK_TO_LATEST_UPDATES')}
			</div>
			{!preview && currentUpdate && editable && (
				<div className="overview-campaign-updates-card-edit-btn-holder">
					<Tooltip title={'Edit update'} placement="right">
						<IconButton
							onClick={() =>
								openUpdatesDialog({
									create: false,
									update: {
										title: currentUpdate.title,
										content: currentUpdate.content,
										id: currentUpdate.id,
									},
								})
							}
						>
							<Edit className="overview-campaign-updates-icon" />
						</IconButton>
					</Tooltip>
				</div>
			)}
			<div className="overview-campaignInfo--content-updates--timestamp">
				{moment(currentUpdate.postDate).format('ll')}
			</div>
			<div className="overview-campaignInfo--content-updates--title">
				<p>
					<span>{currentUpdate.title}</span>
					<span className="overview-campaign-updates-comments-counter-holder">
						<ModeComment className="overview-campaign-updates-icon" />
						<span className="overview-campaign-updates-comments-counter">{`0`}</span>
					</span>
				</p>
			</div>
			<div className="overview-campaignInfo--content-singleUpdate--author">
				<span>By</span>&nbsp;
				<span className="overview-campaignInfo--content-singleUpdate--author_name">{currentUpdate.campaignName}</span>
			</div>
			<div className="overview-campaignInfo--content-singleUpdate--content">
				{currentUpdate.content && ReactHtmlParser(draftToHtml(JSON.parse(currentUpdate.content)))}
			</div>
		</div>
	) : (
		<CircularProgress />
	);
};

const mapStateToProps = ({
	campaign: {
		campaignUpdates: { currentUpdate },
	},
}) => ({
	currentUpdate,
});

export default connect(
	mapStateToProps,
	{ getCampaignUpdate, openUpdatesDialog, clearCurrentCampaignUpdate },
)(SingleUpdate);
