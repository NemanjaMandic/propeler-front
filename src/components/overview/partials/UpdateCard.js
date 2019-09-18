// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import draftToHtml from 'draftjs-to-html';
import Edit from '@material-ui/icons/Edit';
import ModeComment from '@material-ui/icons/ModeComment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '../../common/tooltip/Tooltip';
import { openUpdatesDialog } from '../../../state/modals/actions';
import { history } from '../../../store/configureStore';

type PropsT = {
	openUpdatesDialog: Function,
	preview: boolean,
	update: any,
	urlFriendlyName: string,
	edit: boolean,
};

const UpdateCard = (props: PropsT) => {
	const { preview, openUpdatesDialog, update, urlFriendlyName, edit } = props;
	const selectUpdate = update => {
		history.push(`/overview/${urlFriendlyName}/updates/${update.id}`);
	};
	const [t] = useTranslation('translations');

	return (
		<div className="overview-campaignInfo--content-updates">
			{!preview && edit && (
				<div className="overview-campaign-updates-card-edit-btn-holder">
					<Tooltip title={t('EDIT_UPDATE')} placement="right">
						<IconButton
							onClick={() =>
								openUpdatesDialog({
									create: false,
									update: {
										title: update.title,
										content: update.content,
										id: update.id,
									},
								})
							}
						>
							<Edit className="overview-campaign-updates-icon" />
						</IconButton>
					</Tooltip>
				</div>
			)}
			<div className="overview-campaignInfo--content-updates--timestamp">{moment(update.postDate).format('ll')}</div>
			<div className="overview-campaignInfo--content-updates--title">
				<p>
					<span>{update.title}</span>
					<span className="overview-campaign-updates-comments-counter-holder">
						<ModeComment className="overview-campaign-updates-icon" />
						<span className="overview-campaign-updates-comments-counter">{`0`}</span>
					</span>
				</p>
			</div>
			<div className="overview-campaignInfo--content-updates--title--content">
				{update.content && ReactHtmlParser(draftToHtml(JSON.parse(update.content)))}
			</div>
			<div onClick={() => selectUpdate(update)} className="overview-campaignInfo--content-updates--title--readMore">
				{t('READ_MORE')}
			</div>
		</div>
	);
};

export default connect(
	null,
	{ openUpdatesDialog },
)(UpdateCard);
