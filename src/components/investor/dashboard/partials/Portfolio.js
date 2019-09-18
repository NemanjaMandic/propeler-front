// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../../common/filter/FilterComponent';
import PortfolioTable from '../partials/PortfolioTable';
import { getInvestorPortfolio } from '../../../../state/investor/actions';
import { states } from '../../../../constants/campaignStates';

type PropsT = {
	portfolio: {
		inProgress: boolean,
		content: Array<Object>,
		totalPages: number,
		last: boolean,
		totalElements: number,
		sort: { sorted: boolean, unsorted: boolean },
		pageable: {
			offset: number,
			pageNumber: number,
			pageSize: number,
			paged: boolean,
			unpaged: boolean,
		},
		numberOfElements: number,
		first: boolean,
		size: number,
		number: number,
	},
	getInvestorPortfolio: Function,
};

const filterOptions = [
	{ key: states.ALL, label: 'ALL' },
	{ key: states.ACTIVE, label: 'ACTIVE' },
	{ key: states.COMPLETED, label: 'COMPLETED' },
];

const campaignTableHeading = [
	'CAMPAIGN_CL',
	'TARGET_CL',
	'INVESTED_CL',
	'TIME_LEFT_CL',
	'EQUITY_OFFERED_CL',
	'PRICE_PER001',
	'ACTION',
];

const Portfolio = ({ portfolio, getInvestorPortfolio }: PropsT) => {
	const [filter, setFilter] = useState(filterOptions[1]);

	useEffect(() => {
		getInvestorPortfolio({ filter: filter.key, size: 5 });
	}, []);

	const handleFilterChange = selectedFilter => {
		setFilter(selectedFilter);
		getInvestorPortfolio({ filter: selectedFilter.key, size: 5 });
	};

	const [t] = useTranslation('translations');

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('MY_PORTFOLIO')}
					<Filter action={handleFilterChange} options={filterOptions} initial={1} />
				</div>
				{portfolio.numberOfElements > 0 ? (
					<PortfolioTable heading={campaignTableHeading} data={portfolio} campaignState={filter.key} />
				) : (
					<div className="campaigns-cards--empty-data">{t('YOU_DONT_HAVE_INVESTMENTS')}</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ investor: { portfolio } }) => ({
	portfolio,
});

export default connect(
	mapStateToProps,
	{ getInvestorPortfolio },
)(Portfolio);
