import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SignDocumentsTable from '../partials/SignDocumentsTable';
import { getContracts } from '../../../../state/signature/actions';

const tableHeading = ['NAME', 'KIND', 'UPLOAD_DATE', 'STATUS', 'ACTION'];

const Documents = ({ contracts, getContracts }) => {
	const [t] = useTranslation('translations');

	useEffect(() => {
		getContracts();
	}, []);

	return (
		<Fragment>
			{contracts.documents.length > 0 ? (
				<SignDocumentsTable heading={tableHeading} data={contracts.documents} />
			) : (
				<div className={'empty_table'}>{t('NO_DOCUMENTS')}</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = ({ signature: { contracts } }) => ({
	contracts,
});

export default connect(
	mapStateToProps,
	{ getContracts },
)(Documents);
