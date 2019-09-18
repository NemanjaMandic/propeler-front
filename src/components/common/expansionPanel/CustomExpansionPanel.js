// @flow

import React, { Fragment } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';
import { styles } from './CustomExpansionPanel.styles';

type PropsT = {
	options: Array<{
		title: string,
		detail: string,
	}>,
	classes: Object,
};

const CustomExpansionPanel = (props: PropsT) => {
	const { options, classes } = props;

	return (
		<Fragment>
			{options.map(c => (
				<ExpansionPanel key={c.title}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.button} />}>
						<Typography className={classes.title}>{c.title}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography className={classes.content}>{c.detail}</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</Fragment>
	);
};

export default withStyles(styles)(CustomExpansionPanel);
