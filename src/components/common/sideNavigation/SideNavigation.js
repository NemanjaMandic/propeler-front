import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CheckCircle from '@material-ui/icons/CheckCircle';

type PropsT = {
	action: Function,
	hash: string,
	info: any,
	members: Array<Object>,
	shareHolders: Array<Object>,
	content: Map<string, Array<Object>>,
};

const checkIsEmpty = info => {
	if (!info.companyId) return true;

	if (!info.fundingGoals) return true;

	if (!info.maxEquityOffered) return true;

	if (!info.minInvestment) return true;

	if (!info.name) return true;

	if (!info.timeToRaiseFunds) return true;

	if (!info.marketImageUrl) return true;

	return false;
};

const SideNavigation = ({ action, hash, info, members, shareHolders, content }: PropsT) => {
	const [t] = useTranslation('translations');

	const options = [
		{
			key: '#company',
			name: 'ABOUT_COMPANY',
			checked: true,
			disabled: true,
			step: 0,
		},
		{
			key: '#about',
			name: 'ABOUT_CAMPAIGN',
			checked: !checkIsEmpty(info),
			step: 1,
		},
		{
			key: '#overview',
			name: 'OVERVIEW',
			checked: info.topicStatus.overview,
			step: 3,
		}, // step 2 is Company brand
		{
			key: '#problem',
			name: 'PROBLEM',
			checked: info.topicStatus.problem,
			step: 4,
		},
		{
			key: '#solution',
			name: 'SOLUTION',
			checked: info.topicStatus.solution,
			step: 5,
		},
		{
			key: '#market',
			name: 'MARKET',
			checked: info.topicStatus.market,
			step: 6,
		},
		{
			key: '#traction',
			name: 'TRACTION',
			checked: info.topicStatus.traction,
			step: 7,
		},
		{
			key: '#updates',
			name: 'UPDATES',
			checked: info.topicStatus.updates,
			step: 8,
		},
		{ key: '#team', name: 'TEAM', checked: members.length > 0, step: 9 },
		{
			key: '#investors',
			name: 'INVESTORS',
			checked: shareHolders.length > 0,
			step: 10,
		},
		{
			key: '#risks',
			name: 'RISK_AND_COMPETITION',
			checked: info.topicStatus.risk_and_competition,
			step: 11,
		},
		{
			key: '#documents',
			name: 'Documents',
			checked: Object.keys(content).length > 0,
			step: 12,
		},
	];
	return (
		<div className="navigation_container">
			{options.map(tab => (
				<div
					key={tab.key}
					className={`tab ${tab.disabled ? 'disabled' : ''}`}
					onClick={() => !tab.disabled && action(tab.step)}
				>
					{(hash === tab.key || (hash === '#brand' && tab.key === '#about')) && <div className={'active'} />}
					{t(tab.name)}
					{tab.checked && <CheckCircle />}
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {
	const {
		company: {
			shareHolders: { shareHolders },
		},
		campaign: {
			createCampaign: { step },
			info,
			team: { members },
			documents: { content },
		},
	} = state;
	return {
		step,
		info,
		members,
		shareHolders,
		content,
	};
};
export default connect(
	mapStateToProps,
	null,
)(SideNavigation);
