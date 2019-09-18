// @flow

import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import Tooltip from '../../../common/tooltip/Tooltip';
import DashboardDocumentTable from '../partials/DashboardDocumentTable';
import DashboardDocRequestTable from '../partials/DashboardDocRequestTable';
import { getCompanyDocuments } from '../../../../state/company/actions';
import { getDocumentTypes } from '../../../../state/documents/actions';
import { CAMPAIGNS, COMPANIES } from '../../../../constants/documentEntity';
import { openModalCampaignDocument } from '../../../../state/modals/actions';
import { getUserCampaignDocumentsPageable } from '../../../../state/user/dashboard/actions';
import { states } from '../../../../constants/campaignStates';

const tableHeading = ['NAME', 'KIND', 'UPLOAD_DATE', 'ACCESS_LEVEL', 'ACTION'];
const requestHeading = ['CAMPAIGN_NAME', 'CAMPAIGN_STATUS'];

const Documents = ({
	getCompanyDocuments,
	openModalCampaignDocument,
	companyId,
	getUserCampaignDocumentsPageable,
	getDocumentTypes,
	userId,
	documentTypes,
	state,
	campaignDocuments,
	companyDoc,
	documentRequest,
}) => {
	useEffect(() => {
		getCompanyDocuments(userId);
		getDocumentTypes(COMPANIES);
		getDocumentTypes(CAMPAIGNS);
		getUserCampaignDocumentsPageable({ userId });
	}, []);
	const [t] = useTranslation('translations');

	const allowedAccessLevels = (type, entity) => {
		const selectedType =
			documentTypes.data[entity] && documentTypes.data[entity].documents.filter(docType => docType.type === type)[0];
		return selectedType && selectedType.accessLevels.map(level => ({ label: level, value: level }));
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

	const uploadTypeAllowed = (docType, documents) => {
		const numOfDocTypes = documents.reduce((total, doc) => (doc.type === docType.type ? total + 1 : total), 0);
		return !docType.maxUploads || numOfDocTypes < docType.maxUploads;
	};

	const renderDocumentTypes = entity => {
		const documents = entity === COMPANIES ? companyDoc : campaignDocuments.content;
		return (
			documentTypes.data[entity] &&
			documentTypes.data[entity].documents.map(docType => (
				<div
					key={docType.type}
					onClick={() => {
						uploadTypeAllowed(docType, documents) && openDocumentDialog(docType.type, entity);
					}}
					className={!uploadTypeAllowed(docType, documents) ? 'disabled_submit' : null}
				>
					{t(docType.type)}
				</div>
			))
		);
	};

	const renderDocRequest = () => {
		return (
			<Fragment>
				<div className={'dashboard__search doc_requests'}>
					<span>{t('DOC_REQUEST')}</span>
				</div>
			</Fragment>
		);
	};

	const campaignEditable = state === states.INITIAL || state === states.REVIEW_READY;

	return (
		<div className={'dashboard margin-bottom-60'}>
			<div className={'upload_doc_title'}>
				{t('COMPANY_DOCUMENTS')}{' '}
				<Tooltip title={'Lorem ipsum ...'} placement="right">
					<IconButton>
						<Info className={'icon_class'} />
					</IconButton>
				</Tooltip>
			</div>
			<div className={'submit__doc margin-bottom-20'}>{companyId ? renderDocumentTypes(COMPANIES) : null}</div>
			{companyDoc.length > 0 ? (
				<DashboardDocumentTable heading={tableHeading} data={companyDoc} entity={COMPANIES} />
			) : (
				<div className={'empty_table'}>{t('NO_DOCUMENTS')}</div>
			)}
			<div className={'upload_doc_title'}>
				{t('CAMPAIGN_DOCUMENTS')}{' '}
				<Tooltip title={'Lorem ipsum ...'} placement="right">
					<IconButton>
						<Info className={'icon_class'} />
					</IconButton>
				</Tooltip>
			</div>
			<div className={'submit__doc margin-bottom-20'}>{campaignEditable && renderDocumentTypes(CAMPAIGNS)}</div>

			{campaignDocuments.content.length > 0 ? (
				<DashboardDocumentTable
					heading={tableHeading}
					data={campaignDocuments.content}
					pagination={campaignDocuments}
					entity={CAMPAIGNS}
				/>
			) : (
				<div className={'empty_table'}>{t('NO_DOCUMENTS')}</div>
			)}
			{renderDocRequest()}
			{documentRequest.result.campaign ? (
				<DashboardDocRequestTable heading={requestHeading} data={documentRequest.result} />
			) : (
				<div className={'empty_table'}>{t('NO_REQUESTS')}</div>
			)}
		</div>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId },
	},
	campaign: {
		info: { state },
	},
	user: {
		dashboard: { campaignDocuments, documentRequest },
	},
	company: {
		info: { id },
		documents: { content: companyDoc },
	},
	documents: { documentTypes, tweaker },
}) => ({
	campaignDocuments,
	companyDoc,
	documentRequest,
	userId,
	companyId: id,
	documentTypes,
	tweaker,
	state,
});

export default connect(
	mapStateToProps,
	{
		getCompanyDocuments,
		openModalCampaignDocument,
		getUserCampaignDocumentsPageable,
		getDocumentTypes,
	},
)(Documents);
