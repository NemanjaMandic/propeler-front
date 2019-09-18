// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { closeEditCampaignDialog } from '../../../state/modals/actions';
import CampaignTopic from '../../campaign/management/partials/CampaignTopic';
import TeamMembers from '../../campaign/management/views/TeamMembers';
import ShareHolders from '../../campaign/management/views/ShareHolders';
import CampaignBasic from '../../campaign/management/partials/CampaignBasic';

const styles = {
	paper: {
		maxWidth: '858px',
		width: '858px',
		padding: 0,
	},
	draggablePaper: {
		maxWidth: '858px',
		width: '858px',
		padding: 0,
		maxHeight: 'calc(100% - 26px)',
		paddingBottom: 50,
	},
	root: {
		position: 'relative',
		paddingBottom: 50,
	},
	icon: {
		width: 18,
		height: 18,
	},
	button: {
		float: 'right',
		padding: 7,
	},
};

const sections = {
	basic: { component: CampaignBasic, props: { update: true } },
	tag_line: {
		component: CampaignBasic,
		props: { update: true, tagLine: true },
	},
	overview: { component: CampaignTopic, props: { topicType: 'overview' } },
	problem: { component: CampaignTopic, props: { topicType: 'problem' } },
	solution: { component: CampaignTopic, props: { topicType: 'solution' } },
	market: { component: CampaignTopic, props: { topicType: 'market' } },
	traction: { component: CampaignTopic, props: { topicType: 'traction' } },
	team: { component: TeamMembers, props: {} },
	investors: { component: ShareHolders, props: {} },
	risk_and_competition: {
		component: CampaignTopic,
		props: { topicType: 'risk_and_competition' },
	},
};

type PropsT = {
	classes: Object,
	closeEditCampaignDialog: Function,
	editCampaign: {
		open: boolean,
		key: string,
		inProgress: boolean,
	},
};

const EditCampaignDialog = ({ classes, editCampaign: { open, key }, closeEditCampaignDialog }: PropsT) => {
	const Component = key && sections[key].component;
	const props = key
		? {
				...sections[key].props,
				modal: true,
				closeModal: closeEditCampaignDialog,
		  }
		: {};
	const draggable = key && (key === 'team' || key === 'investors');
	const [t] = useTranslation('translations');
	return (
		<Dialog
			open={open}
			disableBackdropClick
			disableEscapeKeyDown
			classes={draggable ? { paper: classes.draggablePaper } : { paper: classes.paper }}
		>
			<DialogTitle>
				<span>{`${t('CAMPAIGN')} ${key.replace(/_/g, ' ')} ${t('UPDATE')}`}</span>
				<IconButton onClick={closeEditCampaignDialog} classes={{ root: classes.button }}>
					<CloseIcon classes={{ root: classes.icon }} />
				</IconButton>
			</DialogTitle>
			<DialogContent classes={!draggable ? { root: classes.root } : {}}>
				{key && <Component {...props} />}
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = ({ modals: { editCampaign }, campaign }) => ({
	editCampaign,
	campaign,
});

export default connect(
	mapStateToProps,
	{ closeEditCampaignDialog },
)(withStyles(styles)(EditCampaignDialog));
