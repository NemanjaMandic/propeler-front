import React from 'react';
import { ROLE_ENTREPRENEUR, ROLE_ADMIN } from '../constants/roles';
import { states } from '../constants/campaignStates';
import colors from '../styles/modules/colors.scss';

export const getDaysLeft = (campaign: any) => {
	switch (campaign.state) {
		case states.ACTIVE: {
			const seconds = campaign.timeLeft / 1000;
			const minutes = Math.floor((seconds / 60) % 60);
			const hours = Math.floor((seconds / 60 / 60) % 24);
			const days = Math.floor(seconds / 60 / 60 / 24);

			if (days > 0) {
				if (hours > 0) return `${days} Days & ${hours} Hours`;
				return `${days} Days & ${minutes} Minutes`;
			} else if (hours > 0) {
				return `${hours} Hours & ${minutes} Minutes`;
			}

			return '0 Days';
		}
		case states.SUCCESSFUL: {
			return 'Completed';
		}
		default: {
			return `${campaign.timeToRaiseFunds} Days`;
		}
	}
};

export const isEditable = (campaign: { state: string, companyId: number }, role: string, userCompany: number) => {
	return (
		role === ROLE_ENTREPRENEUR &&
		campaign.companyId === userCompany &&
		(campaign.state === states.INITIAL || campaign.state === states.REVIEW_READY)
	);
};

export const adminActionsAllowed = (campaign: { state: string, auditorId: number }, role: string, userId: number) => {
	return role === ROLE_ADMIN && campaign.auditorId === userId && campaign.state === states.AUDIT;
};

export const renderInvestedPercent = campaign => {
	const percentFunded = campaign.fundingGoals
		? Number(((campaign.collectedAmount || 0) * 100) / campaign.fundingGoals).toFixed(1)
		: 100;
	if (campaign.state === states.ACTIVE || campaign.state === states.COMPLETED) {
		const color = campaign.state === states.ACTIVE ? colors.gray3 : colors.red;
		return <span style={{ color: percentFunded < 100 ? color : colors.lightGreen }}>({percentFunded}%)</span>;
	}

	return null;
};
