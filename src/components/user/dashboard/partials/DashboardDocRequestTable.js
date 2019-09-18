/* eslint-disable react/jsx-indent-props,null */
//@flow
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import { stylesDocRequestDetails, stylesPanel, stylesSummary } from './DashboardCampaignsTable.styles';
import Button from '../../../common/button/Button';
import { openUserPreviewDialog, confirmModal } from '../../../../state/modals/actions';
import { acceptDocumentRequest, rejectDocumentRequest } from '../../../../state/user/dashboard/actions';
import { ALL, DECLINED, APPROVED, PENDING } from '../../../../constants/documentRequestStatus';
import Filter from '../../../common/filter/FilterComponent';

const ExpansionPanel = withStyles(stylesPanel)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(stylesDocRequestDetails)(MuiExpansionPanelDetails);
const subtableHeading = ['INVESTORS', 'REQUEST_STATE', ''];

const DashboardDocRequestTable = ({
	heading,
	data,
	openUserPreviewDialog,
	acceptDocumentRequest,
	rejectDocumentRequest,
	confirmModal,
}) => {
	const [t] = useTranslation('translations');

	const reqStatusFilterOptions = [
		{ key: ALL, label: 'ALL' },
		{ key: DECLINED, label: 'DECLINED' },
		{ key: APPROVED, label: 'APPROVED' },
	];

	const [reqStatus, setReqStatus] = useState(reqStatusFilterOptions[0]);

	const handleReqStatus = selectedFilter => {
		setReqStatus(selectedFilter.key);
	};

	const { campaign, requests } = data;

	const openUserPreview = (document: any) => {
		const mockedUser = {
			firstName: document.personName,
			lastName: '',
			country: 'Serbia',
			city: 'Novi Sad',
			bio:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n' +
				'          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet\n' +
				'          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n' +
				'          consetetur sadipscing elitr, sed diam nonumy eirmod temporundefined.',
		};
		openUserPreviewDialog(mockedUser);
	};

	const renderHeading = () => {
		return (
			<div className="investor-dashboard-portfolio-table-rows">
				{heading.map((h, index) => (
					<div
						key={`db-header-table-${h}`}
						className={index === 0 ? 'doc_table_heading table_padding' : 'doc_table_heading'}
					>
						{t(h).toUpperCase()}
					</div>
				))}
			</div>
		);
	};

	const reject = id => {
		confirmModal({
			open: true,
			title: t('REQUEST_DELETION'),
			subtitle: t('CONFIRM_REQUEST_DELETION'),
			actionLabel: t('REJECT'),
			cancelLabel: t('CANCEL'),
			actionMethod: rejectDocumentRequest,
			actionParams: id,
		});
	};

	const renderStatus = status => {
		return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
	};

	const renderLastColumn = doc => {
		if (doc.requestState === PENDING)
			return (
				<Fragment>
					<Button
						name={t('REJECT')}
						variant={'outlined'}
						color={'primary'}
						className={'expand_table_button'}
						onClick={() => reject(doc.requestId)}
					/>
					<Button
						name={t('APPROVE')}
						variant={'outlined'}
						color={'primary'}
						className={'expand_table_button_approve'}
						onClick={() => acceptDocumentRequest(doc.requestId)}
					/>
				</Fragment>
			);
		return null;
	};

	const renderRow = () => {
		const hasPendingRequest = requests.filter(req => req.requestState === 'PENDING');

		return (
			<ExpansionPanel
				key={campaign.urlFriendlyName}
				className={hasPendingRequest.length !== 0 && 'campaign_doc_request_table_active'}
				disabled={requests.length === 0}
			>
				<ExpansionPanelSummary
					className={'table_padding'}
					expandIcon={
						<ExpandMoreIcon className={requests.length === 0 ? 'disable_expand_icon' : 'expand_icon_class'} />
					}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<div className={hasPendingRequest.length === 0 ? 'doc_table_row' : 'doc_table_row bold_font'}>
						{' '}
						{campaign.name}{' '}
					</div>
					<div className={hasPendingRequest.length === 0 ? 'doc_table_row' : 'doc_table_row bold_font'}>
						{' '}
						{renderStatus(campaign.state)}
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className={'document_expand_table'}>
						<div className={'document_expand_table_rows fixed'}>
							{subtableHeading.map((h, index) => {
								return (
									<div className={'expand_table_heading'} key={h}>
										{t(h).toUpperCase()}
										{index === 0 && (
											<IconButton onClick={() => console.log(h)}>
												<ArrowDownward className={'sort_icon'} />
											</IconButton>
										)}
										{index === 1 && (
											<Filter
												options={reqStatusFilterOptions}
												action={handleReqStatus}
												initial={0}
												customLabelClass={'custom_filter_label'}
											/>
										)}
									</div>
								);
							})}
						</div>
						<div id={'expand_table_details'}>
							{requests.map(doc => {
								return (
									<div className={'document_expand_table_rows'} key={doc.requestId}>
										<div className={'expand_table_row'} onClick={() => openUserPreview(doc)}>
											{doc.name}
										</div>
										<div className={'expand_table_row'}>{doc.requestState}</div>
										<div className={'expand_table_row'}>{renderLastColumn(doc)}</div>
									</div>
								);
							})}
						</div>
					</div>
				</ExpansionPanelDetails>
				<Divider />
			</ExpansionPanel>
		);
	};

	return (
		<div>
			{renderHeading()}
			{campaign && requests && renderRow()}
		</div>
	);
};
export default connect(
	null,
	{
		openUserPreviewDialog,
		acceptDocumentRequest,
		rejectDocumentRequest,
		confirmModal,
	},
)(DashboardDocRequestTable);
