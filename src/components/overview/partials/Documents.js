// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import makeStyles from '@material-ui/styles/makeStyles';
import { CircularProgress } from '@material-ui/core';
import 'moment/locale/en-gb';
import 'moment/locale/sr';
import { deleteCampaignDocument, getDocument, submitRequestForDocuments } from '../../../state/campaign/actions';
import {
	confirmModal,
	openModalCampaignDocument,
	openModalCampaignDocumentUpdate,
	openModalCampaignDocumentPreview,
} from '../../../state/modals/actions';
import { deleteCompanyDocument } from '../../../state/company/actions';
import { CAMPAIGNS, COMPANIES } from '../../../constants/documentEntity';
import { getDocumentTypes } from '../../../state/documents/actions';
import { PENDING, APPROVED, DECLINED, NO_DOCUMENTS, NEED_REQUEST } from '../../../constants/documentRequestStatus';
import * as colors from '../../../styles/modules/colors.scss';
import { ROLE_INDIVIDUAL_INVESTOR } from '../../../constants/roles';
import DocumentsTable from './DocumentsTable';
import Button from '../../common/button/Button';

type PropsT = {
	content: Array<Object>,
	editable: boolean,
	info: {
		companyId: any,
		urlFriendlyName: string,
	},
	getDocument: Function,
	confirmModal: Function,
	preview: boolean,
	userId: any,
	openModalCampaignDocumentPreview: Function,
	openModalCampaignDocumentUpdate: Function,
	openModalCampaignDocument: Function,
	documentActions: any,
	overview_content: Array<Object>,
	deleteCompanyDocument: Function,
	deleteCampaignDocument: Function,
	getDocumentTypes: Function,
	submitRequestForDocuments: Function,
	requestForDocuments: any,
	role: string,
	documentTypes: {
		inProgress: boolean,
		data: Object,
	},
};

const useStyles = makeStyles({
	requestWrap: {
		width: '70%',
		margin: '111px auto',
		textAlign: 'center',
	},
	requestButton: {
		background: colors.blue,
		color: `${colors.lightBlue} !important`,
		fontWeight: 600,
		'&:hover': {
			background: '#bbdfec',
		},
		'&:disabled': {
			color: `${colors.gray5} !important`,
			background: colors.lightGray,
			cursor: 'not-allowed !important',
		},
	},
});

const Documents = (props: PropsT) => {
	const {
		info,
		content,
		getDocument,
		confirmModal,
		preview,
		userId,
		openModalCampaignDocumentPreview,
		requestForDocuments,
		role,
		openModalCampaignDocument,
		openModalCampaignDocumentUpdate,
		documentActions: { currentDocument },
		overview_content,
		deleteCompanyDocument,
		deleteCampaignDocument,
		getDocumentTypes,
		editable,
		submitRequestForDocuments,
		documentTypes,
		inProgress,
		companyDocsInProgress,
	} = props;

	useEffect(() => {
		if (editable && !preview) {
			getDocumentTypes(CAMPAIGNS);
			getDocumentTypes(COMPANIES);
		}
	}, [editable]);

	const [t] = useTranslation('translations');

	const MESSAGES = new Map([
		[PENDING, t('PENDING_MESSAGE')],
		[DECLINED, t('REJECT_MESSAGE')],
		[NEED_REQUEST, t('DEFAULT_MESSAGE')],
	]);

	const classes = useStyles();

	const deleteConfirmation = (id, isCompany) => {
		if (!isCompany)
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCampaignDocument,
				actionParams: { name: info.urlFriendlyName, id, userId },
			});
		else
			confirmModal({
				open: true,
				title: t('DOCUMENT_DELETION'),
				subtitle: t('CONFIRM_DOC_DELETION'),
				actionLabel: t('DELETE'),
				cancelLabel: t('CANCEL'),
				actionMethod: deleteCompanyDocument,
				actionParams: { documentId: id, userId, companyId: info.companyId },
			});
	};

	const previewDocument = url => {
		getDocument(url);
		openModalCampaignDocumentPreview(currentDocument);
	};

	const allowedAccessLevels = (type, entity) => {
		const selectedType =
			documentTypes.data[entity] && documentTypes.data[entity].documents.filter(docType => docType.type === type)[0];
		return selectedType && selectedType.accessLevels.map(level => ({ label: level, value: level }));
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
			overview: true,
			accessLevels: allowedAccessLevels(type, documentEntity),
		});
	};

	const renderTables = () => (
		<div className={'documents__overview__table'}>
			{documentsEmpty() && !loadingDocs() && <div style={{ paddingBottom: '20px' }}>{t('NO_DOCUMENTS')}</div>}
			{loadingDocs() ? (
				<CircularProgress />
			) : (
				<div>
					<DocumentsTable
						title={t('DUE_DILIGENCE')}
						entityTitle={t('CAMPAIGN_DOCUMENTS')}
						documents={content}
						openDocumentDialog={kind => openDocumentDialog(kind, CAMPAIGNS)}
						previewDocument={previewDocument}
						editable={editable && !preview}
						editDocument={document => openEditModal(document, CAMPAIGNS)}
						deleteDocument={id => deleteConfirmation(id, false)}
						types={documentTypes.data[CAMPAIGNS]}
					/>
					<DocumentsTable
						title={t('LEGAL_DOCUMENTS')}
						entityTitle={t('COMPANY_DOCUMENTS')}
						documents={overview_content}
						openDocumentDialog={kind => openDocumentDialog(kind, COMPANIES)}
						previewDocument={previewDocument}
						editable={editable && !preview}
						editDocument={document => openEditModal(document, COMPANIES)}
						deleteDocument={id => deleteConfirmation(id, true)}
						types={documentTypes.data[COMPANIES]}
					/>
				</div>
			)}
		</div>
	);

	const documentsEmpty = () => content.length === 0 && overview_content.length === 0;
	const loadingDocs = () => documentTypes.inProgress || inProgress || companyDocsInProgress;

	return (
		<section className={'documents__overview__section'}>
			<h1>{t('Documents')}</h1>
			<div className={editable && !preview ? 'documents__overview__content' : ''}>
				{renderTables()}
				{requestForDocuments.result !== APPROVED &&
					requestForDocuments.result !== NO_DOCUMENTS &&
					role === ROLE_INDIVIDUAL_INVESTOR &&
					!loadingDocs() && (
						<div className={classes.requestWrap}>
							<p>{MESSAGES.get(requestForDocuments.result)}</p>
							{requestForDocuments.result !== APPROVED && requestForDocuments.result !== DECLINED && (
								<Button
									type={'submit'}
									variant={'contained'}
									className={classes.requestButton}
									color={'primary'}
									name={requestForDocuments.result === PENDING ? `Request sent` : `Send request`}
									onClick={() => submitRequestForDocuments(info.urlFriendlyName)}
									disabled={requestForDocuments.result === PENDING}
								/>
							)}
						</div>
					)}
			</div>
		</section>
	);
};
const mapStateToProps = ({
	campaign: {
		documents: { content, inProgress },
		info,
		documentActions,
		requestForDocuments,
	},
	auth: {
		authentication: { userId, role },
	},
	company: {
		documents: { content: overview_content, inProgress: companyDocsInProgress },
	},
	documents: { documentTypes, tweaker },
}) => ({
	info,
	content,
	inProgress,
	userId,
	documentActions,
	overview_content,
	requestForDocuments,
	role,
	documentTypes,
	tweaker,
	companyDocsInProgress,
});

export default connect(
	mapStateToProps,
	{
		getDocument,
		deleteCampaignDocument,
		confirmModal,
		openModalCampaignDocument,
		openModalCampaignDocumentUpdate,
		openModalCampaignDocumentPreview,
		deleteCompanyDocument,
		getDocumentTypes,
		submitRequestForDocuments,
	},
)(Documents);
