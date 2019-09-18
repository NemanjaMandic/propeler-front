// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Scrollspy from 'react-scrollspy';
import ReactHtmlParser from 'react-html-parser';
import draftToHtml from 'draftjs-to-html';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import TeamMemberCard from './TeamMemberCard';
import { getCampaignTopic, getTeamMembers, getMemberPhoto } from '../../../state/campaign/actions';
import { openEditCampaignDialog } from '../../../state/modals/actions';
import Tooltip from '../../common/tooltip/Tooltip';

type PropsT = {
	getCampaignTopic: Function,
	getTeamMembers: Function,
	getMemberPhoto: Function,
	openEditCampaignDialog: Function,
	editable: boolean,
	info: {
		companyId: any,
		name: string,
		urlFriendlyName: string,
		tagLine: string,
		topicStatus: {
			overview: boolean,
			problem: boolean,
			solution: boolean,
			market: boolean,
			traction: boolean,
			risk_and_competition: boolean,
			team?: boolean,
		},
	},
	sections: {
		overview: any,
		problem: any,
		solution: any,
		market: any,
		traction: any,
		team: any,
		risk_and_competition: any,
	},
	current_topic: any,
	preview: boolean,
	editCampaign: {
		key?: string,
		inProgress: boolean,
	},
};

const contentList = [
	{ title: 'CAMPAIGN', hash: 'campaign', key: 'overview' },
	{ title: 'PROBLEM', hash: 'problem', key: 'problem' },
	{ title: 'SOLUTION', hash: 'solution', key: 'solution' },
	{ title: 'MARKET', hash: 'market', key: 'market' },
	{ title: 'TRACTION', hash: 'traction', key: 'traction' },
	{ title: 'TEAM', hash: 'team', key: 'team' },
	{ title: 'RISK_AND_COMPETITION', hash: 'risk', key: 'risk_and_competition' },
];

const Campaign = ({
	info: { topicStatus, urlFriendlyName, tagLine },
	editCampaign: { key },
	sections,
	openEditCampaignDialog,
	getCampaignTopic,
	getTeamMembers,
	getMemberPhoto,
	current_topic,
	preview,
	editable,
}: PropsT) => {
	configureAnchors({ offset: -80 });

	useEffect(() => {
		Object.entries(topicStatus).forEach(([topicType, status]) => {
			if (status) {
				getCampaignTopic({ campaignName: urlFriendlyName, topicType });
			}
		});
	}, [topicStatus]);

	useEffect(() => {
		if (urlFriendlyName) {
			getTeamMembers({ campaignName: urlFriendlyName });
		}
	}, [urlFriendlyName]);

	const _renderTopic = section => {
		let topic = { members: [] };
		let topicContent;
		if (preview && current_topic[section.key] && current_topic[section.key].content) {
			topicContent = JSON.stringify(current_topic[section.key].content);
		} else {
			topic = sections[section.key];
			topicContent = topic.content;
		}

		const membs = section.key === 'team' && topic.members ? topic.members.filter(m => m.name) : [];

		return section.key === 'team' ? (
			<div className={'overview-campaignInfo--content-campaign-team'}>
				{membs.map(member => (
					<TeamMemberCard
						member={member}
						getMemberPhoto={getMemberPhoto}
						campaignName={urlFriendlyName}
						key={member.id}
					/>
				))}
			</div>
		) : (
			topicContent && ReactHtmlParser(draftToHtml(JSON.parse(topicContent)))
		);
	};

	const _renderSection = section => {
		const isPopulated =
			topicStatus[section.key] ||
			(section.key === 'team' && sections.team.members.length > 0) ||
			(current_topic[section.key] && current_topic[section.key].content);
		const [t] = useTranslation('translations');
		return (
			((editable && !preview) || isPopulated) && (
				<div
					key={section.key}
					className={`overview-campaignInfo--content-section${!isPopulated ? ' placeholder' : ''} ${
						editable ? ' editable' : ''
					}`}
				>
					<ScrollableAnchor id={section.hash}>
						<div className={'overview-campaignInfo--content-title'}>
							<h1 id={section.hash}>{t(section.title)}</h1>
							{!preview && editable && (
								<Tooltip title={t('EDIT_SECTION')} placement="right">
									<IconButton
										onClick={() => openEditCampaignDialog(section.key)}
										className={key === section.key ? 'active-icon' : ''}
									>
										<Edit style={{ color: '#ACB6BF' }} />
									</IconButton>
								</Tooltip>
							)}
						</div>
					</ScrollableAnchor>
					{_renderTopic(section)}
				</div>
			)
		);
	};
	const [t] = useTranslation('translations');
	return (
		<section className="overview-campaignInfo--content-campaignWrapper">
			<div className="overview-campaignInfo--content-campaign">
				<div
					className={`overview-campaignInfo--content-section${!tagLine ? ' placeholder' : ''} ${
						editable ? ' editable' : ''
					}`}
				>
					<div className={'overview-campaignInfo--content-title'}>
						<b>{tagLine}</b>
						{!preview && editable && (
							<Tooltip title={t('EDIT_SECTION')} placement="right">
								<IconButton
									onClick={() => openEditCampaignDialog('tag_line')}
									className={key === 'tag_line' ? 'active-icon' : ''}
								>
									<Edit style={{ color: '#ACB6BF' }} />
								</IconButton>
							</Tooltip>
						)}
					</div>
				</div>
				{contentList.map(section => _renderSection(section))}
			</div>
			{!preview && (
				<div className="overview-campaignInfo--content-campaignNavigation">
					<Scrollspy
						items={['campaign', 'problem', 'solution', 'market', 'traction', 'team', 'risk']}
						currentClassName="activeClass"
					>
						{contentList.map(
							section =>
								(editable ||
									topicStatus[section.key] ||
									(section.key === 'team' && sections.team.members.length) ||
									(current_topic[section.key] && current_topic[section.key].content)) && (
									<li key={section.key}>
										<a href={`#${section.hash}`}>{t(section.title)}</a>
									</li>
								),
						)}
					</Scrollspy>
				</div>
			)}
		</section>
	);
};

const mapStateToProps = ({ campaign, modals: { editCampaign } }) => ({
	info: campaign.info,
	sections: {
		team: campaign.team,
		overview: campaign.overview,
		problem: campaign.problem,
		risk_and_competition: campaign.risk_and_competition,
		market: campaign.market,
		traction: campaign.traction,
		solution: campaign.solution,
	},
	editCampaign,
	currentHash: campaign.campaignOverview.hash,
	current_topic: campaign.current_topic,
});

export default connect(
	mapStateToProps,
	{
		getCampaignTopic,
		getTeamMembers,
		getMemberPhoto,
		openEditCampaignDialog,
	},
)(Campaign);
