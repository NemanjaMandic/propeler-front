// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { deleteCampaignDocument, getDocument } from '../../../../state/campaign/actions';
import { deleteCompanyDocument } from '../../../../state/company/actions';
import {
	confirmModal,
	openModalCampaignDocument,
	openModalCampaignDocumentUpdate,
	openModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';
import Tooltip from '../../../common/tooltip/Tooltip';
import { getDocumentTypes } from '../../../../state/documents/actions';
import { CAMPAIGNS } from '../../../../constants/documentEntity';

type PropsT = {
	documentEntity: string,
	children: any,
	urlFriendlyName: string,
	getDocumentTypes: Function,
	getDocument: Function,
	confirmModal: Function,
	userId: any,
	openModalCampaignDocumentUpdate: Function,
	documents: Array<Object>,
	openModalCampaignDocument: Function,
	openModalCampaignDocumentPreview: Function,
	deleteCompanyDocument: Function,
	id: any,
	documentTypes: {
		inProgress: boolean,
		data: Object,
	},
};

const DocumentsRegisterSection = (props: PropsT) => {
	const {
		getDocument,
		confirmModal,
		userId,
		documents,
		documentTypes,
		getDocumentTypes,
		documentEntity,
		children,
		urlFriendlyName,
		openModalCampaignDocument,
		openModalCampaignDocumentUpdate,
		openModalCampaignDocumentPreview,
		deleteCompanyDocument,
		id,
	} = props;

	useEffect(() => {
		getDocumentTypes(documentEntity);
	}, []);

	const [t] = useTranslation('translations');

	const deleteConfirmation = documentId => {
		if (documentEntity === CAMPAIGNS)
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCampaignDocument,
				actionParams: { name: urlFriendlyName, id: documentId, userId },
			});
		else
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCompanyDocument,
				actionParams: { documentId, userId, companyId: id },
			});
	};

	const uploadTypeAllowed = docType => {
		const numOfDocTypes = documents.reduce((total, doc) => (doc.type === docType.type ? total + 1 : total), 0);
		return !docType.maxUploads || numOfDocTypes < docType.maxUploads;
	};

	const allowedAccessLevels = (type, entity) => {
		const selectedType =
			documentTypes.data[entity] && documentTypes.data[entity].documents.filter(docType => docType.type === type)[0];
		return selectedType && selectedType.accessLevels.map(level => ({ label: level, value: level }));
	};

	const previewDocument = url => {
		getDocument(url);
		openModalCampaignDocumentPreview();
	};

	const capitalizeLetter = (level: string) => {
		if (level)
			return (
				level.charAt(0) +
				level
					.slice(1)
					.toLowerCase()
					.replace('_', ' ')
			);
		return level;
	};

	const openEditModal = (doc: any, documentEntity: string) => {
		const data = {
			...doc,
			docTitle: t('DOCUMENT_UPLOAD'),
			documentEntity,
			accessLevels: allowedAccessLevels(doc.type, documentEntity),
		};
		openModalCampaignDocumentUpdate(data);
	};

	const openDocumentDialog = (type, documentEntity) => {
		openModalCampaignDocument({
			dialogTitle: t('DOCUMENT_UPLOAD'),
			type,
			open: true,
			documentEntity,
			overview: false,
			accessLevels: allowedAccessLevels(type, documentEntity),
		});
	};

	const renderDocumentTypes = entity =>
		documentTypes.data[entity] &&
		documentTypes.data[entity].documents.map(docType => (
			<div
				key={docType.type}
				onClick={() => {
					uploadTypeAllowed(docType) && openDocumentDialog(docType.type, entity);
				}}
				className={!uploadTypeAllowed(docType) ? 'disabled_submit' : null}
			>
				{t(docType.type)}
			</div>
		));

	const renderDocument = (document, documentEntity, dashboard) => {
		return (
			<div className={!dashboard ? 'doc__row__wizard' : 'doc__row__dashboard'} key={document.title}>
				<div onClick={() => previewDocument(document.url)}>{`${document.title}.pdf`}</div>
				{dashboard && <div>{document.campaignName || '-'}</div>}
				<div>{t(document.type) || '-'}</div>
				<div>{capitalizeLetter(document.accessLevel) || '-'}</div>
				<div>
					<Tooltip title={t('EDIT_DOCUMENT')} placement="right">
						<IconButton className={'margin-right-10'} onClick={() => openEditModal(document, documentEntity)}>
							<Edit className={'icon_class'} />
						</IconButton>
					</Tooltip>
					<Tooltip title={t('DELETE_DOCUMENT')} placement="right">
						<IconButton onClick={() => deleteConfirmation(document.id)}>
							<DeleteOutline className={'icon_class'} />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		);
	};

	const renderDocumentTable = (title, documents, documentEntity, dashboard = false) => {
		return (
			<div>
				<div className={!dashboard ? 'doc__header__wizard' : 'doc__header__dashboard'} key={title}>
					<div>{t('NAME')}</div>
					{dashboard && <div>{t('CAMPAIGN_CL')}</div>}
					<div>{t('KIND')}</div>
					<div>{t('ACCESS_LEVEL')}</div>
					<div />
				</div>
				{documents && documents.length > 0 ? (
					documents.map(document => renderDocument(document, documentEntity, dashboard))
				) : (
					<div className={'no__doc'}>{t('NO_DOC_YET')}</div>
				)}
			</div>
		);
	};

	return (
		<Fragment>
			{children}
			<div className={'submit__doc'}>{renderDocumentTypes(documentEntity)}</div>
			{renderDocumentTable(t('COMPANY_DOCUMENTS'), documents, documentEntity)}
		</Fragment>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId },
	},
	company: {
		info: { id },
	},
	documents: { documentTypes, tweaker },
	campaign: {
		info: { urlFriendlyName },
	},
}) => ({
	userId,
	id,
	documentTypes,
	tweaker,
	urlFriendlyName,
});

export default connect(
	mapStateToProps,
	{
		getDocumentTypes,
		getDocument,
		confirmModal,
		openModalCampaignDocumentUpdate,
		openModalCampaignDocument,
		openModalCampaignDocumentPreview,
		deleteCompanyDocument,
		deleteCampaignDocument,
	},
)(DocumentsRegisterSection);
