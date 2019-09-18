// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import {
	APR_PAPER,
	BANK_STATEMENT,
	BUSINESS_PLAN,
	LEGAL,
	OTHER,
	PITCH_DECK,
} from '../../../campaign/management/constants/documentTypes';
import Tooltip from '../../../common/tooltip/Tooltip';
import {
	openUserPreviewDialog,
	openModalCampaignDocumentPreview,
	openModalCampaignDocumentUpdate,
	confirmModal,
} from '../../../../state/modals/actions';
import { getDocument, deleteCampaignDocument } from '../../../../state/campaign/actions';
import { deleteCompanyDocument } from '../../../../state/company/actions';
import { CAMPAIGNS } from '../../../../constants/documentEntity';

const DashboardDocumentTableRow = ({
	document,
	confirmModal,
	getDocument,
	deleteCompanyDocument,
	deleteCampaignDocument,
	urlFriendlyName,
	companyId,
	userId,
	entity,
	documentTypes,
	openModalCampaignDocumentPreview,
	openModalCampaignDocumentUpdate,
}) => {
	const [t] = useTranslation('translations');

	const changeType = (type: string) => {
		const types = new Map([
			[APR_PAPER, t('APR_DOC')],
			[BUSINESS_PLAN, t('BUSINESS_PLAN')],
			[PITCH_DECK, t('PITCH_DECK')],
			[BANK_STATEMENT, t('BANK_STATEMENT')],
			[OTHER, t('OTHER')],
			[LEGAL, t('LEGAL')],
		]);
		if (type) return types.get(type);

		return type;
	};

	const deleteConfirmation = () => {
		if (entity === CAMPAIGNS)
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCampaignDocument,
				actionParams: { name: urlFriendlyName, id: document.id, userId },
			});
		else
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCompanyDocument,
				actionParams: { documentId: document.id, userId, companyId },
			});
	};

	const allowedAccessLevels = (type, entity) => {
		const selectedType =
			documentTypes.data[entity] && documentTypes.data[entity].documents.filter(docType => docType.type === type)[0];
		return selectedType && selectedType.accessLevels.map(level => ({ label: level, value: level }));
	};

	const openEditModal = () => {
		const data = {
			...document,
			docTitle: t('DOCUMENT_UPLOAD'),
			entity,
			accessLevels: allowedAccessLevels(document.type, entity),
		};
		openModalCampaignDocumentUpdate(data);
	};

	const renderLastCell = () => {
		return (
			<div>
				<Tooltip title={t('EDIT_DOCUMENT')} placement="right">
					<IconButton className={'margin-right-15'} onClick={openEditModal}>
						<Edit className={'icon_class'} />
					</IconButton>
				</Tooltip>
				<Tooltip title={t('DELETE_DOCUMENT')} placement="right">
					<IconButton onClick={deleteConfirmation}>
						<DeleteOutline className={'icon_class'} />
					</IconButton>
				</Tooltip>
			</div>
		);
	};

	const openDocumentPreview = (document: any, e: Event) => {
		getDocument(document.url);
		openModalCampaignDocumentPreview();
		e.stopPropagation();
	};

	return (
		<div className={'doc_table_rows'}>
			<div className="doc_table_row" onClick={e => openDocumentPreview(document, e)}>
				{' '}
				{document.title}{' '}
			</div>
			<div className="doc_table_row"> {changeType(document.type)}</div>
			<div className="doc_table_row">{moment(document.uploadDate).format('ll')}</div>
			<div className="doc_table_row">{document.accessLevel}</div>
			<div className="doc_table_row">{renderLastCell()}</div>
		</div>
	);
};

const mapStateToProps = ({
	documents: { documentTypes, tweaker },
	campaign: {
		info: { urlFriendlyName },
	},
	company: {
		info: { id },
	},
	auth: {
		authentication: { userId },
	},
}) => ({
	documentTypes,
	tweaker,
	urlFriendlyName,
	companyId: id,
	userId,
});

export default connect(
	mapStateToProps,
	{
		openUserPreviewDialog,
		getDocument,
		openModalCampaignDocumentPreview,
		confirmModal,
		openModalCampaignDocumentUpdate,
		deleteCampaignDocument,
		deleteCompanyDocument,
	},
)(DashboardDocumentTableRow);
