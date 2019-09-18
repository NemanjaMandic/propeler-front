// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../../common/button/Button';
import Heading from '../../../overview/views/Heading';
import InvestmentStatus from '../../../overview/views/InvestmentStatus';
import CampaignInfo from '../../../overview/views/CampaignInfo';

type PropsT = {
	info: any,
	open: boolean,
	close: Function,
	classes: any,
};

const styles = {
	paper: {
		width: '100%',
		maxWidth: '1440px',
	},
};

const CampaignPreview = (props: PropsT) => {
	const { open, close, classes, info } = props;
	const [isInvestCtaVisible, toggleVisibility] = useState(true);
	const [t] = useTranslation('translations');
	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ paper: classes.paper }}
			className={'dialog__campaign__preview'}
		>
			<DialogTitle className={'preview__dialog__title'}>
				<div className={'campaign__preview__header'}>
					<div>{`${info.name}${t('CAMPAIGN_PREVIEW')}`}</div>
					<Button
						type={'button'}
						variant="contained"
						color="primary"
						className={'close__button'}
						onClick={close}
						name={t('CLOSE')}
					/>
				</div>
			</DialogTitle>
			<DialogContent className={'campaign__preview__content'}>
				<section className="overview preview__dialog">
					<Heading campaign={info} preview />
					<InvestmentStatus toggleVisibility={toggleVisibility} campaign={info} preview />
					<CampaignInfo campaign={info} isInvestCtaVisible={isInvestCtaVisible} preview />
				</section>
			</DialogContent>
		</Dialog>
	);
};

export default withStyles(styles)(CampaignPreview);
