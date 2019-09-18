// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Button from '../../../common/button/Button';
import {
	openUserPreviewDialog,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';
import { getDocumentSuccess, getDocument } from '../../../../state/campaign/actions';
import { history } from '../../../../store/configureStore';
import dummyContract from '../../../../constants/dummyContract';

const DashboardDocumentTableRow = ({
	document,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
	getDocumentSuccess,
}) => {
	const [t] = useTranslation('translations');
	const openDocumentPreview = (document: any, e: Event, signable: boolean) => {
		// getDocument(document.url);
		getDocumentSuccess({ type: 'pdf', file: dummyContract }); // to be removed
		if (!signable) openModalCampaignDocumentPreview();
		else
			openModalCampaignDocumentPreview({
				title: t('INITIAL_AGREEMENT'),
				signAction: () => {
					closeModalCampaignDocumentPreview();
				},
			});
		if (e) e.stopPropagation();
	};

	const renderLastCell = () => {
		return (
			<div>
				{!document.signed && (
					<Button
						name={t('SIGN')}
						variant={'outlined'}
						color={'primary'}
						className={'expand_table_button_approve'}
						onClick={() => {
							openDocumentPreview(document, null, true);
						}}
					/>
				)}
				{document.signed && (
					<a href="#" onClick={() => openDocumentPreview(document, null, false)}>
						View
					</a>
				)}
			</div>
		);
	};

	return (
		<div className={'doc_table_rows'}>
			<div className="doc_table_row" onClick={e => openDocumentPreview(document, e)}>
				{' '}
				{document.title}{' '}
			</div>
			<div className="doc_table_row"> {document.type}</div>
			<div className="doc_table_row">{moment(document.uploadDate).format('ll')}</div>
			<div className="doc_table_row">{document.signed ? 'Signed' : 'Unsigned'}</div>
			<div className="doc_table_row">{renderLastCell()}</div>
		</div>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId },
	},
}) => ({
	userId,
});

export default connect(
	mapStateToProps,
	{
		openUserPreviewDialog,
		getDocument,
		getDocumentSuccess,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
	},
)(DashboardDocumentTableRow);
