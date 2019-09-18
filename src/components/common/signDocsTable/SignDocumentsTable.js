// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import SignDocumentTableRow from './SignDocumentTableRow';
import Filter from '../filter/FilterComponent';
import { SIGNED, UNSIGNED, ALL } from '../../../constants/signingStatus';

const DocumentsTable = ({ heading, data }) => {
	const [t] = useTranslation('translations');
	const statusFilterOptions = [
		{ key: ALL, label: 'All' },
		{ key: SIGNED, label: 'Signed' },
		{ key: UNSIGNED, label: 'Unsigned' },
	];
	const [filteredContracts, setFilteredContracts] = useState(data);

	const handleFilterStatusChange = f => {
		if (data && f.key === ALL) setFilteredContracts(data);
		if (data && f.key === SIGNED) setFilteredContracts(data.filter(c => c.signed));
		if (data && f.key === UNSIGNED) setFilteredContracts(data.filter(c => !c.signed));
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
							<Filter action={handleFilterStatusChange} options={statusFilterOptions} initial={0} label={false} />
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<div>
			{renderHeading()}
			{filteredContracts &&
				filteredContracts.map(c => <SignDocumentTableRow key={`sign-table-row-${c.id}`} document={c} />)}
		</div>
	);
};

export default DocumentsTable;
