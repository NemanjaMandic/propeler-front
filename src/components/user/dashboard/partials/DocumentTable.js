// @flow

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import * as colors from '../../../../styles/modules/colors.scss';
import {
	clearDocument,
	deleteCampaignDocument,
	getDocument,
	setCampaignDocumentUpdate,
} from '../../../../state/campaign/actions';
import { confirmModal } from '../../../../state/modals/actions';
import DocumentPreview from '../../../campaign/management/modals/DocumentPreview';
import DocumentDialogUpdate from '../../../campaign/management/modals/DocumentDialogUpdate';

type PropsT = {
	data: Array<Object>,
	heading: Array<string>,
	classes: {
		root: any,
		table: any,
		tableCellHead: any,
		tableCell: any,
		tableCellLight: any,
		tableCellPointer: any,
		tableCellMarginRight: any,
	},
	getDocument: Function,
	clearDocument: Function,
	deleteCampaignDocument: Function,
	confirmModal: Function,
	urlFriendlyName: string,
	setCampaignDocumentUpdate: Function,
	userId: any,
};

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
		marginTop: 20,
	},
	tableCellHead: {
		fontSize: 14,
		color: colors.lightPurple,
		padding: '10px 20px 10px 0',
	},
	tableCell: {
		color: colors.darkPurple,
		fontSize: 14,
		paddingLeft: '0',
		height: '65px',
	},
	tableCellLight: {
		color: colors.lightBlue,
	},
	tableCellPointer: {
		cursor: 'pointer',
	},
	tableCellMarginRight: {
		marginRight: '25px',
	},
});

const DocumentTable = (props: PropsT) => {
	const {
		data,
		heading,
		classes,
		getDocument,
		clearDocument,
		urlFriendlyName,
		deleteCampaignDocument,
		confirmModal,
		setCampaignDocumentUpdate,
		userId,
	} = props;

	const [openDocPreview, setOpenDocPreview] = useState(false);
	const [editDialog, setEditDialog] = useState(false);

	const previewDocument = url => {
		getDocument(url);
		setOpenDocPreview(true);
	};

	const closeDocumentPreview = () => {
		setOpenDocPreview(false);
		clearDocument();
	};

	const deleteConfirmation = id => {
		confirmModal({
			open: true,
			title: t('DOCUMENT_DELETION'),
			subtitle: t('CONFIRM_DOC_DELETION'),
			actionLabel: t('DELETE'),
			cancelLabel: t('CANCEL'),
			actionMethod: deleteCampaignDocument,
			actionParams: { name: urlFriendlyName, id, userId },
		});
	};

	const openEditModal = (doc: any) => {
		setCampaignDocumentUpdate(doc);
		setEditDialog(true);
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

	const language = localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'en';

	if (language === 'sr') {
		moment().locale('sr');
		console.log(moment.locale());
	} else {
		moment().locale('en-gb');
	}

	return (
		<Fragment>
			<Table className={classes.table}>
				<TableHead>
					<TableRow className={'table__heading'}>
						{heading.map(h => (
							<TableCell className={classes.tableCellHead} key={h}>
								{h.toUpperCase()}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(item => (
						<TableRow key={item.id} className={'table__row'}>
							<TableCell
								className={`${classes.tableCell} ${classes.tableCellPointer} ${classes.tableCellLight}`}
								onClick={() => previewDocument(item.url)}
							>
								{`${item.title}.pdf`}
							</TableCell>
							<TableCell className={classes.tableCell}>{moment(item.uploadDate).format('ll')}</TableCell>
							<TableCell className={classes.tableCell}>{capitalizeLetter(item.accessLevel)}</TableCell>
							<TableCell align="right" className={`${classes.tableCell}`}>
								<IconButton className={`${classes.tableCellMarginRight}`} onClick={() => openEditModal(item)}>
									<Edit className={'icon_class'} />{' '}
								</IconButton>
								<IconButton onClick={() => deleteConfirmation(item.id)}>
									<DeleteOutline className={'icon_class'} />{' '}
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<DocumentPreview open={openDocPreview} close={() => closeDocumentPreview()} />
			{editDialog && (
				<DocumentDialogUpdate
					open={editDialog}
					close={() => setEditDialog(false)}
					title={t('DOCUMENT_UPLOAD')}
					urlFriendlyName={urlFriendlyName}
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
}) => ({ urlFriendlyName, userId });

export default connect(
	mapStateToProps,
	{
		deleteCampaignDocument,
		getDocument,
		clearDocument,
		confirmModal,
		setCampaignDocumentUpdate,
	},
)(withStyles(styles)(DocumentTable));
