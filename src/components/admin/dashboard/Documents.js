import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SignDocumentsTable from '../../common/signDocsTable/SignDocumentsTable';
import { getContracts } from '../../../state/signature/actions';

const tableHeading = ['NAME', 'KIND', 'UPLOAD_DATE', 'STATUS', 'ACTION'];

const Documents = ({ contracts, getContracts }) => {
	const [t] = useTranslation('translations');

	useEffect(() => {
		getContracts(true);
	}, []);

	return (
		<Fragment>
			<div style={{ paddingTop: 30, paddingBottom: 10 }}>{t('LEGAL_DOCUMENTS_LOWER_CASE')}</div>
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
