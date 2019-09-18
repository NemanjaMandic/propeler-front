// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import { deleteCampaignDocument, getDocument } from '../../../../state/campaign/actions';
import { deleteCompanyDocument } from '../../../../state/company/actions';
import {
	confirmModal,
	openModalCampaignDocument,
	openModalCampaignDocumentUpdate,
	openModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';
import Tooltip from '../../../common/tooltip/Tooltip';
import Pagination from '../../../common/pagination/Pagination';
import { getUserCampaignDocumentsPageable } from '../../../../state/user/dashboard/actions';
import DocumentsRegisterSection from '../../../company/management/partials/DocumentsRegisterSection';
import { CAMPAIGNS, COMPANIES } from '../../../../constants/documentEntity';

type PropsT = {
	userId: any,
	companyDoc: Array<Object>,
	campaignDoc: Array<Object>,
	dashboard?: boolean,
	getUserCampaignDocumentsPageable: Function,
};

const DocumentSection = (props: PropsT) => {
	const { userId, companyDoc, campaignDoc, dashboard, getUserCampaignDocumentsPageable } = props;

	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<DocumentsRegisterSection documentEntity={COMPANIES} documents={companyDoc}>
				<div>
					{t('COMPANY_DOCUMENTS')}{' '}
					<Tooltip title={'Lorem ipsum ...'} placement="right">
						<IconButton>
							<Info className={'icon_class'} />
						</IconButton>
					</Tooltip>
				</div>
			</DocumentsRegisterSection>

			<DocumentsRegisterSection documentEntity={CAMPAIGNS} documents={campaignDoc}>
				<div>
					{t('CAMPAIGN_DOCUMENTS')}
					<Tooltip title={'Lorem ipsum ...'} placement="right">
						<IconButton>
							<Info className={'icon_class'} />
						</IconButton>
					</Tooltip>
				</div>
			</DocumentsRegisterSection>
			{dashboard && (
				<Pagination
					currentPage={campaignDoc.number}
					totalPages={campaignDoc.totalPages}
					first={campaignDoc.first}
					last={campaignDoc.last}
					next={getUserCampaignDocumentsPageable}
					previous={getUserCampaignDocumentsPageable}
					actionParams={{ userId, pageSize: 5 }}
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = ({
	campaign: {
		info: { urlFriendlyName },
	},
	auth: {
		authentication: { userId },
	},
	company: {
		info: { id },
		documents: { content },
	},
}) => ({
	urlFriendlyName,
	userId,
	id,
	companyDoc: content,
});

export default connect(
	mapStateToProps,
	{
		deleteCampaignDocument,
		getDocument,
		confirmModal,
		openModalCampaignDocumentUpdate,
		openModalCampaignDocument,
		openModalCampaignDocumentPreview,
		deleteCompanyDocument,
		getUserCampaignDocumentsPageable,
	},
)(DocumentSection);
