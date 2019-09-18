//@flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Pagination from '../../../common/pagination/Pagination';
import DashboardDocumentTableRow from './DashboardDocumentTableRow';
import Filter from '../../../common/filter/FilterComponent';
import { INVESTORS, ADMIN, PUBLIC } from '../../../../constants/accesslLevelStatus';

const DashboardDocumentTable = ({ heading, data, pagination, entity }) => {
	const [t] = useTranslation('translations');

	const accessLevelFilterOptions = [
		{ key: ADMIN, label: 'ADMIN' },
		{ key: PUBLIC, label: 'PUBLIC' },
		{ key: INVESTORS, label: 'INVESTORS' },
	];

	const [accessLevel, setAccessLevel] = useState(accessLevelFilterOptions[0]);

	const handleAccessLevel = selectedFilter => {
		setAccessLevel(selectedFilter.key);
	};

	const renderHeading = () => {
		return (
			<div className="investor-dashboard-portfolio-table-rows">
				{heading.map((h, index) => (
					<div key={`db-header-table-${h}`} className={'doc_table_heading'}>
						{t(h)}
						{(index === 0 || index === 2) && (
							<IconButton onClick={() => console.log(h)}>
								<ArrowDownward className={'sort_icon'} />
							</IconButton>
						)}
						{index === 3 && (
							<Filter action={handleAccessLevel} options={accessLevelFilterOptions} initial={0} label={false} />
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<div>
			{renderHeading()}
			{data.map(row => (
				<DashboardDocumentTableRow entity={entity} document={row} />
			))}
			{pagination && (
				<Pagination
					currentPage={pagination.number}
					totalPages={pagination.totalPages}
					first={pagination.first}
					last={pagination.last}
					next={console.log}
					previous={console.log}
					actionParams={{ pageSize: 5 }}
				/>
			)}
		</div>
	);
};

export default DashboardDocumentTable;
