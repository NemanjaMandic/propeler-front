// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { stylesDocRequestDetails, stylesPanel, stylesSummary } from './DashboardCampaignsTable.styles';
import Tooltip from '../../../common/tooltip/Tooltip';
import {
	APR_PAPER,
	BANK_STATEMENT,
	BUSINESS_PLAN,
	LEGAL,
	OTHER,
	PITCH_DECK,
} from '../../../campaign/management/constants/documentTypes';
import Button from '../../../common/button/Button';
import { openUserPreviewDialog } from '../../../../state/modals/actions';

const documents = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 2,
		firstName: 'Milanka',
		lastName: 'Kalkan',
		requestDate: '01/01/2010',
	},
	{
		id: 3,
		firstName: 'Marina',
		lastName: 'Nenic',
		requestDate: '01/01/2010',
	},
	{
		id: 4,
		firstName: 'Nikola',
		lastName: 'Todorovic',
		requestDate: '01/01/2010',
	},
	{
		id: 5,
		firstName: 'Igor',
		lastName: 'Maric',
		requestDate: '01/01/2010',
	},

	{
		id: 6,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 7,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 8,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 9,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 10,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
	{
		id: 11,
		firstName: 'John',
		lastName: 'Doe',
		requestDate: '01/01/2010',
	},
];

const ExpansionPanel = withStyles(stylesPanel)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(stylesDocRequestDetails)(MuiExpansionPanelDetails);

const subtableHeading = ['INVESTORS', 'REQUEST_DATE', ''];

const DashboardDocumentTableRowExpandable = ({ document, openUserPreviewDialog }) => {
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

	const renderLastCell = () => {
		return (
			<div className={'margin-right-15'}>
				<Tooltip title={t('EDIT_DOCUMENT')} placement="right">
					<IconButton className={'margin-right-15'} onClick={() => console.log('edit')}>
						<Edit className={'icon_class'} />
					</IconButton>
				</Tooltip>
				<Tooltip title={t('DELETE_DOCUMENT')} placement="right">
					<IconButton onClick={() => console.log('delete')}>
						<DeleteOutline className={'icon_class'} />
					</IconButton>
				</Tooltip>
			</div>
		);
	};
	const openDocumentPreview = (document: any, e: Event) => {
		console.log(document.url);
		e.stopPropagation();
	};

	const openUserPreview = (document: any) => {
		const mockedUser = {
			firstName: document.firstName,
			lastName: document.lastName,
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

	return (
		<ExpansionPanel key={document.id}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon className={'icon_class'} />}
				aria-controls="panel1c-content"
				id="panel1c-header"
			>
				<div className="doc_table_row" onClick={e => openDocumentPreview(document, e)}>
					{' '}
					{document.title}{' '}
				</div>
				<div className="doc_table_row"> {changeType(document.type)}</div>
				<div className="doc_table_row">{moment(document.uploadDate).format('ll')}</div>
				<div className="doc_table_row">{document.accessLevel}</div>
				<div className="doc_table_row">{renderLastCell()}</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div className={'document_expand_table'}>
					<div className={'document_expand_table_rows fixed'}>
						{subtableHeading.map((h, index) => {
							return (
								<div className={'expand_table_heading'} key={h}>
									{t(h).toUpperCase()}
									{index !== subtableHeading.length - 1 && (
										<IconButton onClick={() => console.log(h)}>
											<ArrowDownward className={'sort_icon'} />
										</IconButton>
									)}
								</div>
							);
						})}
					</div>
					<div id={'expand_table_details'}>
						{documents.map(doc => {
							return (
								<div className={'document_expand_table_rows'} key={doc.id}>
									<div className={'expand_table_row'} onClick={() => openUserPreview(doc)}>
										{doc.firstName} {doc.lastName}
									</div>
									<div className={'expand_table_row'}>{moment(doc.requestDate).format('ll')}</div>
									<div className={'expand_table_row'}>
										<Button
											name={t('REJECT')}
											variant={'outlined'}
											color={'primary'}
											className={'expand_table_button'}
											onClick={() => console.log('reject ', doc.id)}
										/>
										<Button
											name={t('APPROVE')}
											variant={'outlined'}
											color={'primary'}
											className={'expand_table_button_approve'}
											onClick={() => console.log('approve ', doc.id)}
										/>
									</div>
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

export default connect(
	null,
	{ openUserPreviewDialog },
)(DashboardDocumentTableRowExpandable);
